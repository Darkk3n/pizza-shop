using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text.Json;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Npgsql;
using PizzaShop.Api.Auth;
using PizzaShop.Api.Db;
using PizzaShop.Api.Dtos;
using PizzaShop.Api.Models;
using PizzaShop.Api.Options;
using PizzaShop.Api.Requests;

namespace PizzaShop.Api.Endpoints
{
    public static class OrdersEndpoints
    {
        private const string GetByIdRouteName = "GetOrderById";
        private const string IdempotencyKeyHeader = "Idempotency-Key";

        public static IEndpointRouteBuilder MapOrdersEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/api/orders")
                .WithTags("Orders")
                .RequireAuthorization();

            // No PUT or DELETE: orders keep price snapshots and have already deducted stock.
            // Any signed-in user can order; customers only see their own orders (see VisibleOrders).
            group.MapGet("/", GetAll)
                .ProducesValidationProblem();
            group.MapGet("/{id:guid}", GetById)
                .WithName(GetByIdRouteName);
            group.MapPost("/", Create)
                .ProducesProblem(StatusCodes.Status422UnprocessableEntity)
                .ProducesValidationProblem();
            group.MapPatch("/{id:guid}/status", UpdateStatus)
                .RequireAuthorization(Policies.Staff)
                .ProducesProblem(StatusCodes.Status409Conflict)
                .ProducesValidationProblem();

            return app;
        }

        // Query string: status, from (inclusive), to (exclusive), page, pageSize. Plain parameters rather
        // than an [AsParameters] record: OpenAPI generation throws on validation attributes there.
        private static async Task<Ok<PagedResult<OrderSummaryDto>>> GetAll(
            ClaimsPrincipal user,
            PizzaShopContext context,
            OrderStatus? status,
            DateTimeOffset? from,
            DateTimeOffset? to,
            [Range(1, 100000)] int page = 1,
            [Range(1, 100)] int pageSize = 25,
            CancellationToken ct = default)
        {
            var orders = VisibleOrders(context, user);

            if (status is { } statusFilter)
            {
                orders = orders.Where(o => o.Status == statusFilter);
            }

            // Npgsql only accepts UTC offsets for timestamptz parameters.
            if (from is { } fromValue)
            {
                var fromUtc = fromValue.ToUniversalTime();
                orders = orders.Where(o => o.CreatedAt >= fromUtc);
            }

            if (to is { } toValue)
            {
                var toUtc = toValue.ToUniversalTime();
                orders = orders.Where(o => o.CreatedAt < toUtc);
            }

            var totalCount = await orders.CountAsync(ct);
            var items = await orders
                .OrderByDescending(o => o.OrderNumber)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(OrderMapper.ToSummaryDto)
                .ToListAsync(ct);

            return TypedResults.Ok(new PagedResult<OrderSummaryDto>(items, page, pageSize, totalCount));
        }

        private static async Task<Results<Ok<OrderDto>, NotFound>> GetById(Guid id, ClaimsPrincipal user, PizzaShopContext context, CancellationToken ct)
        {
            // Another customer's order is a 404, not a 403, so its existence isn't revealed.
            var order = await VisibleOrders(context, user)
                .Where(o => o.OrderId == id)
                .Select(OrderMapper.ToDto)
                .FirstOrDefaultAsync(ct);
            return order is null ? TypedResults.NotFound() : TypedResults.Ok(order);
        }

