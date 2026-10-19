using PizzaShop.Api.Models;

namespace PizzaShop.Api.Requests
{
    // An extra topping on an order item; the ingredient must have ToppingPrice and ToppingPortion set.
    public record OrderItemToppingRequest(
        Guid IngredientId,
        ToppingCoverage Coverage = ToppingCoverage.Whole,
        ToppingAmount ExtraAmount = ToppingAmount.Standard);
}
