using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PizzaShop.Api.Models
{
    [Index(nameof(OrderNumber), IsUnique = true)]
    [Index(nameof(IdempotencyKey), IsUnique = true, Name = IdempotencyKeyIndexName)]
    public class Order
    {
        public const string IdempotencyKeyIndexName = "IX_Orders_IdempotencyKey";

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

        // Client-generated key from the Idempotency-Key header: a retried POST with the
        // same key returns this order instead of creating (and deducting stock for) another.
        public Guid IdempotencyKey { get; set; }

        // SHA-256 (hex) of the create request, so a reused key with a different body is rejected.
        [MaxLength(64)]
        public string RequestHash { get; set; } = string.Empty;

        public List<OrderItem> Items { get; set; } = [];
    }
}