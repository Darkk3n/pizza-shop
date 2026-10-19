using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using PizzaShop.Api.Auth;
using PizzaShop.Api.Db;
using PizzaShop.Api.Dtos;
using PizzaShop.Api.Models;
using PizzaShop.Api.Requests;

namespace PizzaShop.Api.Endpoints
{
    public static class RecipesEndpoints
    {
        private const string GetByIdRouteName = "GetRecipeById";

        public static IEndpointRouteBuilder MapRecipesEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/api/recipes")
                .WithTags("Recipes")
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

        private static async Task<Ok<List<RecipeDto>>> GetAll(PizzaShopContext context, CancellationToken ct)
        {
            var recipes = await context.Recipes
                .OrderBy(r => r.Name)
                .Select(RecipeMapper.ToDto)
                .ToListAsync(ct);
            return TypedResults.Ok(recipes);
        }

        private static async Task<Results<Ok<RecipeDto>, NotFound>> GetById(Guid id, PizzaShopContext context, CancellationToken ct)
        {
            var recipe = await FindDtoAsync(context, id, ct);
            return recipe is null ? TypedResults.NotFound() : TypedResults.Ok(recipe);
        }

        private static async Task<Results<CreatedAtRoute<RecipeDto>, ValidationProblem, ProblemHttpResult>> Create(CreateRecipeRequest request, PizzaShopContext context, CancellationToken ct)
        {
            var itemErrors = await ValidateItemsAsync(context, request.Items, ct);
            if (itemErrors is not null)
            {
                return TypedResults.ValidationProblem(itemErrors);
            }

            var name = request.Name.Trim();

            if (await NameTakenAsync(context, name, excludeId: null, ct))
            {
                return DuplicateName(name);
            }

            var recipe = new Recipe
            {
                Name = name,
                BasePrice = request.BasePrice,
                RecipeItems = [.. request.Items.Select(item => new RecipeItem { IngredientId = item.IngredientId, Amount = item.Amount })],
            };
            context.Recipes.Add(recipe);
            await context.SaveChangesAsync(ct);

            // Re-read through the projection so the response carries ingredient and unit names.
            var dto = await FindDtoAsync(context, recipe.RecipeId, ct);
            return TypedResults.CreatedAtRoute(dto, GetByIdRouteName, new { id = recipe.RecipeId });
        }

        private static async Task<Results<Ok<RecipeDto>, NotFound, ValidationProblem, ProblemHttpResult>> Update(Guid id, UpdateRecipeRequest request, PizzaShopContext context, CancellationToken ct)
        {
            var recipe = await context.Recipes
                .Include(r => r.RecipeItems)
                .FirstOrDefaultAsync(r => r.RecipeId == id, ct);
            if (recipe is null)
            {
                return TypedResults.NotFound();
            }

            var itemErrors = await ValidateItemsAsync(context, request.Items, ct);
            if (itemErrors is not null)
            {
                return TypedResults.ValidationProblem(itemErrors);
            }

            var name = request.Name.Trim();

            if (await NameTakenAsync(context, name, excludeId: id, ct))
            {
                return DuplicateName(name);
            }

            recipe.Name = name;
            recipe.BasePrice = request.BasePrice;

            // Sync items by ingredient: keep and update matches (stable RecipeItemIds),
            // drop the ones no longer listed (deleted as orphans on save), add the new ones.
            var requested = request.Items.ToDictionary(item => item.IngredientId, item => item.Amount);
            foreach (var existing in recipe.RecipeItems.ToList())
            {
                if (requested.Remove(existing.IngredientId, out var amount))
                {
                    existing.Amount = amount;
                }
                else
                {
                    recipe.RecipeItems.Remove(existing);
                }
            }
            foreach (var (ingredientId, amount) in requested)
            {
                recipe.RecipeItems.Add(new RecipeItem { IngredientId = ingredientId, Amount = amount });
            }

            await context.SaveChangesAsync(ct);

            var dto = await FindDtoAsync(context, id, ct);
            return dto is null ? TypedResults.NotFound() : TypedResults.Ok(dto);
        }

        private static async Task<Results<NoContent, NotFound, ProblemHttpResult>> Delete(Guid id, PizzaShopContext context, CancellationToken ct)
        {
            var recipe = await context.Recipes.FindAsync([id], ct);
            if (recipe is null)
            {
                return TypedResults.NotFound();
            }

            // The OrderItem -> Recipe FK is Restrict, so check up front for a clear 409
            // instead of surfacing a database exception. Recipe items cascade.
            var inUse = await context.OrderItems.AnyAsync(oi => oi.RecipeId == id, ct);
            if (inUse)
            {
                return TypedResults.Problem(
                    statusCode: StatusCodes.Status409Conflict,
                    title: "Recipe is in use.",
                    detail: $"The recipe '{recipe.Name}' appears in one or more orders.");
            }

            context.Recipes.Remove(recipe);
            await context.SaveChangesAsync(ct);

            return TypedResults.NoContent();
        }

        private static Task<RecipeDto?> FindDtoAsync(PizzaShopContext context, Guid id, CancellationToken ct) =>
            context.Recipes
                .Where(r => r.RecipeId == id)
                .Select(RecipeMapper.ToDto)
                .FirstOrDefaultAsync(ct);

        // Attribute validation already covers each item's Amount; this checks what needs the
        // whole list or the database: no repeated ingredients, and every ingredient exists.
        private static async Task<Dictionary<string, string[]>?> ValidateItemsAsync(PizzaShopContext context, List<RecipeItemRequest> items, CancellationToken ct)
        {
            var repeated = items
                .GroupBy(item => item.IngredientId)
                .Where(g => g.Count() > 1)
                .Select(g => g.Key)
                .ToList();
            if (repeated.Count > 0)
            {
                return new()
                {
                    [nameof(CreateRecipeRequest.Items)] = [$"Each ingredient can appear only once. Repeated: {string.Join(", ", repeated)}."],
                };
            }

            var ingredientIds = items.Select(item => item.IngredientId).ToList();
            var found = await context.Ingredients
                .Where(i => ingredientIds.Contains(i.IngredientId))
                .Select(i => i.IngredientId)
                .ToListAsync(ct);
            var missing = ingredientIds.Except(found).ToList();
            if (missing.Count > 0)
            {
                return new()
                {
                    [nameof(CreateRecipeRequest.Items)] = [$"Ingredients not found: {string.Join(", ", missing)}."],
                };
            }

            return null;
        }

        // Case-insensitive via ToLower(), which EF Core translates to SQL lower();
        // string.Equals with a StringComparison has no SQL translation.
        private static Task<bool> NameTakenAsync(PizzaShopContext context, string name, Guid? excludeId, CancellationToken ct)
        {
            var lowered = name.ToLower();
            return context.Recipes
                .AnyAsync(r => r.Name.ToLower() == lowered && r.RecipeId != excludeId, ct);
        }

        private static ProblemHttpResult DuplicateName(string name) =>
            TypedResults.Problem(
                statusCode: StatusCodes.Status409Conflict,
                title: "Recipe already exists.",
                detail: $"A recipe named '{name}' already exists.");
    }
}
