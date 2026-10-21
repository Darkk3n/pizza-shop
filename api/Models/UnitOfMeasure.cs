using System.ComponentModel.DataAnnotations;

namespace PizzaShop.Api.Models
{
    public class UnitOfMeasure : INamedEntity
    {
        [Key]
        public Guid UnitOfMeasureId { get; set; }

        [MaxLength(20)]
        public string Name { get; set; } = string.Empty;
    }
}