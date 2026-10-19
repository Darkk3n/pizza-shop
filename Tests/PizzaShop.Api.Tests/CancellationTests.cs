using System.Net;
using System.Net.Http.Json;
using PizzaShop.Api.Dtos;
using PizzaShop.Api.Models;
using PizzaShop.Api.Requests;
using PizzaShop.Api.Tests.Infrastructure;

namespace PizzaShop.Api.Tests
{
    [Collection(ApiCollection.Name)]
    public class CancellationTests(ApiFactory factory)
    {
        private readonly TestApi api = new(factory);

        private async Task<(TestUser Admin, IngredientDto Dough, IngredientDto Cheese, RecipeDto Recipe)> MenuAsync()
        {
            var admin = await api.AdminAsync();
            var dough = await TestApi.CreateIngredientAsync(admin, stock: 1000);
            var cheese = await TestApi.CreateIngredientAsync(admin, stock: 1000, toppingPrice: 1.00m, toppingPortion: 50);
            var recipe = await TestApi.CreateRecipeAsync(admin, 10.00m, (dough.IngredientId, 100), (cheese.IngredientId, 50));
            return (admin, dough, cheese, recipe);
        }

        // Large x2 with extra cheese on the left half: deducts 340 g dough and 297.5 g cheese.
        private static async Task<OrderDto> PlaceAsync(TestUser user, RecipeDto recipe, IngredientDto cheese)
        {
            var response = await TestApi.PlaceOrderAsync(user.Client, new CreateOrderRequest(OrderType.Takeout,
            [
                new OrderItemRequest(recipe.RecipeId, TestApi.LargeSizeId, 2,
                    [new OrderItemToppingRequest(cheese.IngredientId, ToppingCoverage.LeftHalf, ToppingAmount.Extra)]),
            ]));
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            return await TestApi.ReadAsync<OrderDto>(response);
        }

        private static Task<HttpResponseMessage> CancelAsync(TestUser user, Guid orderId, string? reason = null) =>
            user.Client.PostAsJsonAsync($"/api/orders/{orderId}/cancel", new CancelOrderRequest(reason), TestApi.Json);

        private static async Task AssertStockAsync(TestUser admin, IngredientDto ingredient, decimal expected) =>
            Assert.Equal(expected, await TestApi.StockAsync(admin, ingredient.IngredientId));

        [Fact]
        public async Task Customer_CancelsOwnPendingOrder_AndStockIsReturnedExactly()
        {
            var (admin, dough, cheese, recipe) = await MenuAsync();
            var customer = await api.NewUserAsync();
            var order = await PlaceAsync(customer, recipe, cheese);
            await AssertStockAsync(admin, cheese, 702.50m);

            var response = await CancelAsync(customer, order.OrderId, "Changed my mind");

            var cancelled = await TestApi.ReadAsync<OrderDto>(response);
            Assert.Equal(OrderStatus.Cancelled, cancelled.Status);
            Assert.Equal(customer.Email, cancelled.CancelledByEmail);
            Assert.Equal("Changed my mind", cancelled.CancellationReason);
            Assert.NotNull(cancelled.CancelledAt);
            Assert.Equal(order.Total, cancelled.Total);
            await AssertStockAsync(admin, dough, 1000.00m);
            await AssertStockAsync(admin, cheese, 1000.00m);
        }

        [Fact]
        public async Task CancellingTwice_Returns200_WithoutRestockingAgain()
        {
            var (admin, dough, cheese, recipe) = await MenuAsync();
            var customer = await api.NewUserAsync();
            var order = await PlaceAsync(customer, recipe, cheese);
            (await CancelAsync(customer, order.OrderId)).EnsureSuccessStatusCode();

            var again = await customer.Client.PostAsync($"/api/orders/{order.OrderId}/cancel", null);

            Assert.Equal(HttpStatusCode.OK, again.StatusCode);
            await AssertStockAsync(admin, dough, 1000.00m);
        }

