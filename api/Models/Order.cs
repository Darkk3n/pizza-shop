using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PizzaShop.Api.Models
{
    [Index(nameof(OrderNumber), IsUnique = true)]
    [Index(nameof(IdempotencyKey), IsUnique = true, Name = IdempotencyKeyIndexName)]
    // Statistics filter every query on a CreatedAt range.
    [Index(nameof(CreatedAt))]
    // The dashboard's active queue (Pending/Preparing/Ready) is a small slice of all orders.
    [Index(nameof(Status))]
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

        // The customer who ordered, or the staff member who rang up a walk-in.
        [ForeignKey(nameof(PlacedByUserId))]
        public AppUser PlacedBy { get; set; } = null!;

        public Guid PlacedByUserId { get; set; }

        // Client-generated key from the Idempotency-Key header: a retried POST with the
        // same key returns this order instead of creating (and deducting stock for) another.
        public Guid IdempotencyKey { get; set; }

        // SHA-256 (hex) of the create request, so a reused key with a different body is rejected.
        [MaxLength(64)]
        public string RequestHash { get; set; } = string.Empty;

        // Set together when the order is cancelled (Status = Cancelled). Cancelled orders keep
        // their totals so statistics can report them separately.
        public DateTimeOffset? CancelledAt { get; set; }

        [ForeignKey(nameof(CancelledByUserId))]
        public AppUser? CancelledBy { get; set; }

        public Guid? CancelledByUserId { get; set; }

        [MaxLength(200)]
        public string? CancellationReason { get; set; }

        public List<OrderItem> Items { get; set; } = [];

        // Exactly what this order took from stock, so a cancellation returns the same amounts
        // even if recipes or topping portions have changed since.
        public List<OrderIngredientUsage> IngredientUsages { get; set; } = [];
    }
}