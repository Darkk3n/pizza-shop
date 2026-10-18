using System.ComponentModel.DataAnnotations;

namespace PizzaShop.Api.Requests
{
    // Validated automatically before the handler runs (see AddValidation in Program.cs).
    // PriceMultiplier is stored as Decimal(3,2), so 9.99 is the largest value that fits.
    public record UpdatePizzaSizeRequest(
        [Required, MaxLength(20)] string Name,
        [Range(typeof(decimal), "0.01", "9.99")] decimal PriceMultiplier);
}
