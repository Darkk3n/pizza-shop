using PizzaShop.Api.Models;
using PizzaShop.Api.Orders;
using PizzaShop.Api.Requests;

namespace PizzaShop.Api.Tests
{
    // Unit tests: OrderCalculator is pure, so these need no database or API host.
    public class OrderCalculatorTests
    {
        private const decimal TaxRate = 0.0825m;

        private static readonly PizzaSize Large = new() { PizzaSizeId = Guid.NewGuid(), Name = "Large", PriceMultiplier = 1.70m };
        private static readonly PizzaSize Medium = new() { PizzaSizeId = Guid.NewGuid(), Name = "Medium", PriceMultiplier = 1.25m };

        private static Ingredient Ingredient(decimal? toppingPrice = null, decimal? toppingPortion = null) =>
            new() { IngredientId = Guid.NewGuid(), Name = "Ingredient", ToppingPrice = toppingPrice, ToppingPortion = toppingPortion };

        private static Recipe Recipe(decimal basePrice, params (Ingredient Ingredient, decimal Amount)[] items)
        {
            var recipe = new Recipe { RecipeId = Guid.NewGuid(), Name = "Margherita", BasePrice = basePrice };
            recipe.RecipeItems = [.. items.Select(i => new RecipeItem { RecipeId = recipe.RecipeId, IngredientId = i.Ingredient.IngredientId, Amount = i.Amount })];
            return recipe;
        }

        private static PricedOrder Price(
            IEnumerable<OrderItemRequest> items,
            IEnumerable<Recipe> recipes,
            IEnumerable<Ingredient>? toppings = null,
            decimal taxRate = TaxRate) =>
            OrderCalculator.Price(
                items,
                recipes.ToDictionary(r => r.RecipeId),
                new[] { Large, Medium }.ToDictionary(s => s.PizzaSizeId),
                (toppings ?? []).ToDictionary(i => i.IngredientId),
                taxRate);

        private static decimal Usage(PricedOrder priced, Ingredient ingredient) =>
            Assert.Single(priced.IngredientUsages, u => u.IngredientId == ingredient.IngredientId).Amount;

        [Fact]
        public void SizedItemWithHalfExtraTopping_ScalesPricesAndDeductions()
        {
            // Same numbers as OrdersTests, without the database.
            var dough = Ingredient();
            var cheese = Ingredient(toppingPrice: 1.00m, toppingPortion: 50);
            var recipe = Recipe(10.00m, (dough, 100), (cheese, 50));

            var priced = Price(
                [new OrderItemRequest(recipe.RecipeId, Large.PizzaSizeId, 2, [new OrderItemToppingRequest(cheese.IngredientId, ToppingCoverage.LeftHalf, ToppingAmount.Extra)])],
                [recipe], [cheese]);

            var item = Assert.Single(priced.Items);
            Assert.Equal("Large Margherita", item.ItemNameSnapshot);
            Assert.Equal(Large.PizzaSizeId, item.PizzaSizeId);
            // Topping 1.00 x 0.5 (half) x 1.5 (extra) x 1.70 = 1.275 -> 1.28, rounded before quantity.
            Assert.Equal(1.28m, Assert.Single(item.Toppings).PriceAdjustment);
            Assert.Equal(18.28m, item.UnitPrice);
            Assert.Equal(36.56m, item.LineTotal);
            Assert.Equal(36.56m, priced.SubTotal);
            Assert.Equal(3.02m, priced.Tax);
            Assert.Equal(39.58m, priced.Total);

            // Dough 100 x 1.7 x 2. Cheese: recipe 50 x 1.7 x 2 = 170 + topping 50 x 1.275 x 2 = 127.5.
            Assert.Equal(340m, Usage(priced, dough));
            Assert.Equal(297.5m, Usage(priced, cheese));
        }

        [Fact]
        public void UnsizedItem_UsesBasePriceAndRecipeName()
        {
            var syrup = Ingredient();
            var recipe = Recipe(2.50m, (syrup, 30));

            var priced = Price([new OrderItemRequest(recipe.RecipeId, null, 3)], [recipe]);

            var item = Assert.Single(priced.Items);
            Assert.Equal("Margherita", item.ItemNameSnapshot);
            Assert.Null(item.PizzaSizeId);
            Assert.Equal(2.50m, item.UnitPrice);
            Assert.Equal(7.50m, item.LineTotal);
            Assert.Equal(90m, Usage(priced, syrup));
        }

