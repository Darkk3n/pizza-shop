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
    }
}