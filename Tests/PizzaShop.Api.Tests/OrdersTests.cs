using System.Net;
using System.Net.Http.Json;
using PizzaShop.Api.Dtos;
using PizzaShop.Api.Models;
using PizzaShop.Api.Requests;
using PizzaShop.Api.Tests.Infrastructure;

namespace PizzaShop.Api.Tests
{
    [Collection(ApiCollection.Name)]
    public class OrdersTests(ApiFactory factory)
    {
        private readonly TestApi api = new(factory);

        // Dough 100 g + cheese 50 g, base price 10.00; cheese is also a topping at 1.00 per 50 g.
        private async Task<(TestUser Admin, IngredientDto Dough, IngredientDto Cheese, RecipeDto Recipe)> MenuAsync()
        {
            var admin = await api.AdminAsync();
            var dough = await TestApi.CreateIngredientAsync(admin, stock: 1000);
            var cheese = await TestApi.CreateIngredientAsync(admin, stock: 1000, toppingPrice: 1.00m, toppingPortion: 50);
            var recipe = await TestApi.CreateRecipeAsync(admin, 10.00m, (dough.IngredientId, 100), (cheese.IngredientId, 50));
            return (admin, dough, cheese, recipe);
        }

        private static CreateOrderRequest LargeWithExtraCheeseOnLeftHalf(Guid recipeId, Guid cheeseId, int quantity = 2) =>
            new(OrderType.Takeout,
            [
                new OrderItemRequest(recipeId, TestApi.LargeSizeId, quantity,
                    [new OrderItemToppingRequest(cheeseId, ToppingCoverage.LeftHalf, ToppingAmount.Extra)]),
            ]);

        [Fact]
        public async Task Create_ComputesPricesServerSide_AndDeductsStock()
        {
            var (admin, dough, cheese, recipe) = await MenuAsync();
            var customer = await api.NewUserAsync();

            var response = await TestApi.PlaceOrderAsync(customer.Client, LargeWithExtraCheeseOnLeftHalf(recipe.RecipeId, cheese.IngredientId));

            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            var order = await TestApi.ReadAsync<OrderDto>(response);
            var item = Assert.Single(order.Items);
            // Base 10.00 x 1.70 (Large) = 17.00; topping 1.00 x 0.5 (half) x 1.5 (extra) x 1.70 = 1.275 -> 1.28.
            Assert.Equal(1.28m, Assert.Single(item.Toppings).PriceAdjustment);
            Assert.Equal(18.28m, item.UnitPrice);
            Assert.Equal(36.56m, item.LineTotal);
            Assert.Equal(36.56m, order.SubTotal);
            Assert.Equal(3.02m, order.Tax);
            Assert.Equal(39.58m, order.Total);
            Assert.Equal(OrderStatus.Pending, order.Status);
            Assert.Equal(customer.Email, order.PlacedByEmail);
            Assert.StartsWith("Large ", item.ItemNameSnapshot);

            // Dough: 100 x 1.7 x 2 = 340. Cheese: recipe 50 x 1.7 x 2 = 170, topping 50 x 1.275 x 2 = 127.5.
            Assert.Equal(660.00m, await TestApi.StockAsync(admin, dough.IngredientId));
            Assert.Equal(702.50m, await TestApi.StockAsync(admin, cheese.IngredientId));
        }

        [Fact]
        public async Task Create_MayPushStockNegative()
        {
            var admin = await api.AdminAsync();
            var flour = await TestApi.CreateIngredientAsync(admin, stock: 5);
            var recipe = await TestApi.CreateRecipeAsync(admin, 8m, (flour.IngredientId, 10));
            var customer = await api.NewUserAsync();

            await TestApi.PlaceSimpleOrderAsync(customer.Client, recipe.RecipeId);

            Assert.Equal(-5.00m, await TestApi.StockAsync(admin, flour.IngredientId));
        }

        [Fact]
        public async Task Retry_WithSameKey_ReturnsSameOrder_AndDeductsOnce()
        {
            var (admin, dough, cheese, recipe) = await MenuAsync();
            var customer = await api.NewUserAsync();
            var key = Guid.NewGuid();
            var request = LargeWithExtraCheeseOnLeftHalf(recipe.RecipeId, cheese.IngredientId);

            var first = await TestApi.ReadAsync<OrderDto>(await TestApi.PlaceOrderAsync(customer.Client, request, key));
            var retry = await TestApi.PlaceOrderAsync(customer.Client, request, key);

            Assert.Equal(HttpStatusCode.Created, retry.StatusCode);
            Assert.Equal(first.OrderId, (await TestApi.ReadAsync<OrderDto>(retry)).OrderId);
            Assert.Equal(660.00m, await TestApi.StockAsync(admin, dough.IngredientId));
        }

