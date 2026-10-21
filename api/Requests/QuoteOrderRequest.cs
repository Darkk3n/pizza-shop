using System.ComponentModel.DataAnnotations;

namespace PizzaShop.Api.Requests
{
    // Same items as CreateOrderRequest, priced without placing an order (the pizza builder's live
    // price). Validated automatically before the handler runs (see AddValidation in Program.cs).
    public record QuoteOrderRequest(
        [Required, MinLength(1)] List<OrderItemRequest> Items);
}
