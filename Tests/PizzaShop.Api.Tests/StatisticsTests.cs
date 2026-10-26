using System.Net;
using System.Net.Http.Json;
using PizzaShop.Api.Dtos;
using PizzaShop.Api.Models;
using PizzaShop.Api.Requests;
using PizzaShop.Api.Tests.Infrastructure;

namespace PizzaShop.Api.Tests
{
    // The test database is shared by every test, so /sales and the cancellation summary are
    // checked as before/after differences; items, usage and recent cancellations use uniquely
    // named data and can be checked exactly.
    [Collection(ApiCollection.Name)]
    public class StatisticsTests(ApiFactory factory)
    {
        private readonly TestApi api = new(factory);

        private static readonly string[] Endpoints = ["sales", "items", "cancellations", "ingredient-usage"];

        // Yesterday to tomorrow in the configured zone, so a run near local midnight still covers
        // the orders it places.
        private static string Range()
        {
            var zone = TimeZoneInfo.FindSystemTimeZoneById("America/Mexico_City");
            var today = DateOnly.FromDateTime(TimeZoneInfo.ConvertTime(DateTimeOffset.UtcNow, zone).DateTime);
            return $"from={today.AddDays(-1):yyyy-MM-dd}&to={today.AddDays(1):yyyy-MM-dd}";
        }

        private static async Task<T> GetAsync<T>(TestUser admin, string endpoint, string query = "")
        {
            var response = await admin.Client.GetAsync($"/api/statistics/{endpoint}?{Range()}{query}");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            return await TestApi.ReadAsync<T>(response);
        }

        private static async Task<OrderDto> PlaceAsync(TestUser user, OrderItemRequest item)
        {
            var response = await TestApi.PlaceOrderAsync(user.Client, new CreateOrderRequest(OrderType.Takeout, [item]));
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            return await TestApi.ReadAsync<OrderDto>(response);
        }

        private static async Task CancelAsync(TestUser user, Guid orderId, string? reason = null) =>
            (await user.Client.PostAsJsonAsync($"/api/orders/{orderId}/cancel", new CancelOrderRequest(reason), TestApi.Json))
                .EnsureSuccessStatusCode();

        [Fact]
        public async Task StaffAndCustomers_Get403_OnEveryEndpoint()
        {
            var staff = await api.NewUserAsync("Staff");
            var customer = await api.NewUserAsync();

            foreach (var endpoint in Endpoints)
            {
                Assert.Equal(HttpStatusCode.Forbidden, (await staff.Client.GetAsync($"/api/statistics/{endpoint}")).StatusCode);
                Assert.Equal(HttpStatusCode.Forbidden, (await customer.Client.GetAsync($"/api/statistics/{endpoint}")).StatusCode);
            }
        }

        [Theory]
        [InlineData("from=2026-10-05&to=2026-10-04", "From")]
        [InlineData("from=2025-01-01&to=2026-01-02", "To")]
        public async Task InvalidRanges_Are400_OnEveryEndpoint(string query, string field)
        {
            var admin = await api.AdminAsync();

            foreach (var endpoint in Endpoints)
            {
                var problem = await TestApi.ReadProblemAsync(await admin.Client.GetAsync($"/api/statistics/{endpoint}?{query}"), HttpStatusCode.BadRequest);
                Assert.Contains(field, problem.Errors.Keys);
            }
        }

        [Theory]
        [InlineData("sales?from=2026-13-01")]
        [InlineData("items?limit=0")]
        [InlineData("cancellations?limit=101")]
        [InlineData("sales?days=0")]
        [InlineData("ingredient-usage?days=367")]
        public async Task MalformedParameters_Are400(string pathAndQuery)
        {
            var admin = await api.AdminAsync();

            await TestApi.ReadProblemAsync(await admin.Client.GetAsync($"/api/statistics/{pathAndQuery}"), HttpStatusCode.BadRequest);
        }

