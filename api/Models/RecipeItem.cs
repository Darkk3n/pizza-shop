using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PizzaShop.Api.Models
{
    public class RecipeItem
    {
        [Key]
        public Guid RecipeItemId { get; set; }

        [ForeignKey(nameof(IngredientId))]
        public Ingredient Ingredient { get; set; }

        public Guid IngredientId { get; set; }

        [ForeignKey(nameof(RecipeId))]
        public Recipe Recipe { get; set; }

        public Guid RecipeId { get; set; }

        [Precision(10, 4)]
        public decimal Amount { get; set; }
    }
}