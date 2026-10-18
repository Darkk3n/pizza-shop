using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using PizzaShop.Api.Db;
using PizzaShop.Api.Dtos;
using PizzaShop.Api.Models;

namespace PizzaShop.Api.Endpoints
{
    public static class IngredientsEndpoints
    {
        private const string GetByIdRouteName = "GetIngredientById";

        public static IEndpointRouteBuilder MapIngredientsEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/api/ingredients")
                .WithTags("Ingredients");

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
            group.MapPost("/{id:guid}/stock-adjustments", AdjustStock)
                .ProducesProblem(StatusCodes.Status409Conflict)
                .ProducesValidationProblem();

            return app;
        }

        private static async Task<Ok<List<IngredientDto>>> GetAll(PizzaShopContext context, CancellationToken ct)
        {
            var ingredients = await context.Ingredients
                .OrderBy(i => i.Name)
                .Select(IngredientMapper.ToDto)
                .ToListAsync(ct);
            return TypedResults.Ok(ingredients);
        }

        private static async Task<Results<Ok<IngredientDto>, NotFound>> GetById(Guid id, PizzaShopContext context, CancellationToken ct)
        {
            var ingredient = await context.Ingredients
                .Where(i => i.IngredientId == id)
                .Select(IngredientMapper.ToDto)
                .FirstOrDefaultAsync(ct);
            return ingredient is null ? TypedResults.NotFound() : TypedResults.Ok(ingredient);
        }

        private static async Task<Results<CreatedAtRoute<IngredientDto>, ValidationProblem, ProblemHttpResult>> Create(CreateIngredientRequest request, PizzaShopContext context, CancellationToken ct)
        {
            var name = request.Name.Trim();

            var unitOfMeasure = await context.UnitsOfMeasure.FindAsync([request.UnitOfMeasureId], ct);
            if (unitOfMeasure is null)
            {
                return UnknownUnitOfMeasure(request.UnitOfMeasureId);
            }

            if (await NameTakenAsync(context, name, excludeId: null, ct))
            {
                return DuplicateName(name);
            }

            var ingredient = new Ingredient
            {
                Name = name,
                UnitOfMeasure = unitOfMeasure,
                CurrentStock = request.CurrentStock,
            };
            context.Ingredients.Add(ingredient);
            await context.SaveChangesAsync(ct);

            return TypedResults.CreatedAtRoute(
                IngredientMapper.FromEntity(ingredient),
                GetByIdRouteName,
                new { id = ingredient.IngredientId });
        }

        private static async Task<Results<Ok<IngredientDto>, NotFound, ValidationProblem, ProblemHttpResult>> Update(Guid id, UpdateIngredientRequest request, PizzaShopContext context, CancellationToken ct)
        {
            var ingredient = await context.Ingredients.FindAsync([id], ct);
            if (ingredient is null)
            {
                return TypedResults.NotFound();
            }

            var unitOfMeasure = await context.UnitsOfMeasure.FindAsync([request.UnitOfMeasureId], ct);
            if (unitOfMeasure is null)
            {
                return UnknownUnitOfMeasure(request.UnitOfMeasureId);
            }

            var name = request.Name.Trim();

            if (await NameTakenAsync(context, name, excludeId: id, ct))
            {
                return DuplicateName(name);
            }

            ingredient.Name = name;
            ingredient.UnitOfMeasure = unitOfMeasure;
            await context.SaveChangesAsync(ct);

            return TypedResults.Ok(IngredientMapper.FromEntity(ingredient));
        }

        private static async Task<Results<NoContent, NotFound, ProblemHttpResult>> Delete(Guid id, PizzaShopContext context, CancellationToken ct)
        {
            var ingredient = await context.Ingredients.FindAsync([id], ct);
            if (ingredient is null)
            {
                return TypedResults.NotFound();
            }

            // RecipeItem and OrderItemTopping FKs to Ingredient are Restrict, so check up front
            // for a clear 409 instead of surfacing a database exception.
            var inUse = await context.RecipeItems.AnyAsync(ri => ri.IngredientId == id, ct)
                || await context.OrderItemToppings.AnyAsync(t => t.IngredientId == id, ct);
            if (inUse)
            {
                return TypedResults.Problem(
                    statusCode: StatusCodes.Status409Conflict,
                    title: "Ingredient is in use.",
                    detail: $"The ingredient '{ingredient.Name}' is used by one or more recipes or orders.");
            }

            context.Ingredients.Remove(ingredient);
            await context.SaveChangesAsync(ct);

            return TypedResults.NoContent();
        }

        private static async Task<Results<Ok<IngredientDto>, NotFound, ProblemHttpResult>> AdjustStock(Guid id, AdjustIngredientStockRequest request, PizzaShopContext context, CancellationToken ct)
        {
            // Single atomic UPDATE so concurrent adjustments (and future order deductions)
            // can't overwrite each other; the guard keeps manual adjustments from going negative.
            var updated = await context.Ingredients
                .Where(i => i.IngredientId == id && i.CurrentStock + request.Delta >= 0)
                .ExecuteUpdateAsync(s => s.SetProperty(i => i.CurrentStock, i => i.CurrentStock + request.Delta), ct);

            var ingredient = await context.Ingredients
                .Where(i => i.IngredientId == id)
                .Select(IngredientMapper.ToDto)
                .FirstOrDefaultAsync(ct);

            if (updated == 0)
            {
                // Nothing was written: either the id doesn't exist or the guard rejected the delta.
                return ingredient is null
                    ? TypedResults.NotFound()
                    : TypedResults.Problem(
                        statusCode: StatusCodes.Status409Conflict,
                        title: "Insufficient stock.",
                        detail: $"Removing {-request.Delta} would leave '{ingredient.Name}' below zero (current stock: {ingredient.CurrentStock}).");
            }

            // Covers the rare case of the ingredient being deleted right after the update.
            return ingredient is null ? TypedResults.NotFound() : TypedResults.Ok(ingredient);
        }

        // Case-insensitive via ToLower(), which EF Core translates to SQL lower();
        // string.Equals with a StringComparison has no SQL translation.
        private static Task<bool> NameTakenAsync(PizzaShopContext context, string name, Guid? excludeId, CancellationToken ct)
        {
            var lowered = name.ToLower();
            return context.Ingredients
                .AnyAsync(i => i.Name.ToLower() == lowered && i.IngredientId != excludeId, ct);
        }

        private static ProblemHttpResult DuplicateName(string name) =>
            TypedResults.Problem(
                statusCode: StatusCodes.Status409Conflict,
                title: "Ingredient already exists.",
                detail: $"An ingredient named '{name}' already exists.");

        private static ValidationProblem UnknownUnitOfMeasure(Guid unitOfMeasureId) =>
            TypedResults.ValidationProblem(new Dictionary<string, string[]>
            {
                [nameof(CreateIngredientRequest.UnitOfMeasureId)] = [$"Unit of measure '{unitOfMeasureId}' does not exist."],
            });
    }
}
