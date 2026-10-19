using System.Linq.Expressions;
using PizzaShop.Api.Models;

namespace PizzaShop.Api.Dtos
{
    // Customer-facing view of an ingredient offered as a topping: no stock or portion data.
    public record ToppingDto(
        Guid IngredientId,
        string Name,
        string UnitOfMeasureName,
        decimal ToppingPrice) { }

    public static class ToppingMapper
    {
        // Only valid for ingredients with ToppingPrice set (see ToppingsEndpoints).
        public static readonly Expression<Func<Ingredient, ToppingDto>> ToDto = i => new ToppingDto(
            i.IngredientId,
            i.Name,
            i.UnitOfMeasure.Name,
            i.ToppingPrice!.Value);
    }
}
