using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using PizzaShop.Api.Auth;
using PizzaShop.Api.Db;
using PizzaShop.Api.Dtos;
using PizzaShop.Api.Models;
using PizzaShop.Api.Options;
using PizzaShop.Api.Statistics;

namespace PizzaShop.Api.Endpoints
{
    // Admin-only reports. A sale is every non-cancelled order, counted when it was placed;
    // cancelled orders are always reported separately, never dropped. Every endpoint takes the same
    // `from`/`to` local dates (both inclusive, in Statistics:TimeZone), or `days` back from today,
    // and filters on CreatedAt, so the sections of a dashboard cover the same orders. One endpoint
    // per section lets a client load them in parallel.
    public static class StatisticsEndpoints
    {
        public static IEndpointRouteBuilder MapStatisticsEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/api/statistics")
                .WithTags("Statistics")
                .RequireAuthorization(Policies.Admin);

            group.MapGet("/sales", GetSales)
                .ProducesValidationProblem();
            group.MapGet("/items", GetItems)
                .ProducesValidationProblem();
            group.MapGet("/cancellations", GetCancellations)
                .ProducesValidationProblem();
            group.MapGet("/ingredient-usage", GetIngredientUsage)
                .ProducesValidationProblem();

            return app;
        }

        private static async Task<Results<Ok<SalesStatisticsDto>, ValidationProblem>> GetSales(
            PizzaShopContext context,
            IOptions<StatisticsOptions> options,
            DateOnly? from,
            DateOnly? to,
            [Range(1, StatisticsCalculator.MaxDays)] int days = StatisticsCalculator.DefaultDays,
            CancellationToken ct = default)
        {
            var (zone, range, problem) = Resolve(options, from, to, days);
            if (range is null)
            {
                return problem!;
            }

            // Only the columns the totals and daily buckets need; the grouping by local date
            // happens in StatisticsCalculator, which keeps it unit-tested and independent of SQL
            // time zone support.
            var orders = await InRange(context.Orders, range)
                .Select(o => new OrderSnapshot(o.CreatedAt, o.Status == OrderStatus.Cancelled, o.SubTotal, o.Tax, o.Total))
                .ToListAsync(ct);

            return TypedResults.Ok(StatisticsCalculator.Sales(orders, range, zone));
        }

        private static async Task<Results<Ok<ItemStatisticsDto>, ValidationProblem>> GetItems(
            PizzaShopContext context,
            IOptions<StatisticsOptions> options,
            DateOnly? from,
            DateOnly? to,
            [Range(1, StatisticsCalculator.MaxDays)] int days = StatisticsCalculator.DefaultDays,
            [Range(1, 50)] int limit = 10,
            CancellationToken ct = default)
        {
            var (zone, range, problem) = Resolve(options, from, to, days);
            if (range is null)
            {
                return problem!;
            }

            // RecipeId is nullable on OrderItems (reserved for scratch pizzas); those have no recipe to rank.
            var recipeTotals = await context.OrderItems
                .Where(i => i.RecipeId != null
                    && i.Order.Status != OrderStatus.Cancelled
                    && i.Order.CreatedAt >= range.StartUtc
                    && i.Order.CreatedAt < range.EndUtc)
                .GroupBy(i => i.RecipeId!.Value)
                .Select(g => new { RecipeId = g.Key, Quantity = g.Sum(i => i.Quantity), Revenue = g.Sum(i => i.LineTotal) })
                .OrderByDescending(r => r.Quantity)
                .ThenByDescending(r => r.Revenue)
                .Take(limit)
                .ToListAsync(ct);

            var toppingTotals = await context.OrderItemToppings
                .Where(t => t.OrderItem.Order.Status != OrderStatus.Cancelled
                    && t.OrderItem.Order.CreatedAt >= range.StartUtc
                    && t.OrderItem.Order.CreatedAt < range.EndUtc)
                .Select(t => new { t.IngredientId, t.OrderItem.Quantity, Revenue = t.PriceAdjustment * t.OrderItem.Quantity })
                .GroupBy(t => t.IngredientId)
                .Select(g => new { IngredientId = g.Key, TimesPicked = g.Sum(t => t.Quantity), Revenue = g.Sum(t => t.Revenue) })
                .OrderByDescending(t => t.TimesPicked)
                .ThenByDescending(t => t.Revenue)
                .Take(limit)
                .ToListAsync(ct);

            // Current names: retired recipes and ingredients still appear, under the name they have now.
            var recipeIds = recipeTotals.Select(r => r.RecipeId).ToList();
            var recipeNames = await context.Recipes
                .Where(r => recipeIds.Contains(r.RecipeId))
                .ToDictionaryAsync(r => r.RecipeId, r => r.Name, ct);
            var ingredientIds = toppingTotals.Select(t => t.IngredientId).ToList();
            var ingredientNames = await context.Ingredients
                .Where(i => ingredientIds.Contains(i.IngredientId))
                .ToDictionaryAsync(i => i.IngredientId, i => i.Name, ct);

            return TypedResults.Ok(new ItemStatisticsDto(
                range.From,
                range.To,
                zone.Id,
                [.. recipeTotals.Select(r => new TopRecipeDto(r.RecipeId, recipeNames[r.RecipeId], r.Quantity, r.Revenue))],
                [.. toppingTotals.Select(t => new TopToppingDto(t.IngredientId, ingredientNames[t.IngredientId], t.TimesPicked, t.Revenue))]));
        }