        [Fact]
        public async Task ConcurrentRetries_WithSameKey_CreateOneOrder()
        {
            var (admin, dough, cheese, recipe) = await MenuAsync();
            var customer = await api.NewUserAsync();
            var key = Guid.NewGuid();
            var request = LargeWithExtraCheeseOnLeftHalf(recipe.RecipeId, cheese.IngredientId);

            var responses = await Task.WhenAll(Enumerable.Range(0, 8).Select(_ => TestApi.PlaceOrderAsync(customer.Client, request, key)));

            Assert.All(responses, r => Assert.Equal(HttpStatusCode.Created, r.StatusCode));
            var ids = await Task.WhenAll(responses.Select(async r => (await TestApi.ReadAsync<OrderDto>(r)).OrderId));
            Assert.Single(ids.Distinct());
            Assert.Equal(660.00m, await TestApi.StockAsync(admin, dough.IngredientId));
        }

        [Fact]
        public async Task SameKey_WithDifferentBody_Is422()
        {
            var (_, _, cheese, recipe) = await MenuAsync();
            var customer = await api.NewUserAsync();
            var key = Guid.NewGuid();
            await TestApi.PlaceOrderAsync(customer.Client, LargeWithExtraCheeseOnLeftHalf(recipe.RecipeId, cheese.IngredientId), key);

            var response = await TestApi.PlaceOrderAsync(customer.Client, LargeWithExtraCheeseOnLeftHalf(recipe.RecipeId, cheese.IngredientId, quantity: 3), key);

            await TestApi.ReadProblemAsync(response, (HttpStatusCode)422);
        }

        [Fact]
        public async Task AnotherUsersKey_Is422_AndDoesNotRevealTheirOrder()
        {
            var (_, _, cheese, recipe) = await MenuAsync();
            var owner = await api.NewUserAsync();
            var other = await api.NewUserAsync();
            var key = Guid.NewGuid();
            var request = LargeWithExtraCheeseOnLeftHalf(recipe.RecipeId, cheese.IngredientId);
            await TestApi.PlaceOrderAsync(owner.Client, request, key);

            var response = await TestApi.PlaceOrderAsync(other.Client, request, key);

            await TestApi.ReadProblemAsync(response, (HttpStatusCode)422);
        }

        [Fact]
        public async Task MissingIdempotencyKey_Is400()
        {
            var (_, _, _, recipe) = await MenuAsync();
            var customer = await api.NewUserAsync();

            var response = await customer.Client.PostAsJsonAsync("/api/orders",
                new CreateOrderRequest(OrderType.DineIn, [new OrderItemRequest(recipe.RecipeId, null)]), TestApi.Json);

            var problem = await TestApi.ReadProblemAsync(response, HttpStatusCode.BadRequest);
            Assert.Contains("Idempotency-Key", problem.Errors.Keys);
        }

        [Fact]
        public async Task Validation_ReportsIndexedFieldErrors()
        {
            var (_, dough, _, recipe) = await MenuAsync();
            var customer = await api.NewUserAsync();
            var request = new CreateOrderRequest(OrderType.Takeout,
            [
                new OrderItemRequest(recipe.RecipeId, null, 1, [new OrderItemToppingRequest(dough.IngredientId)]),
                new OrderItemRequest(Guid.NewGuid(), null),
            ]);

            var response = await TestApi.PlaceOrderAsync(customer.Client, request);

            var problem = await TestApi.ReadProblemAsync(response, HttpStatusCode.BadRequest);
            Assert.Contains("Items[0].Toppings[0].IngredientId", problem.Errors.Keys);
            Assert.Contains("Items[1].RecipeId", problem.Errors.Keys);
        }