        [Fact]
        public async Task ConcurrentCancels_ReturnStockOnce()
        {
            var (admin, dough, cheese, recipe) = await MenuAsync();
            var staff = await api.NewUserAsync("Staff");
            var order = await PlaceAsync(staff, recipe, cheese);

            var responses = await Task.WhenAll(Enumerable.Range(0, 8).Select(_ => CancelAsync(staff, order.OrderId)));

            Assert.All(responses, r => Assert.Equal(HttpStatusCode.OK, r.StatusCode));
            await AssertStockAsync(admin, dough, 1000.00m);
            await AssertStockAsync(admin, cheese, 1000.00m);
        }

        [Fact]
        public async Task Restock_UsesAmountsRecordedAtOrderTime_NotTheCurrentRecipe()
        {
            var (admin, dough, cheese, recipe) = await MenuAsync();
            var staff = await api.NewUserAsync("Staff");
            var order = await PlaceAsync(staff, recipe, cheese);

            // Triple the dough after the order was placed.
            var edit = await admin.Client.PutAsJsonAsync($"/api/recipes/{recipe.RecipeId}",
                new UpdateRecipeRequest(recipe.Name, recipe.BasePrice, [new(dough.IngredientId, 300), new(cheese.IngredientId, 50)]), TestApi.Json);
            edit.EnsureSuccessStatusCode();
            (await CancelAsync(staff, order.OrderId)).EnsureSuccessStatusCode();

            await AssertStockAsync(admin, dough, 1000.00m);
        }

        [Fact]
        public async Task Customer_CannotCancelOnceTheKitchenStarted_StaffCan()
        {
            var (admin, dough, cheese, recipe) = await MenuAsync();
            var customer = await api.NewUserAsync();
            var staff = await api.NewUserAsync("Staff");
            var order = await PlaceAsync(customer, recipe, cheese);
            await staff.Client.PatchAsJsonAsync($"/api/orders/{order.OrderId}/status", new UpdateOrderStatusRequest(OrderStatus.Preparing), TestApi.Json);

            await TestApi.ReadProblemAsync(await CancelAsync(customer, order.OrderId), HttpStatusCode.Conflict);

            var byStaff = await TestApi.ReadAsync<OrderDto>(await CancelAsync(staff, order.OrderId, "Out of dough"));
            Assert.Equal(OrderStatus.Cancelled, byStaff.Status);
            Assert.Equal(staff.Email, byStaff.CancelledByEmail);
            await AssertStockAsync(admin, dough, 1000.00m);
        }

        [Fact]
        public async Task CompletedOrders_CannotBeCancelled_AndKeepTheirDeduction()
        {
            var (admin, dough, cheese, recipe) = await MenuAsync();
            var staff = await api.NewUserAsync("Staff");
            var order = await PlaceAsync(staff, recipe, cheese);
            await staff.Client.PatchAsJsonAsync($"/api/orders/{order.OrderId}/status", new UpdateOrderStatusRequest(OrderStatus.Completed), TestApi.Json);

            await TestApi.ReadProblemAsync(await CancelAsync(staff, order.OrderId), HttpStatusCode.Conflict);

            await AssertStockAsync(admin, dough, 660.00m);
        }

        [Fact]
        public async Task CancelledOrders_CannotChangeStatus()
        {
            var (_, _, cheese, recipe) = await MenuAsync();
            var staff = await api.NewUserAsync("Staff");
            var order = await PlaceAsync(staff, recipe, cheese);
            (await CancelAsync(staff, order.OrderId)).EnsureSuccessStatusCode();

            var response = await staff.Client.PatchAsJsonAsync($"/api/orders/{order.OrderId}/status", new UpdateOrderStatusRequest(OrderStatus.Ready), TestApi.Json);

            await TestApi.ReadProblemAsync(response, HttpStatusCode.Conflict);
        }

        [Fact]
        public async Task OtherCustomersOrder_Is404()
        {
            var (_, _, cheese, recipe) = await MenuAsync();
            var owner = await api.NewUserAsync();
            var other = await api.NewUserAsync();
            var order = await PlaceAsync(owner, recipe, cheese);

            await TestApi.ReadProblemAsync(await CancelAsync(other, order.OrderId), HttpStatusCode.NotFound);
        }
    }
}