        [Fact]
        public async Task Defaults_AreTheLastSevenDays_InTheConfiguredZone()
        {
            var admin = await api.AdminAsync();

            var sales = await TestApi.ReadAsync<SalesStatisticsDto>(await admin.Client.GetAsync("/api/statistics/sales"));

            Assert.Equal("America/Mexico_City", sales.TimeZone);
            Assert.Equal(7, sales.Days.Count);
            Assert.Equal(sales.To, sales.Days[^1].Date);
        }

        [Fact]
        public async Task Days_SetsHowManyDaysBackFromToday()
        {
            var admin = await api.AdminAsync();

            var sales = await TestApi.ReadAsync<SalesStatisticsDto>(await admin.Client.GetAsync("/api/statistics/sales?days=30"));

            Assert.Equal(30, sales.Days.Count);
            Assert.Equal(sales.To.AddDays(-29), sales.From);
        }

        [Fact]
        public async Task Sales_CountPlacedOrders_AndReportCancelledOnesSeparately()
        {
            var admin = await api.AdminAsync();
            var dough = await TestApi.CreateIngredientAsync(admin, stock: 10000);
            var recipe = await TestApi.CreateRecipeAsync(admin, 10.00m, (dough.IngredientId, 100));
            var customer = await api.NewUserAsync();
            var before = await GetAsync<SalesStatisticsDto>(admin, "sales");

            var kept = await TestApi.PlaceSimpleOrderAsync(customer.Client, recipe.RecipeId, TestApi.LargeSizeId, quantity: 2);
            var cancelled = await TestApi.PlaceSimpleOrderAsync(customer.Client, recipe.RecipeId);
            await CancelAsync(customer, cancelled.OrderId);

            var after = await GetAsync<SalesStatisticsDto>(admin, "sales");
            Assert.Equal(before.Totals.OrderCount + 1, after.Totals.OrderCount);
            Assert.Equal(before.Totals.Total + kept.Total, after.Totals.Total);
            Assert.Equal(before.Totals.SubTotal + kept.SubTotal, after.Totals.SubTotal);
            Assert.Equal(before.Totals.Tax + kept.Tax, after.Totals.Tax);
            Assert.Equal(before.Cancelled.OrderCount + 1, after.Cancelled.OrderCount);
            Assert.Equal(before.Cancelled.Total + cancelled.Total, after.Cancelled.Total);
            // The daily series adds up to the same totals.
            Assert.Equal(after.Totals.Total, after.Days.Sum(d => d.Total));
            Assert.Equal(after.Cancelled.OrderCount, after.Days.Sum(d => d.CancelledCount));
        }

        [Fact]
        public async Task Items_RankRecipesAndToppings_FromNonCancelledOrdersOnly()
        {
            var admin = await api.AdminAsync();
            var dough = await TestApi.CreateIngredientAsync(admin, stock: 100000);
            var olives = await TestApi.CreateIngredientAsync(admin, stock: 100000, toppingPrice: 0.50m, toppingPortion: 10);
            var recipe = await TestApi.CreateRecipeAsync(admin, 9.00m, (dough.IngredientId, 100));
            var customer = await api.NewUserAsync();

            // Large quantities so this recipe and topping rank first among everything other tests ordered.
            var withOlives = await PlaceAsync(customer, new OrderItemRequest(recipe.RecipeId, TestApi.LargeSizeId, 90,
                [new OrderItemToppingRequest(olives.IngredientId, ToppingCoverage.Whole, ToppingAmount.Standard)]));
            var plain = await PlaceAsync(customer, new OrderItemRequest(recipe.RecipeId, null, 10));
            var cancelled = await PlaceAsync(customer, new OrderItemRequest(recipe.RecipeId, null, 50,
                [new OrderItemToppingRequest(olives.IngredientId, ToppingCoverage.Whole, ToppingAmount.Standard)]));
            await CancelAsync(customer, cancelled.OrderId);

            var items = await GetAsync<ItemStatisticsDto>(admin, "items", "&limit=50");

            var top = Assert.Single(items.Recipes, r => r.RecipeId == recipe.RecipeId);
            Assert.Equal(recipe.Name, top.Name);
            Assert.Equal(100, top.Quantity);
            Assert.Equal(withOlives.Items[0].LineTotal + plain.Items[0].LineTotal, top.Revenue);

            var topping = Assert.Single(items.Toppings, t => t.IngredientId == olives.IngredientId);
            Assert.Equal(olives.Name, topping.Name);
            Assert.Equal(90, topping.TimesPicked);
            Assert.Equal(withOlives.Items[0].Toppings[0].PriceAdjustment * 90, topping.Revenue);
        }

