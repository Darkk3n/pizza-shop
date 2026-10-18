using System.Linq.Expressions;
using PizzaShop.Api.Models;

namespace PizzaShop.Api.Dtos
{
    public record RecipeDto(
        Guid RecipeId,
        string Name,
        decimal BasePrice,
        List<RecipeItemDto> Items) { }

    public record RecipeItemDto(
        Guid RecipeItemId,
        Guid IngredientId,
        string IngredientName,
        string UnitOfMeasureName,
        decimal Amount) { }

    public static class RecipeMapper
    {
        public static readonly Expression<Func<Recipe, RecipeDto>> ToDto = r => new RecipeDto(
            r.RecipeId,
            r.Name,
            r.BasePrice,
            r.RecipeItems
                .OrderBy(ri => ri.Ingredient.Name)
                .Select(ri => new RecipeItemDto(
                    ri.RecipeItemId,
                    ri.IngredientId,
                    ri.Ingredient.Name,
                    ri.Ingredient.UnitOfMeasure.Name,
                    ri.Amount))
                .ToList());
    }
}