        private static async Task<Results<CreatedAtRoute<OrderDto>, ValidationProblem, ProblemHttpResult>> Create(
            CreateOrderRequest request,
            [FromHeader(Name = IdempotencyKeyHeader)] Guid? idempotencyKey,
            ClaimsPrincipal user,
            PizzaShopContext context,
            IOptions<OrderOptions> options,
            CancellationToken ct)
        {
            // Required so a retry after a lost response can't create a second order.
            // A malformed (non-GUID) header is rejected by binding before this runs.
            if (idempotencyKey is not { } key || key == Guid.Empty)
            {
                return TypedResults.ValidationProblem(new Dictionary<string, string[]>
                {
                    [IdempotencyKeyHeader] = [$"The {IdempotencyKeyHeader} header must be a non-empty GUID, reused on every retry of the same order."],
                });
            }

            // Checked before catalog validation so a retry still gets its original order
            // even if the menu changed in between.
            var userId = user.GetUserId();
            var requestHash = HashRequest(request);
            if (await TryReplayAsync(context, key, userId, requestHash, ct) is { } replay)
            {
                return replay;
            }

            // Load every referenced catalog row up front: one query per table.
            var recipeIds = request.Items.Select(i => i.RecipeId).Distinct().ToList();
            var recipes = await context.Recipes
                .Include(r => r.RecipeItems)
                .Where(r => recipeIds.Contains(r.RecipeId))
                .ToDictionaryAsync(r => r.RecipeId, ct);

            var sizeIds = request.Items.Where(i => i.PizzaSizeId.HasValue).Select(i => i.PizzaSizeId!.Value).Distinct().ToList();
            var sizes = await context.PizzaSizes
                .Where(s => sizeIds.Contains(s.PizzaSizeId))
                .ToDictionaryAsync(s => s.PizzaSizeId, ct);

            var toppingIds = request.Items.SelectMany(i => i.Toppings ?? [])
                .Select(t => t.IngredientId)
                .Distinct()
                .ToList();
            var toppingIngredients = await context.Ingredients
                .Where(i => toppingIds.Contains(i.IngredientId))
                .ToDictionaryAsync(i => i.IngredientId, ct);

            var errors = ValidateItems(request.Items, recipes, sizes, toppingIngredients);
            if (errors is not null)
            {
                return TypedResults.ValidationProblem(errors);
            }

            var order = new Order
            {
                Status = OrderStatus.Pending,
                OrderType = request.OrderType,
                PlacedByUserId = userId,
                IdempotencyKey = key,
                RequestHash = requestHash,
            };
            var deductions = new Dictionary<Guid, decimal>();

            foreach (var item in request.Items)
            {
                var recipe = recipes[item.RecipeId];
                var size = item.PizzaSizeId is { } sizeId ? sizes[sizeId] : null;
                // Recipe amounts and topping portions are for a Small; larger sizes scale
                // ingredients by the same multiplier as the price.
                var sizeMultiplier = size?.PriceMultiplier ?? 1m;

                var orderItem = new OrderItem
                {
                    RecipeId = recipe.RecipeId,
                    PizzaSizeId = size?.PizzaSizeId,
                    ItemNameSnapshot = size is null ? recipe.Name : $"{size.Name} {recipe.Name}",
                    Quantity = item.Quantity,
                };

                foreach (var recipeItem in recipe.RecipeItems)
                {
                    AddDeduction(deductions, recipeItem.IngredientId, recipeItem.Amount * sizeMultiplier * item.Quantity);
                }

                foreach (var topping in item.Toppings ?? [])
                {
                    var ingredient = toppingIngredients[topping.IngredientId];
                    var factor = CoverageFactor(topping.Coverage) * AmountFactor(topping.ExtraAmount) * sizeMultiplier;

                    orderItem.Toppings.Add(new OrderItemTopping
                    {
                        IngredientId = ingredient.IngredientId,
                        Coverage = topping.Coverage,
                        ExtraAmount = topping.ExtraAmount,
                        PriceAdjustment = RoundMoney(ingredient.ToppingPrice!.Value * factor),
                    });
                    AddDeduction(deductions, ingredient.IngredientId, ingredient.ToppingPortion!.Value * factor * item.Quantity);
                }

                orderItem.UnitPrice = RoundMoney(recipe.BasePrice * sizeMultiplier) + orderItem.Toppings.Sum(t => t.PriceAdjustment);
                orderItem.LineTotal = orderItem.UnitPrice * item.Quantity;
                order.Items.Add(orderItem);
            }

            order.SubTotal = order.Items.Sum(i => i.LineTotal);
            order.Tax = RoundMoney(order.SubTotal * options.Value.TaxRate);
            order.Total = order.SubTotal + order.Tax;

            // The order and its stock deductions commit together or not at all.
            await using var transaction = await context.Database.BeginTransactionAsync(ct);

            context.Orders.Add(order);
            try
            {
                await context.SaveChangesAsync(ct);
            }
            catch (DbUpdateException ex) when (ex.InnerException is PostgresException { SqlState: PostgresErrorCodes.UniqueViolation, ConstraintName: Order.IdempotencyKeyIndexName })
            {
                // A concurrent request with the same key committed first (the insert waits on
                // the unique index until it does), so this one is a retry: answer with that order.
                await transaction.RollbackAsync(ct);
                context.ChangeTracker.Clear();
                return await TryReplayAsync(context, key, userId, requestHash, ct)
                    ?? throw new InvalidOperationException($"Order with idempotency key '{key}' vanished after a unique violation.");
            }

            // Atomic UPDATEs (same approach as stock adjustments) so concurrent orders can't
            // overwrite each other. Unlike manual adjustments there is no guard: stock may go
            // negative so a drifting count never blocks a sale. Updating in a fixed order keeps
            // concurrent orders from locking the same rows in opposite orders (deadlock).
            foreach (var (ingredientId, amount) in deductions.OrderBy(d => d.Key))
            {
                await context.Ingredients
                    .Where(i => i.IngredientId == ingredientId)
                    .ExecuteUpdateAsync(s => s.SetProperty(i => i.CurrentStock, i => i.CurrentStock - amount), ct);
            }

            await transaction.CommitAsync(ct);

            // Re-read through the projection so the response carries topping names.
            var dto = await FindDtoAsync(context, order.OrderId, ct);
            return TypedResults.CreatedAtRoute(dto, GetByIdRouteName, new { id = order.OrderId });
        }