        [Fact]
        public async Task Customers_OnlySeeTheirOwnOrders_StaffSeeAll()
        {
            var (_, _, _, recipe) = await MenuAsync();
            var alice = await api.NewUserAsync();
            var bob = await api.NewUserAsync();
            var staff = await api.NewUserAsync("Staff");
            var aliceOrder = await TestApi.PlaceSimpleOrderAsync(alice.Client, recipe.RecipeId);
            var bobOrder = await TestApi.PlaceSimpleOrderAsync(bob.Client, recipe.RecipeId);

            var aliceList = await alice.Client.GetFromJsonAsync<PagedResult<OrderSummaryDto>>("/api/orders", TestApi.Json);
            Assert.All(aliceList!.Items, o => Assert.Equal(alice.Email, o.PlacedByEmail));
            Assert.Contains(aliceList.Items, o => o.OrderId == aliceOrder.OrderId);

            Assert.Equal(HttpStatusCode.NotFound, (await alice.Client.GetAsync($"/api/orders/{bobOrder.OrderId}")).StatusCode);
            Assert.Equal(HttpStatusCode.OK, (await staff.Client.GetAsync($"/api/orders/{bobOrder.OrderId}")).StatusCode);
        }

        [Fact]
        public async Task Status_MovesForwardOnly_AndCannotBeSetToCancelled()
        {
            var (_, _, _, recipe) = await MenuAsync();
            var customer = await api.NewUserAsync();
            var staff = await api.NewUserAsync("Staff");
            var order = await TestApi.PlaceSimpleOrderAsync(customer.Client, recipe.RecipeId);
            var url = $"/api/orders/{order.OrderId}/status";

            var skipAhead = await staff.Client.PatchAsJsonAsync(url, new UpdateOrderStatusRequest(OrderStatus.Ready), TestApi.Json);
            Assert.Equal(OrderStatus.Ready, (await TestApi.ReadAsync<OrderDto>(skipAhead)).Status);

            var backwards = await staff.Client.PatchAsJsonAsync(url, new UpdateOrderStatusRequest(OrderStatus.Preparing), TestApi.Json);
            await TestApi.ReadProblemAsync(backwards, HttpStatusCode.Conflict);

            var cancelled = await staff.Client.PatchAsJsonAsync(url, new UpdateOrderStatusRequest(OrderStatus.Cancelled), TestApi.Json);
            await TestApi.ReadProblemAsync(cancelled, HttpStatusCode.BadRequest);
        }

        [Fact]
        public async Task List_FiltersByStatus_AndValidatesPageSize()
        {
            var (_, _, _, recipe) = await MenuAsync();
            var staff = await api.NewUserAsync("Staff");
            var order = await TestApi.PlaceSimpleOrderAsync(staff.Client, recipe.RecipeId);
            await staff.Client.PatchAsJsonAsync($"/api/orders/{order.OrderId}/status", new UpdateOrderStatusRequest(OrderStatus.Completed), TestApi.Json);

            var completed = await staff.Client.GetFromJsonAsync<PagedResult<OrderSummaryDto>>("/api/orders?status=Completed&pageSize=100", TestApi.Json);
            Assert.All(completed!.Items, o => Assert.Equal(OrderStatus.Completed, o.Status));
            Assert.Contains(completed.Items, o => o.OrderId == order.OrderId);

            var tooBig = await staff.Client.GetAsync("/api/orders?pageSize=500");
            var problem = await TestApi.ReadProblemAsync(tooBig, HttpStatusCode.BadRequest);
            Assert.Contains("pageSize", problem.Errors.Keys);
        }

        [Fact]
        public async Task Active_ListsPendingPreparingAndReady_OldestFirst_WithItems()
        {
            var (_, _, cheese, recipe) = await MenuAsync();
            var customer = await api.NewUserAsync();
            var staff = await api.NewUserAsync("Staff");
            var setStatus = (Guid id, OrderStatus status) =>
                staff.Client.PatchAsJsonAsync($"/api/orders/{id}/status", new UpdateOrderStatusRequest(status), TestApi.Json);

            var pending = await TestApi.ReadAsync<OrderDto>(
                await TestApi.PlaceOrderAsync(customer.Client, LargeWithExtraCheeseOnLeftHalf(recipe.RecipeId, cheese.IngredientId)));
            var preparing = await TestApi.PlaceSimpleOrderAsync(customer.Client, recipe.RecipeId);
            var ready = await TestApi.PlaceSimpleOrderAsync(customer.Client, recipe.RecipeId);
            var completed = await TestApi.PlaceSimpleOrderAsync(customer.Client, recipe.RecipeId);
            var cancelled = await TestApi.PlaceSimpleOrderAsync(customer.Client, recipe.RecipeId);
            (await setStatus(preparing.OrderId, OrderStatus.Preparing)).EnsureSuccessStatusCode();
            (await setStatus(ready.OrderId, OrderStatus.Ready)).EnsureSuccessStatusCode();
            (await setStatus(completed.OrderId, OrderStatus.Completed)).EnsureSuccessStatusCode();
            (await staff.Client.PostAsJsonAsync($"/api/orders/{cancelled.OrderId}/cancel", new CancelOrderRequest(null), TestApi.Json)).EnsureSuccessStatusCode();

            var active = (await staff.Client.GetFromJsonAsync<List<OrderDto>>("/api/orders/active", TestApi.Json))!;

            // Other tests leave active orders behind, so only this test's orders are checked.
            Assert.All(active, o => Assert.Contains(o.Status, new[] { OrderStatus.Pending, OrderStatus.Preparing, OrderStatus.Ready }));
            var mine = active.Where(o => o.PlacedByEmail == customer.Email).Select(o => o.OrderId).ToList();
            Assert.Equal([pending.OrderId, preparing.OrderId, ready.OrderId], mine);
            Assert.Equal(cheese.IngredientId, Assert.Single(Assert.Single(active.Single(o => o.OrderId == pending.OrderId).Items).Toppings).IngredientId);
            Assert.Equal(active.Select(o => o.CreatedAt).Order(), active.Select(o => o.CreatedAt));
        }

