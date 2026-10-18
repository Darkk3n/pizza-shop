using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PizzaShop.Api.Models
{
    // An ingredient appears at most once per recipe.
    [Index(nameof(RecipeId), nameof(IngredientId), IsUnique = true)]
    public class RecipeItem
    {
        [Key]
        public Guid RecipeItemId { get; set; }

        [ForeignKey(nameof(IngredientId))]
        public Ingredient Ingredient { get; set; } = null!;

        public Guid IngredientId { get; set; }

        [ForeignKey(nameof(RecipeId))]
        public Recipe Recipe { get; set; } = null!;

        public Guid RecipeId { get; set; }

        [Precision(10, 4)]
        public decimal Amount { get; set; }
    }
}