        private static async Task<Results<Ok<OrderDto>, NotFound, ProblemHttpResult>> UpdateStatus(Guid id, UpdateOrderStatusRequest request, PizzaShopContext context, CancellationToken ct)
        {
            var order = await context.Orders.FindAsync([id], ct);
            if (order is null)
            {
                return TypedResults.NotFound();
            }

            // OrderStatus members are declared in workflow order, so a larger value is a later step.
            if (request.Status <= order.Status)
            {
                return TypedResults.Problem(
                    statusCode: StatusCodes.Status409Conflict,
                    title: "Invalid status change.",
                    detail: $"Order #{order.OrderNumber} is {order.Status}; it can only move forward, not to {request.Status}.");
            }

            order.Status = request.Status;
            await context.SaveChangesAsync(ct);

            var dto = await FindDtoAsync(context, id, ct);
            return dto is null ? TypedResults.NotFound() : TypedResults.Ok(dto);
        }

        // Returns the order already created with this key (same 201 response as the original),
        // a 422 if the key was used for a different request or by another user, or null if the key is new.
        private static async Task<Results<CreatedAtRoute<OrderDto>, ValidationProblem, ProblemHttpResult>?> TryReplayAsync(PizzaShopContext context, Guid key, Guid userId, string requestHash, CancellationToken ct)
        {
            var previous = await context.Orders
                .Where(o => o.IdempotencyKey == key)
                .Select(o => new { o.OrderId, o.PlacedByUserId, o.RequestHash })
                .FirstOrDefaultAsync(ct);
            if (previous is null)
            {
                return null;
            }

            // Same answer for another user's key as for a changed body, so a replayed key
            // never hands back someone else's order or confirms that it exists.
            if (previous.PlacedByUserId != userId || previous.RequestHash != requestHash)
            {
                return TypedResults.Problem(
                    statusCode: StatusCodes.Status422UnprocessableEntity,
                    title: "Idempotency key reused.",
                    detail: $"The {IdempotencyKeyHeader} '{key}' was already used for a different order. Generate a new key for each new order.");
            }

            var dto = await FindDtoAsync(context, previous.OrderId, ct);
            return TypedResults.CreatedAtRoute(dto, GetByIdRouteName, new { id = previous.OrderId });
        }

        // Hashes the bound request re-serialized, so whitespace, property order and omitted
        // defaults (e.g. Quantity) don't make a genuine retry look like a different request.
        private static string HashRequest(CreateOrderRequest request) =>
            Convert.ToHexString(SHA256.HashData(JsonSerializer.SerializeToUtf8Bytes(request)));

