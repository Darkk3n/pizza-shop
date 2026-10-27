using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace PizzaShop.Api.Models
{
    public class PizzaSize : INamedEntity
    {
        [Key]
        public Guid PizzaSizeId { get; set; }

        [MaxLength(20)]
        public string Name { get; set; } = string.Empty;

        [Precision(3, 2)]
        public decimal PriceMultiplier { get; set; }

        // Inactive sizes are off the menu: hidden from customers and rejected in new orders,
        // but kept for order history (a size that has been sold can't be deleted).
        public bool IsActive { get; set; } = true;
    }
}