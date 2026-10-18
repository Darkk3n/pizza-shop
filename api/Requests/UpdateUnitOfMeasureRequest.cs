using System.ComponentModel.DataAnnotations;

namespace PizzaShop.Api.Requests
{
    // Validated automatically before the handler runs (see AddValidation in Program.cs).
    public record UpdateUnitOfMeasureRequest(
        [Required, MaxLength(20)] string Name);
}
