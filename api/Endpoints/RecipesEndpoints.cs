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

        private static async Task<Ok<List<RecipeDto>>> GetAll(ClaimsPrincipal user, PizzaShopContext context, CancellationToken ct)
        {
            var recipes = await VisibleRecipes(context, user)
                .OrderBy(r => r.Name)
                .Select(RecipeMapper.ToDto)
                .ToListAsync(ct);
            return TypedResults.Ok(recipes);
        }

        private static async Task<Results<Ok<RecipeDto>, NotFound>> GetById(Guid id, ClaimsPrincipal user, PizzaShopContext context, CancellationToken ct)
        {
            var recipe = await VisibleRecipes(context, user)
                .Where(r => r.RecipeId == id)
                .Select(RecipeMapper.ToDto)
                .FirstOrDefaultAsync(ct);
            return recipe is null ? TypedResults.NotFound() : TypedResults.Ok(recipe);
        }

        private static async Task<Results<CreatedAtRoute<RecipeDto>, ValidationProblem, ProblemHttpResult>> Create(CreateRecipeRequest request, PizzaShopContext context, CancellationToken ct)
        {
            var itemErrors = await ValidateItemsAsync(context, request.Items, alreadyInRecipe: new HashSet<Guid>(), ct);
            if (itemErrors is not null)
            {
                return TypedResults.ValidationProblem(itemErrors);
            }

            var name = request.Name.Trim();

            if (await context.Recipes.NameTakenAsync(name, excludeId: null, ct))
            {
                return UniqueNames.DuplicateName("Recipe", name);
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

            // Ingredients retired after being added stay allowed, so existing recipes remain editable.
            var alreadyInRecipe = recipe.RecipeItems.Select(ri => ri.IngredientId).ToHashSet();
            var itemErrors = await ValidateItemsAsync(context, request.Items, alreadyInRecipe, ct);
            if (itemErrors is not null)
            {
                return TypedResults.ValidationProblem(itemErrors);
            }

            var name = request.Name.Trim();

            if (await context.Recipes.NameTakenAsync(name, excludeId: id, ct))
            {
                return UniqueNames.DuplicateName("Recipe", name);
            }

            recipe.Name = name;
            recipe.BasePrice = request.BasePrice;
            recipe.IsActive = request.IsActive;

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
                    detail: $"The recipe '{recipe.Name}' appears in one or more orders. Set isActive to false to take it off the menu instead.");
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

        // Staff and admins see the whole catalog (to manage it); customers only the active menu.
        private static IQueryable<Recipe> VisibleRecipes(PizzaShopContext context, ClaimsPrincipal user) =>
            user.IsStaff()
                ? context.Recipes
                : context.Recipes.Where(r => r.IsActive);

        // Attribute validation already covers each item's Amount; this checks what needs the
        // whole list or the database: no repeated ingredients, every ingredient exists, and
        // inactive ingredients aren't newly added (ones already in the recipe may stay).
        private static async Task<Dictionary<string, string[]>?> ValidateItemsAsync(PizzaShopContext context, List<RecipeItemRequest> items, IReadOnlySet<Guid> alreadyInRecipe, CancellationToken ct)
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
                .Select(i => new { i.IngredientId, i.Name, i.IsActive })
                .ToListAsync(ct);
            var missing = ingredientIds.Except(found.Select(i => i.IngredientId)).ToList();
            if (missing.Count > 0)
            {
                return new()
                {
                    [nameof(CreateRecipeRequest.Items)] = [$"Ingredients not found: {string.Join(", ", missing)}."],
                };
            }

            var newlyInactive = found
                .Where(i => !i.IsActive && !alreadyInRecipe.Contains(i.IngredientId))
                .Select(i => i.Name)
                .ToList();
            if (newlyInactive.Count > 0)
            {
                return new()
                {
                    [nameof(CreateRecipeRequest.Items)] = [$"Inactive ingredients can't be added: {string.Join(", ", newlyInactive)}."],
                };
            }

            return null;
        }
    }
}
