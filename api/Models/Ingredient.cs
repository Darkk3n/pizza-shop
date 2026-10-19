using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PizzaShop.Api.Models
{
    public class Ingredient
    {
        [Key]
        public Guid IngredientId { get; set; }

        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;

        [ForeignKey(nameof(UnitOfMeasureId))]
        public UnitOfMeasure UnitOfMeasure { get; set; } = null!;

        public Guid UnitOfMeasureId { get; set; }

        [Precision(10, 2)]
        public decimal CurrentStock { get; set; }

        // Inactive ingredients can't be added to recipes or ordered as toppings, but stay in
        // existing recipes and order history (an ingredient that has been used can't be deleted).
        public bool IsActive { get; set; } = true;

        // Both null when the ingredient isn't offered as a topping (e.g. flour, yeast).
        // ToppingPortion is one Small, Whole, Standard serving in the ingredient's unit of measure;
        // orders scale it and ToppingPrice by coverage, amount and size.
        [Precision(10, 2)]
        public decimal? ToppingPrice { get; set; }

        [Precision(10, 4)]
        public decimal? ToppingPortion { get; set; }
    }
}