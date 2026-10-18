using System.ComponentModel.DataAnnotations;

namespace PizzaShop.Api.Requests
{
    // Validated automatically before the handler runs (see AddValidation in Program.cs),
    // including each entry in Items. Items replaces the recipe's full ingredient list.
    public record UpdateRecipeRequest(
        [Required, MaxLength(50)] string Name,
        [Range(typeof(decimal), "0", "99999999.99")] decimal BasePrice,
        [Required, MinLength(1)] List<RecipeItemRequest> Items);
}
