using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PizzaShop.Api.Models
{
    // Stock deducted by an order, one row per ingredient (recipe amounts and toppings combined).
    // Written when the order is created; read back to restock on cancellation.
    [Index(nameof(OrderId), nameof(IngredientId), IsUnique = true)]
    public class OrderIngredientUsage
    {
        [Key]
        public Guid OrderIngredientUsageId { get; set; }

        [ForeignKey(nameof(OrderId))]
        public Order Order { get; set; } = null!;

        public Guid OrderId { get; set; }

        [ForeignKey(nameof(IngredientId))]
        public Ingredient Ingredient { get; set; } = null!;

        public Guid IngredientId { get; set; }

        // In the ingredient's unit of measure, rounded to the same precision as RecipeItem.Amount.
        [Precision(10, 4)]
        public decimal Amount { get; set; }
    }
}
