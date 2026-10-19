using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using PizzaShop.Api.Db;
using PizzaShop.Api.Dtos;

namespace PizzaShop.Api.Endpoints
{
    public static class ToppingsEndpoints
    {
        // Read-only view over Ingredients for the pizza builder; managed via /api/ingredients.
        public static IEndpointRouteBuilder MapToppingsEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/api/toppings")
                .WithTags("Toppings")
                .RequireAuthorization();

            group.MapGet("/", GetAll);

            return app;
        }

        private static async Task<Ok<List<ToppingDto>>> GetAll(PizzaShopContext context, CancellationToken ct)
        {
            // ToppingPrice and ToppingPortion are always set together (enforced by the ingredient endpoints).
            var toppings = await context.Ingredients
                .Where(i => i.ToppingPrice != null)
                .OrderBy(i => i.Name)
                .Select(ToppingMapper.ToDto)
                .ToListAsync(ct);
            return TypedResults.Ok(toppings);
        }
    }
}
