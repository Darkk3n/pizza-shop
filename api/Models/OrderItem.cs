using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PizzaShop.Api.Models
{
    public class OrderItem
    {
        [Key]
        public Guid OrderItemId { get; set; }

        [ForeignKey(nameof(OrderId))]
        public Order Order { get; set; } = null!;

        public Guid OrderId { get; set; }

        [ForeignKey(nameof(RecipeId))]
        public Recipe? Recipe { get; set; }

        public Guid? RecipeId { get; set; }

        public int Quantity { get; set; }

        [Precision(10, 2)]
        public decimal UnitPrice { get; set; }

        [Precision(10, 2)]
        public decimal LineTotal { get; set; }

        [MaxLength(100)]
        public string ItemNameSnapshot { get; set; } = string.Empty;

        [ForeignKey(nameof(PizzaSizeId))]
        public PizzaSize? PizzaSize { get; set; }

        public Guid? PizzaSizeId { get; set; }

        public List<OrderItemTopping> Toppings { get; set; } = [];
    }
}