        [Fact]
        public async Task Active_IsForStaffOnly()
        {
            var customer = await api.NewUserAsync();

            Assert.Equal(HttpStatusCode.Forbidden, (await customer.Client.GetAsync("/api/orders/active")).StatusCode);
            Assert.Equal(HttpStatusCode.Unauthorized, (await api.Anonymous().GetAsync("/api/orders/active")).StatusCode);
        }

        [Fact]
        public async Task Quote_PricesLikeCreate_WithoutSavingOrDeductingStock()
        {
            var (admin, dough, cheese, recipe) = await MenuAsync();
            var customer = await api.NewUserAsync();
            var items = LargeWithExtraCheeseOnLeftHalf(recipe.RecipeId, cheese.IngredientId).Items;

            var response = await customer.Client.PostAsJsonAsync("/api/orders/quote", new QuoteOrderRequest(items), TestApi.Json);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var quote = await TestApi.ReadAsync<OrderQuoteDto>(response);
            var item = Assert.Single(quote.Items);
            var topping = Assert.Single(item.Toppings);
            // Same numbers as Create_ComputesPricesServerSide_AndDeductsStock.
            Assert.Equal(1.28m, topping.PriceAdjustment);
            Assert.Equal(cheese.Name, topping.IngredientName);
            Assert.Equal(18.28m, item.UnitPrice);
            Assert.Equal(36.56m, item.LineTotal);
            Assert.Equal(3.02m, quote.Tax);
            Assert.Equal(39.58m, quote.Total);
            Assert.StartsWith("Large ", item.ItemNameSnapshot);

            Assert.Equal(1000.00m, await TestApi.StockAsync(admin, dough.IngredientId));
            Assert.Equal(1000.00m, await TestApi.StockAsync(admin, cheese.IngredientId));
            var orders = await TestApi.ReadAsync<PagedResult<OrderSummaryDto>>(await customer.Client.GetAsync("/api/orders"));
            Assert.Equal(0, orders.TotalCount);
        }

        [Fact]
        public async Task Quote_ValidatesItemsLikeCreate()
        {
            var (admin, _, cheese, recipe) = await MenuAsync();
            var customer = await api.NewUserAsync();
            var retire = await admin.Client.PutAsJsonAsync($"/api/recipes/{recipe.RecipeId}",
                new UpdateRecipeRequest(recipe.Name, recipe.BasePrice, [.. recipe.Items.Select(i => new RecipeItemRequest(i.IngredientId, i.Amount))], IsActive: false),
                TestApi.Json);
            Assert.Equal(HttpStatusCode.OK, retire.StatusCode);

            var inactive = await customer.Client.PostAsJsonAsync("/api/orders/quote",
                new QuoteOrderRequest(LargeWithExtraCheeseOnLeftHalf(recipe.RecipeId, cheese.IngredientId).Items), TestApi.Json);
            var problem = await TestApi.ReadProblemAsync(inactive, HttpStatusCode.BadRequest);
            Assert.Contains("Items[0].RecipeId", problem.Errors.Keys);

            var empty = await customer.Client.PostAsJsonAsync("/api/orders/quote", new QuoteOrderRequest([]), TestApi.Json);
            await TestApi.ReadProblemAsync(empty, HttpStatusCode.BadRequest);
        }
    }
}
