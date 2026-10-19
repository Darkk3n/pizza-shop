using System.ComponentModel.DataAnnotations;
using PizzaShop.Api.Models;

namespace PizzaShop.Api.Requests
{
    // Validated automatically before the handler runs (see AddValidation in Program.cs),
    // including each item and topping. Prices aren't accepted: the server computes them.
    public record CreateOrderRequest(
        OrderType OrderType,
        [Required, MinLength(1)] List<OrderItemRequest> Items);
}
