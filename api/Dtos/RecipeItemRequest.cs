using System.ComponentModel.DataAnnotations;

namespace PizzaShop.Api.Dtos
{
    // One ingredient line of a recipe, shared by the create and update requests.
    // Amount is in the ingredient's unit of measure; precision matches RecipeItem.Amount (10,4).
    public record RecipeItemRequest(
        Guid IngredientId,
        [Range(typeof(decimal), "0.0001", "999999.9999")] decimal Amount);
}
