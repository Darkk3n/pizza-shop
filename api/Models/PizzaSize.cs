using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace PizzaShop.Api.Models
{
    public class PizzaSize
    {
        [Key]
        public Guid PizzaSizeId { get; set; }

        [MaxLength(20)]
        public string Name { get; set; } = string.Empty;

        [Precision(3, 2)]
        public decimal PriceMultiplier { get; set; }
    }
}