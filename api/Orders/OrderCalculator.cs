using PizzaShop.Api.Models;
using PizzaShop.Api.Requests;

namespace PizzaShop.Api.Orders
{
    // The priced lines, totals and stock deductions for an order request, ready to attach to an Order.
    public record PricedOrder(
        List<OrderItem> Items,
        decimal SubTotal,
        decimal Tax,
        decimal Total,
        List<OrderIngredientUsage> IngredientUsages);

    // Pure pricing and inventory math for a new order: no database, no HTTP. The caller loads the
    // referenced catalog rows and validates the request first (every id must be in the dictionaries,
    // every topping must have ToppingPrice and ToppingPortion).
    public static class OrderCalculator
    {
        public static PricedOrder Price(
            IEnumerable<OrderItemRequest> items,
            IReadOnlyDictionary<Guid, Recipe> recipes,
            IReadOnlyDictionary<Guid, PizzaSize> sizes,
            IReadOnlyDictionary<Guid, Ingredient> toppingIngredients,
            decimal taxRate)
        {
            var orderItems = new List<OrderItem>();
            var deductions = new Dictionary<Guid, decimal>();

            foreach (var item in items)
            {
                var recipe = recipes[item.RecipeId];
                var size = item.PizzaSizeId is { } sizeId ? sizes[sizeId] : null;
                // Recipe amounts and topping portions are for a Small; larger sizes scale
                // ingredients by the same multiplier as the price.
                var sizeMultiplier = size?.PriceMultiplier ?? 1m;

                var orderItem = new OrderItem
                {
                    RecipeId = recipe.RecipeId,
                    PizzaSizeId = size?.PizzaSizeId,
                    ItemNameSnapshot = size is null ? recipe.Name : $"{size.Name} {recipe.Name}",
                    Quantity = item.Quantity,
                };

                foreach (var recipeItem in recipe.RecipeItems)
                {
                    AddDeduction(deductions, recipeItem.IngredientId, recipeItem.Amount * sizeMultiplier * item.Quantity);
                }

                foreach (var topping in item.Toppings ?? [])
                {
                    var ingredient = toppingIngredients[topping.IngredientId];
                    var factor = CoverageFactor(topping.Coverage) * AmountFactor(topping.ExtraAmount) * sizeMultiplier;

                    orderItem.Toppings.Add(new OrderItemTopping
                    {
                        IngredientId = ingredient.IngredientId,
                        Coverage = topping.Coverage,
                        ExtraAmount = topping.ExtraAmount,
                        PriceAdjustment = RoundMoney(ingredient.ToppingPrice!.Value * factor),
                    });
                    AddDeduction(deductions, ingredient.IngredientId, ingredient.ToppingPortion!.Value * factor * item.Quantity);
                }

                orderItem.UnitPrice = RoundMoney(recipe.BasePrice * sizeMultiplier) + orderItem.Toppings.Sum(t => t.PriceAdjustment);
                orderItem.LineTotal = orderItem.UnitPrice * item.Quantity;
                orderItems.Add(orderItem);
            }

            var subTotal = orderItems.Sum(i => i.LineTotal);
            var tax = RoundMoney(subTotal * taxRate);

            // Rounded once to the stored precision, so the amount deducted now is exactly the
            // amount a cancellation returns later.
            List<OrderIngredientUsage> usages = [.. deductions
                .Select(d => new OrderIngredientUsage { IngredientId = d.Key, Amount = Math.Round(d.Value, 4, MidpointRounding.AwayFromZero) })
                .Where(u => u.Amount > 0)];

            return new PricedOrder(orderItems, subTotal, tax, subTotal + tax, usages);
        }

        private static void AddDeduction(Dictionary<Guid, decimal> deductions, Guid ingredientId, decimal amount) =>
            deductions[ingredientId] = deductions.GetValueOrDefault(ingredientId) + amount;

        private static decimal CoverageFactor(ToppingCoverage coverage) => coverage switch
        {
            ToppingCoverage.Whole => 1m,
            ToppingCoverage.LeftHalf or ToppingCoverage.RightHalf => 0.5m,
            _ => throw new ArgumentOutOfRangeException(nameof(coverage), coverage, null),
        };

        private static decimal AmountFactor(ToppingAmount amount) => amount switch
        {
            ToppingAmount.Light => 0.5m,
            ToppingAmount.Standard => 1m,
            ToppingAmount.Extra => 1.5m,
            _ => throw new ArgumentOutOfRangeException(nameof(amount), amount, null),
        };

        private static decimal RoundMoney(decimal value) => Math.Round(value, 2, MidpointRounding.AwayFromZero);
    }
}
