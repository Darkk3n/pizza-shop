using System.ComponentModel.DataAnnotations;

namespace PizzaShop.Api.Dtos
{
    // Validated automatically before the handler runs (see AddValidation in Program.cs),
    // including each entry in Items.
    public record CreateRecipeRequest(
        [Required, MaxLength(50)] string Name,
        [Range(typeof(decimal), "0", "99999999.99")] decimal BasePrice,
        [Required, MinLength(1)] List<RecipeItemRequest> Items);
}
