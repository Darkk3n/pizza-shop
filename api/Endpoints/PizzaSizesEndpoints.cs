using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using PizzaShop.Api.Auth;
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
                .WithTags("PizzaSizes")
                .RequireAuthorization();

            group.MapGet("/", GetAll);
            group.MapGet("/{id:guid}", GetById)
                .WithName(GetByIdRouteName);
            group.MapPost("/", Create)
                .RequireAuthorization(Policies.Admin)
                .ProducesProblem(StatusCodes.Status409Conflict)
                .ProducesValidationProblem();
            group.MapPut("/{id:guid}", Update)
                .RequireAuthorization(Policies.Admin)
                .ProducesProblem(StatusCodes.Status409Conflict)
                .ProducesValidationProblem();
            group.MapDelete("/{id:guid}", Delete)
                .RequireAuthorization(Policies.Admin)
                .ProducesProblem(StatusCodes.Status409Conflict);

            return app;
        }

        private static async Task<Ok<List<PizzaSizeDto>>> GetAll(PizzaShopContext context, ClaimsPrincipal user, CancellationToken ct)
        {
            // Smallest to largest (Small, Medium, Large) rather than alphabetical.
            var pizzaSizes = await VisibleSizes(context, user)
                .OrderBy(s => s.PriceMultiplier)
                .ThenBy(s => s.Name)
                .Select(PizzaSizeMapper.ToDto)
                .ToListAsync(ct);
            return TypedResults.Ok(pizzaSizes);
        }

        private static async Task<Results<Ok<PizzaSizeDto>, NotFound>> GetById(Guid id, PizzaShopContext context, ClaimsPrincipal user, CancellationToken ct)
        {
            var pizzaSize = await VisibleSizes(context, user)
                .Where(s => s.PizzaSizeId == id)
                .Select(PizzaSizeMapper.ToDto)
                .FirstOrDefaultAsync(ct);
            return pizzaSize is null ? TypedResults.NotFound() : TypedResults.Ok(pizzaSize);
        }

        private static async Task<Results<CreatedAtRoute<PizzaSizeDto>, ProblemHttpResult>> Create(CreatePizzaSizeRequest request, PizzaShopContext context, CancellationToken ct)
        {
            var name = request.Name.Trim();

            if (await context.PizzaSizes.NameTakenAsync(name, excludeId: null, ct))
            {
                return UniqueNames.DuplicateName("Pizza size", name);
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

            if (await context.PizzaSizes.NameTakenAsync(name, excludeId: id, ct))
            {
                return UniqueNames.DuplicateName("Pizza size", name);
            }

            // Past orders keep their own UnitPrice snapshot, so changing the multiplier
            // only affects new orders.
            pizzaSize.Name = name;
            pizzaSize.PriceMultiplier = request.PriceMultiplier;
            pizzaSize.IsActive = request.IsActive;
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
                    detail: $"The pizza size '{pizzaSize.Name}' appears in one or more orders. Set isActive to false to take it off the menu instead.");
            }

            context.PizzaSizes.Remove(pizzaSize);
            await context.SaveChangesAsync(ct);

            return TypedResults.NoContent();
        }

        // Staff and admins see every size (to manage them); customers only the ones on the menu.
        private static IQueryable<PizzaSize> VisibleSizes(PizzaShopContext context, ClaimsPrincipal user) =>
            user.IsStaff()
                ? context.PizzaSizes
                : context.PizzaSizes.Where(s => s.IsActive);
    }
}
