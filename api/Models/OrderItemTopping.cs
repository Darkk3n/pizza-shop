using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PizzaShop.Api.Models
{
    public class OrderItemTopping
    {
        [Key]
        public Guid OrderItemToppingId { get; set; }

        [ForeignKey(nameof(OrderItemId))]
        public OrderItem OrderItem { get; set; } = null!;

        public Guid OrderItemId { get; set; }

        [ForeignKey(nameof(IngredientId))]
        public Ingredient Ingredient { get; set; } = null!;

        public Guid IngredientId { get; set; }

        [MaxLength(20)]
        public ToppingCoverage Coverage { get; set; }

        [MaxLength(20)]
        public ToppingAmount ExtraAmount { get; set; }

        [Precision(10, 2)]
        public decimal PriceAdjustment { get; set; }
    }
}