using System.ComponentModel.DataAnnotations;

namespace PizzaShop.Api.Requests
{
    // Optional body for POST /api/orders/{id}/cancel; the reason is kept for statistics.
    public record CancelOrderRequest([MaxLength(200)] string? Reason = null);
}
