using System.ComponentModel.DataAnnotations;

namespace PizzaShop.Api.Requests
{
    // One line of an order. PizzaSizeId is omitted for non-sized items (e.g. drinks).
    public record OrderItemRequest(
        Guid RecipeId,
        Guid? PizzaSizeId,
        [Range(1, 100)] int Quantity = 1,
        List<OrderItemToppingRequest>? Toppings = null);
}
