using System.ComponentModel.DataAnnotations;

namespace PizzaShop.Api.Requests
{
    // Validated automatically before the handler runs (see AddValidation in Program.cs).
    // ToppingPrice and ToppingPortion go together: set both to offer it as a topping, or omit both.
    public record CreateIngredientRequest(
        [Required, MaxLength(50)] string Name,
        Guid UnitOfMeasureId,
        [Range(typeof(decimal), "0", "99999999.99")] decimal CurrentStock = 0m,
        [Range(typeof(decimal), "0", "99999999.99")] decimal? ToppingPrice = null,
        [Range(typeof(decimal), "0.0001", "999999.9999")] decimal? ToppingPortion = null);
}
