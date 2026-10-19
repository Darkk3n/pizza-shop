using PizzaShop.Api.Models;

namespace PizzaShop.Api.Requests
{
    // Status can only move forward (Pending -> Preparing -> Ready -> Completed); skipping steps is allowed.
    public record UpdateOrderStatusRequest(OrderStatus Status);
}
