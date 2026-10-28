using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using PizzaShop.Api.Db;
using PizzaShop.Api.Dtos;

namespace PizzaShop.Api.Endpoints
{
    public static class PublicEndpoints
    {
        // Anonymous on purpose (listed in SecurityTests): the web app's signed-out landing page and menu.
        // The global rate limiter still applies, per client IP.
        public static IEndpointRouteBuilder MapPublicEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/api/public")
                .WithTags("Public")
                .AllowAnonymous();

            group.MapGet("/menu", GetMenu);

            return app;
        }

        private static async Task<Ok<PublicMenuDto>> GetMenu(PizzaShopContext context, CancellationToken ct)
        {
            var recipes = await context.Recipes
                .Where(r => r.IsActive)
                .OrderBy(r => r.Name)
                .Select(r => new PublicRecipeDto(
                    r.RecipeId,
                    r.Name,
                    r.BasePrice,
                    r.RecipeItems.OrderBy(ri => ri.Ingredient.Name).Select(ri => ri.Ingredient.Name).ToList()))
                .ToListAsync(ct);

            var sizes = await context.PizzaSizes
                .Where(s => s.IsActive)
                .OrderBy(s => s.PriceMultiplier)
                .ThenBy(s => s.Name)
                .Select(s => new PublicSizeDto(s.Name, s.PriceMultiplier))
                .ToListAsync(ct);

            var toppings = await context.Ingredients
                .Where(i => i.IsActive && i.ToppingPrice != null)
                .OrderBy(i => i.Name)
                .Select(i => new PublicToppingDto(i.Name, i.ToppingPrice!.Value))
                .ToListAsync(ct);

            // Same ranking as the customer home page (GET /api/recipes/popular with its defaults).
            var popular = await RecipesEndpoints.PopularRecipeIdsAsync(context, days: 30, limit: 4, ct);

            return TypedResults.Ok(new PublicMenuDto(recipes, sizes, toppings, popular));
        }
    }
}
