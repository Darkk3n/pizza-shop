using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PizzaShop.Api.Models
{
    [Index(nameof(OrderNumber), IsUnique = true)]
    public class Order
    {
        [Key]
        public Guid OrderId { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderNumber { get; set; }

        [MaxLength(20)]
        public OrderStatus Status { get; set; }

        [MaxLength(20)]
        public OrderType OrderType { get; set; }

        [Precision(10, 2)]
        public decimal SubTotal { get; set; }

        [Precision(10, 2)]
        public decimal Tax { get; set; }

        [Precision(10, 2)]
        public decimal Total { get; set; }

        public DateTimeOffset CreatedAt { get; set; }
    }
}