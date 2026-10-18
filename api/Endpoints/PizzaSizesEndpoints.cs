using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using PizzaShop.Api.Db;
using PizzaShop.Api.Dtos;
using PizzaShop.Api.Models;
using PizzaShop.Api.Requests;

namespace PizzaShop.Api.Endpoints
{
    public static class PizzaSizesEndpoints
    {
        private const string GetByIdRouteName = "GetPizzaSizeById";

        public static IEndpointRouteBuilder MapPizzaSizesEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/api/pizza-sizes")
                .WithTags("PizzaSizes");

            group.MapGet("/", GetAll);
            group.MapGet("/{id:guid}", GetById)
                .WithName(GetByIdRouteName);
            group.MapPost("/", Create)
                .ProducesProblem(StatusCodes.Status409Conflict)
                .ProducesValidationProblem();
            group.MapPut("/{id:guid}", Update)
                .ProducesProblem(StatusCodes.Status409Conflict)
                .ProducesValidationProblem();
            group.MapDelete("/{id:guid}", Delete)
                .ProducesProblem(StatusCodes.Status409Conflict);

            return app;
        }

        private static async Task<Ok<List<PizzaSizeDto>>> GetAll(PizzaShopContext context, CancellationToken ct)
        {
            // Smallest to largest (Small, Medium, Large) rather than alphabetical.
            var pizzaSizes = await context.PizzaSizes
                .OrderBy(s => s.PriceMultiplier)
                .ThenBy(s => s.Name)
                .Select(PizzaSizeMapper.ToDto)
                .ToListAsync(ct);
            return TypedResults.Ok(pizzaSizes);
        }

        private static async Task<Results<Ok<PizzaSizeDto>, NotFound>> GetById(Guid id, PizzaShopContext context, CancellationToken ct)
        {
            var pizzaSize = await context.PizzaSizes
                .Where(s => s.PizzaSizeId == id)
                .Select(PizzaSizeMapper.ToDto)
                .FirstOrDefaultAsync(ct);
            return pizzaSize is null ? TypedResults.NotFound() : TypedResults.Ok(pizzaSize);
        }

        private static async Task<Results<CreatedAtRoute<PizzaSizeDto>, ProblemHttpResult>> Create(CreatePizzaSizeRequest request, PizzaShopContext context, CancellationToken ct)
        {
            var name = request.Name.Trim();

            if (await NameTakenAsync(context, name, excludeId: null, ct))
            {
                return DuplicateName(name);
            }

            var pizzaSize = new PizzaSize { Name = name, PriceMultiplier = request.PriceMultiplier };
            context.PizzaSizes.Add(pizzaSize);
            await context.SaveChangesAsync(ct);

            return TypedResults.CreatedAtRoute(
                PizzaSizeMapper.FromEntity(pizzaSize),
                GetByIdRouteName,
                new { id = pizzaSize.PizzaSizeId });
        }

        private static async Task<Results<Ok<PizzaSizeDto>, NotFound, ProblemHttpResult>> Update(Guid id, UpdatePizzaSizeRequest request, PizzaShopContext context, CancellationToken ct)
        {
            var pizzaSize = await context.PizzaSizes.FindAsync([id], ct);
            if (pizzaSize is null)
            {
                return TypedResults.NotFound();
            }

            var name = request.Name.Trim();

            if (await NameTakenAsync(context, name, excludeId: id, ct))
            {
                return DuplicateName(name);
            }

            // Past orders keep their own UnitPrice snapshot, so changing the multiplier
            // only affects new orders.
            pizzaSize.Name = name;
            pizzaSize.PriceMultiplier = request.PriceMultiplier;
            await context.SaveChangesAsync(ct);

            return TypedResults.Ok(PizzaSizeMapper.FromEntity(pizzaSize));
        }

        private static async Task<Results<NoContent, NotFound, ProblemHttpResult>> Delete(Guid id, PizzaShopContext context, CancellationToken ct)
        {
            var pizzaSize = await context.PizzaSizes.FindAsync([id], ct);
            if (pizzaSize is null)
            {
                return TypedResults.NotFound();
            }

            // The OrderItem -> PizzaSize FK is Restrict, so check up front for a clear 409
            // instead of surfacing a database exception.
            var inUse = await context.OrderItems.AnyAsync(oi => oi.PizzaSizeId == id, ct);
            if (inUse)
            {
                return TypedResults.Problem(
                    statusCode: StatusCodes.Status409Conflict,
                    title: "Pizza size is in use.",
                    detail: $"The pizza size '{pizzaSize.Name}' appears in one or more orders.");
            }

            context.PizzaSizes.Remove(pizzaSize);
            await context.SaveChangesAsync(ct);

            return TypedResults.NoContent();
        }

        // Case-insensitive via ToLower(), which EF Core translates to SQL lower();
        // string.Equals with a StringComparison has no SQL translation.
        private static Task<bool> NameTakenAsync(PizzaShopContext context, string name, Guid? excludeId, CancellationToken ct)
        {
            var lowered = name.ToLower();
            return context.PizzaSizes
                .AnyAsync(s => s.Name.ToLower() == lowered && s.PizzaSizeId != excludeId, ct);
        }

        private static ProblemHttpResult DuplicateName(string name) =>
            TypedResults.Problem(
                statusCode: StatusCodes.Status409Conflict,
                title: "Pizza size already exists.",
                detail: $"A pizza size named '{name}' already exists.");
    }
}
