using System.ComponentModel.DataAnnotations;

namespace PizzaShop.Api.Requests
{
    // Validated automatically before the handler runs (see AddValidation in Program.cs).
    // Stock isn't editable here; it changes through stock adjustments and orders.
    public record UpdateIngredientRequest(
        [Required, MaxLength(50)] string Name,
        Guid UnitOfMeasureId);
}