        [Theory]
        [InlineData(ToppingCoverage.Whole, ToppingAmount.Light, 0.5)]
        [InlineData(ToppingCoverage.Whole, ToppingAmount.Standard, 1.0)]
        [InlineData(ToppingCoverage.Whole, ToppingAmount.Extra, 1.5)]
        [InlineData(ToppingCoverage.LeftHalf, ToppingAmount.Standard, 0.5)]
        [InlineData(ToppingCoverage.RightHalf, ToppingAmount.Light, 0.25)]
        [InlineData(ToppingCoverage.RightHalf, ToppingAmount.Extra, 0.75)]
        public void ToppingFactors_MultiplyCoverageByAmount(ToppingCoverage coverage, ToppingAmount amount, double expectedFactor)
        {
            var factor = (decimal)expectedFactor;
            var basil = Ingredient(toppingPrice: 2.00m, toppingPortion: 8);
            var recipe = Recipe(5.00m);

            var priced = Price(
                [new OrderItemRequest(recipe.RecipeId, null, 1, [new OrderItemToppingRequest(basil.IngredientId, coverage, amount)])],
                [recipe], [basil]);

            var item = Assert.Single(priced.Items);
            Assert.Equal(2.00m * factor, Assert.Single(item.Toppings).PriceAdjustment);
            Assert.Equal(5.00m + 2.00m * factor, item.UnitPrice);
            Assert.Equal(8m * factor, Usage(priced, basil));
        }

        [Fact]
        public void SameIngredientAcrossItemsAndToppings_IsOneUsage()
        {
            var cheese = Ingredient(toppingPrice: 1.00m, toppingPortion: 20);
            var first = Recipe(8.00m, (cheese, 50));
            var second = Recipe(9.00m, (cheese, 40));

            var priced = Price(
                [
                    new OrderItemRequest(first.RecipeId, null, 1, [new OrderItemToppingRequest(cheese.IngredientId)]),
                    new OrderItemRequest(second.RecipeId, Medium.PizzaSizeId, 2),
                ],
                [first, second], [cheese]);

            // 50 + topping 20 + 40 x 1.25 x 2 = 170.
            Assert.Equal(170m, Usage(priced, cheese));
            Assert.Equal(2, priced.Items.Count);
        }

        [Fact]
        public void Money_RoundsHalfAwayFromZero()
        {
            // 9.99 x 1.25 = 12.4875 -> 12.49; 0.05 x 10% tax = 0.005 -> 0.01 (banker's rounding would give 0.00).
            var sized = Recipe(9.99m);
            var cheap = Recipe(0.05m);

            Assert.Equal(12.49m, Assert.Single(Price([new OrderItemRequest(sized.RecipeId, Medium.PizzaSizeId)], [sized]).Items).UnitPrice);

            var taxed = Price([new OrderItemRequest(cheap.RecipeId, null)], [cheap], taxRate: 0.10m);
            Assert.Equal(0.01m, taxed.Tax);
            Assert.Equal(0.06m, taxed.Total);
        }

        [Fact]
        public void Usages_RoundToFourDecimals_AndDropZeroAmounts()
        {
            var yeast = Ingredient();
            var salt = Ingredient();
            var trace = Ingredient();
            // Yeast 0.00005 rounds up to 0.0001; trace 0.00004 rounds to 0 and isn't recorded.
            var recipe = Recipe(1.00m, (yeast, 0.00005m), (salt, 1.23456m), (trace, 0.00004m));

            var priced = Price([new OrderItemRequest(recipe.RecipeId, null)], [recipe]);

            Assert.Equal(0.0001m, Usage(priced, yeast));
            Assert.Equal(1.2346m, Usage(priced, salt));
            Assert.DoesNotContain(priced.IngredientUsages, u => u.IngredientId == trace.IngredientId);
        }
    }
}
