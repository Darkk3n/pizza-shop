using System.ComponentModel.DataAnnotations;

namespace PizzaShop.Api.Dtos
{
    // Validated automatically before the handler runs (see AddValidation in Program.cs).
    // Positive Delta adds stock (restock); negative removes it (waste, recount).
    public record AdjustIngredientStockRequest(
        [Range(typeof(decimal), "-99999999.99", "99999999.99")] decimal Delta);
}
