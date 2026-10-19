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

        // Inactive recipes are off the menu: hidden from customers and rejected in new orders,
        // but kept for order history (a recipe that has been sold can't be deleted).
        public bool IsActive { get; set; } = true;

        public List<RecipeItem> RecipeItems { get; set; } = [];
    }
}