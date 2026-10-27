using System.ComponentModel.DataAnnotations;

namespace PizzaShop.Api.Requests
{
    // Validated automatically before the handler runs (see AddValidation in Program.cs).
    // PriceMultiplier is stored as Decimal(3,2), so 9.99 is the largest value that fits.
    // IsActive = false takes the size off the menu; it is a full replacement, so send the current value.
    public record UpdatePizzaSizeRequest(
        [Required, MaxLength(20)] string Name,
        [Range(typeof(decimal), "0.01", "9.99")] decimal PriceMultiplier,
        bool IsActive = true);
}