        private static async Task<Results<Ok<CancellationStatisticsDto>, ValidationProblem>> GetCancellations(
            PizzaShopContext context,
            IOptions<StatisticsOptions> options,
            DateOnly? from,
            DateOnly? to,
            [Range(1, StatisticsCalculator.MaxDays)] int days = StatisticsCalculator.DefaultDays,
            [Range(1, 100)] int limit = 20,
            CancellationToken ct = default)
        {
            var (zone, range, problem) = Resolve(options, from, to, days);
            if (range is null)
            {
                return problem!;
            }

            var orders = InRange(context.Orders, range);
            var allCount = await orders.CountAsync(ct);
            var cancelled = orders.Where(o => o.Status == OrderStatus.Cancelled);

            var byUser = await cancelled
                .GroupBy(o => o.CancelledByUserId)
                .Select(g => new { UserId = g.Key, Count = g.Count(), Total = g.Sum(o => o.Total) })
                .ToListAsync(ct);

            // Any stored role (Staff or Admin) makes the canceller staff; customers have none.
            var cancellerIds = byUser.Where(u => u.UserId != null).Select(u => u.UserId!.Value).ToList();
            var staffIds = (await context.UserRoles
                .Where(ur => cancellerIds.Contains(ur.UserId))
                .Select(ur => ur.UserId)
                .Distinct()
                .ToListAsync(ct)).ToHashSet();
            var staffCount = byUser.Where(u => u.UserId is { } id && staffIds.Contains(id)).Sum(u => u.Count);

            var recent = await cancelled
                .OrderByDescending(o => o.CancelledAt)
                .ThenByDescending(o => o.OrderNumber)
                .Take(limit)
                .Select(o => new CancelledOrderDto(
                    o.OrderId,
                    o.OrderNumber,
                    o.CancelledAt,
                    o.CancelledBy == null ? null : o.CancelledBy.Email,
                    o.CancellationReason,
                    o.Total))
                .ToListAsync(ct);

            var cancelledCount = byUser.Sum(u => u.Count);
            return TypedResults.Ok(new CancellationStatisticsDto(
                range.From,
                range.To,
                zone.Id,
                StatisticsCalculator.CancelledSummary(cancelledCount, byUser.Sum(u => u.Total), allCount),
                new CancellationsByRoleDto(cancelledCount - staffCount, staffCount),
                recent));
        }

        private static async Task<Results<Ok<IngredientUsageStatisticsDto>, ValidationProblem>> GetIngredientUsage(
            PizzaShopContext context,
            IOptions<StatisticsOptions> options,
            DateOnly? from,
            DateOnly? to,
            [Range(1, StatisticsCalculator.MaxDays)] int days = StatisticsCalculator.DefaultDays,
            CancellationToken ct = default)
        {
            var (zone, range, problem) = Resolve(options, from, to, days);
            if (range is null)
            {
                return problem!;
            }

            // Recorded deductions, not recomputed from current recipes; cancelled orders gave theirs back.
            var used = await context.OrderIngredientUsages
                .Where(u => u.Order.Status != OrderStatus.Cancelled
                    && u.Order.CreatedAt >= range.StartUtc
                    && u.Order.CreatedAt < range.EndUtc)
                .GroupBy(u => u.IngredientId)
                .Select(g => new { IngredientId = g.Key, Used = g.Sum(u => u.Amount) })
                .ToListAsync(ct);

            var ids = used.Select(u => u.IngredientId).ToList();
            var ingredients = await context.Ingredients
                .Where(i => ids.Contains(i.IngredientId))
                .Select(i => new { i.IngredientId, i.Name, UnitOfMeasureName = i.UnitOfMeasure.Name, i.CurrentStock })
                .ToDictionaryAsync(i => i.IngredientId, ct);

            var rows = used
                .Select(u =>
                {
                    var i = ingredients[u.IngredientId];
                    return new IngredientUsageDto(u.IngredientId, i.Name, i.UnitOfMeasureName, u.Used, i.CurrentStock);
                })
                .OrderByDescending(r => r.Used)
                .ThenBy(r => r.Name)
                .ToList();

            return TypedResults.Ok(new IngredientUsageStatisticsDto(range.From, range.To, zone.Id, rows));
        }

        private static IQueryable<Order> InRange(IQueryable<Order> orders, StatisticsRange range) =>
            orders.Where(o => o.CreatedAt >= range.StartUtc && o.CreatedAt < range.EndUtc);

        // The zone id was validated at startup, so FindSystemTimeZoneById can't fail here.
        private static (TimeZoneInfo Zone, StatisticsRange? Range, ValidationProblem? Problem) Resolve(
            IOptions<StatisticsOptions> options,
            DateOnly? from,
            DateOnly? to,
            int days)
        {
            var zone = TimeZoneInfo.FindSystemTimeZoneById(options.Value.TimeZone);
            var result = StatisticsCalculator.ResolveRange(from, to, zone, DateTimeOffset.UtcNow, days);
            var problem = result.Range is null
                ? TypedResults.ValidationProblem(new Dictionary<string, string[]> { [result.ErrorField!] = [result.Error!] })
                : null;
            return (zone, result.Range, problem);
        }
    }
}
