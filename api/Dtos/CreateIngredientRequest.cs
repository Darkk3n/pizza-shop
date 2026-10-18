using System.ComponentModel.DataAnnotations;

namespace PizzaShop.Api.Dtos
{
    // Validated automatically before the handler runs (see AddValidation in Program.cs).
    public record CreateIngredientRequest(
        [Required, MaxLength(50)] string Name,
        Guid UnitOfMeasureId,
        [Range(typeof(decimal), "0", "99999999.99")] decimal CurrentStock = 0m);
}