        [Fact]
        public async Task Items_RespectTheLimit()
        {
            var admin = await api.AdminAsync();

            var items = await GetAsync<ItemStatisticsDto>(admin, "items", "&limit=1");

            Assert.True(items.Recipes.Count <= 1);
            Assert.True(items.Toppings.Count <= 1);
        }

        [Fact]
        public async Task Cancellations_SplitByWhoCancelled_AndListTheRecentOnes()
        {
            var admin = await api.AdminAsync();
            var dough = await TestApi.CreateIngredientAsync(admin, stock: 10000);
            var recipe = await TestApi.CreateRecipeAsync(admin, 10.00m, (dough.IngredientId, 100));
            var customer = await api.NewUserAsync();
            var staff = await api.NewUserAsync("Staff");
            var before = await GetAsync<CancellationStatisticsDto>(admin, "cancellations");

            var byCustomer = await TestApi.PlaceSimpleOrderAsync(customer.Client, recipe.RecipeId);
            var byStaff = await TestApi.PlaceSimpleOrderAsync(customer.Client, recipe.RecipeId);
            var customerReason = $"Changed my mind {TestApi.Unique()}";
            var staffReason = $"Out of dough {TestApi.Unique()}";
            await CancelAsync(customer, byCustomer.OrderId, customerReason);
            await CancelAsync(staff, byStaff.OrderId, staffReason);

            var after = await GetAsync<CancellationStatisticsDto>(admin, "cancellations");
            Assert.Equal(before.Summary.OrderCount + 2, after.Summary.OrderCount);
            Assert.Equal(before.Summary.Total + byCustomer.Total + byStaff.Total, after.Summary.Total);
            Assert.Equal(before.ByRole.Customer + 1, after.ByRole.Customer);
            Assert.Equal(before.ByRole.Staff + 1, after.ByRole.Staff);

            // Newest first: the staff cancellation happened last.
            Assert.Equal(byStaff.OrderId, after.Recent[0].OrderId);
            Assert.Equal((staff.Email, staffReason), (after.Recent[0].CancelledByEmail, after.Recent[0].Reason));
            Assert.Equal((byCustomer.OrderId, customer.Email, customerReason),
                (after.Recent[1].OrderId, after.Recent[1].CancelledByEmail, after.Recent[1].Reason));
        }

        [Fact]
        public async Task IngredientUsage_SumsRecordedDeductions_ExcludingCancelledOrders()
        {
            var admin = await api.AdminAsync();
            var dough = await TestApi.CreateIngredientAsync(admin, stock: 10000);
            var recipe = await TestApi.CreateRecipeAsync(admin, 10.00m, (dough.IngredientId, 100));
            var customer = await api.NewUserAsync();

            // 2 Large = 2 x 100 x 1.70 = 340; the cancelled Small x3 (300) is returned to stock.
            await TestApi.PlaceSimpleOrderAsync(customer.Client, recipe.RecipeId, TestApi.LargeSizeId, quantity: 2);
            var cancelled = await TestApi.PlaceSimpleOrderAsync(customer.Client, recipe.RecipeId, quantity: 3);
            await CancelAsync(customer, cancelled.OrderId);

            var usage = await GetAsync<IngredientUsageStatisticsDto>(admin, "ingredient-usage");

            var row = Assert.Single(usage.Ingredients, i => i.IngredientId == dough.IngredientId);
            Assert.Equal(340m, row.Used);
            Assert.Equal(9660m, row.CurrentStock);
            Assert.Equal("Gram", row.UnitOfMeasureName);
        }
    }
}