        // Staff and admins see every order; customers only the ones they placed.
        private static IQueryable<Order> VisibleOrders(PizzaShopContext context, ClaimsPrincipal user)
        {
            if (user.IsInRole(Roles.Admin) || user.IsInRole(Roles.Staff))
            {
                return context.Orders;
            }

            var userId = user.GetUserId();
            return context.Orders.Where(o => o.PlacedByUserId == userId);
        }

        private static Task<OrderDto?> FindDtoAsync(PizzaShopContext context, Guid id, CancellationToken ct) =>
            context.Orders
                .Where(o => o.OrderId == id)
                .Select(OrderMapper.ToDto)
                .FirstOrDefaultAsync(ct);

        // Attribute validation already covers quantities and enums; this checks what needs the
        // database: recipes, sizes and topping ingredients exist, and toppings aren't repeated.
        // Keys are indexed (Items[0].Toppings[1].IngredientId) so a form can point at the field.
        private static Dictionary<string, string[]>? ValidateItems(
            List<OrderItemRequest> items,
            Dictionary<Guid, Recipe> recipes,
            Dictionary<Guid, PizzaSize> sizes,
            Dictionary<Guid, Ingredient> toppingIngredients)
        {
            var errors = new Dictionary<string, string[]>();

            for (var i = 0; i < items.Count; i++)
            {
                var item = items[i];
                var prefix = $"{nameof(CreateOrderRequest.Items)}[{i}]";

                if (!recipes.ContainsKey(item.RecipeId))
                {
                    errors[$"{prefix}.{nameof(OrderItemRequest.RecipeId)}"] = [$"Recipe '{item.RecipeId}' does not exist."];
                }

                if (item.PizzaSizeId is { } sizeId && !sizes.ContainsKey(sizeId))
                {
                    errors[$"{prefix}.{nameof(OrderItemRequest.PizzaSizeId)}"] = [$"Pizza size '{sizeId}' does not exist."];
                }

                var toppings = item.Toppings ?? [];
                if (toppings.GroupBy(t => t.IngredientId).Any(g => g.Count() > 1))
                {
                    errors[$"{prefix}.{nameof(OrderItemRequest.Toppings)}"] = ["Each topping can appear only once per item."];
                }

                for (var j = 0; j < toppings.Count; j++)
                {
                    var ingredientId = toppings[j].IngredientId;
                    var key = $"{prefix}.{nameof(OrderItemRequest.Toppings)}[{j}].{nameof(OrderItemToppingRequest.IngredientId)}";

                    if (!toppingIngredients.TryGetValue(ingredientId, out var ingredient))
                    {
                        errors[key] = [$"Ingredient '{ingredientId}' does not exist."];
                    }
                    else if (ingredient.ToppingPrice is null || ingredient.ToppingPortion is null)
                    {
                        errors[key] = [$"'{ingredient.Name}' is not offered as a topping."];
                    }
                }
            }

            return errors.Count > 0 ? errors : null;
        }

        private static void AddDeduction(Dictionary<Guid, decimal> deductions, Guid ingredientId, decimal amount) =>
            deductions[ingredientId] = deductions.GetValueOrDefault(ingredientId) + amount;

        private static decimal CoverageFactor(ToppingCoverage coverage) => coverage switch
        {
            ToppingCoverage.Whole => 1m,
            ToppingCoverage.LeftHalf or ToppingCoverage.RightHalf => 0.5m,
            _ => throw new ArgumentOutOfRangeException(nameof(coverage), coverage, null),
        };

        private static decimal AmountFactor(ToppingAmount amount) => amount switch
        {
            ToppingAmount.Light => 0.5m,
            ToppingAmount.Standard => 1m,
            ToppingAmount.Extra => 1.5m,
            _ => throw new ArgumentOutOfRangeException(nameof(amount), amount, null),
        };

        private static decimal RoundMoney(decimal value) => Math.Round(value, 2, MidpointRounding.AwayFromZero);
    }
}
