using System.Linq.Expressions;
using PizzaShop.Api.Models;

namespace PizzaShop.Api.Dtos
{
    public record IngredientDto(
        Guid IngredientId,
        string Name,
        Guid UnitOfMeasureId,
        string UnitOfMeasureName,
        decimal CurrentStock,
        decimal? ToppingPrice,
        decimal? ToppingPortion) { }

    public static class IngredientMapper
    {
        public static readonly Expression<Func<Ingredient, IngredientDto>> ToDto = i => new IngredientDto(
            i.IngredientId,
            i.Name,
            i.UnitOfMeasureId,
            i.UnitOfMeasure.Name,
            i.CurrentStock,
            i.ToppingPrice,
            i.ToppingPortion);

        // Same mapping for entities already in memory (e.g. right after an insert);
        // compiled once so ToDto stays the single source of truth.
        // The UnitOfMeasure navigation must be loaded.
        private static readonly Func<Ingredient, IngredientDto> toDtoCompiled = ToDto.Compile();

        public static IngredientDto FromEntity(Ingredient ingredient) => toDtoCompiled(ingredient);
    }
}
