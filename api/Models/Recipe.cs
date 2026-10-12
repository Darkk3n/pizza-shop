using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace PizzaShop.Api.Models
{
    public class Recipe
    {
        [Key]
        public Guid RecipeId { get; set; }

        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;

        [Precision(10, 2)]
        public decimal BasePrice { get; set; }
    }
}