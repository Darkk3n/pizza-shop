using System.ComponentModel.DataAnnotations;

namespace PizzaShop.Api.Requests
{
    // Validated automatically before the handler runs (see AddValidation in Program.cs).
    // Stock isn't editable here; it changes through stock adjustments and orders.
    // IsActive = false takes it out of new recipes and topping lists; it is a full replacement, so send the current value.
    // ToppingPrice and ToppingPortion go together: set both to offer it as a topping, or omit both.
    public record UpdateIngredientRequest(
        [Required, MaxLength(50)] string Name,
        Guid UnitOfMeasureId,
        [Range(typeof(decimal), "0", "99999999.99")] decimal? ToppingPrice = null,
        [Range(typeof(decimal), "0.0001", "999999.9999")] decimal? ToppingPortion = null,
        bool IsActive = true);
}
