using System.Net;
using System.Net.Http.Json;
using PizzaShop.Api.Dtos;
using PizzaShop.Api.Models;
using PizzaShop.Api.Requests;
using PizzaShop.Api.Tests.Infrastructure;

namespace PizzaShop.Api.Tests
{
    [Collection(ApiCollection.Name)]
    public class CatalogTests(ApiFactory factory)
    {
        private readonly TestApi api = new(factory);

        private static Task<HttpResponseMessage> SetRecipeActiveAsync(TestUser admin, RecipeDto recipe, bool isActive) =>
            admin.Client.PutAsJsonAsync($"/api/recipes/{recipe.RecipeId}",
                new UpdateRecipeRequest(recipe.Name, recipe.BasePrice, [.. recipe.Items.Select(i => new RecipeItemRequest(i.IngredientId, i.Amount))], isActive),
                TestApi.Json);

        private static Task<HttpResponseMessage> SetIngredientActiveAsync(TestUser admin, IngredientDto ingredient, bool isActive) =>
            admin.Client.PutAsJsonAsync($"/api/ingredients/{ingredient.IngredientId}",
                new UpdateIngredientRequest(ingredient.Name, ingredient.UnitOfMeasureId, ingredient.ToppingPrice, ingredient.ToppingPortion, isActive),
                TestApi.Json);

        [Fact]
        public async Task InactiveRecipe_IsHiddenFromCustomers_VisibleToStaff_AndCannotBeOrdered()
        {
            var admin = await api.AdminAsync();
            var dough = await TestApi.CreateIngredientAsync(admin, stock: 100);
            var recipe = await TestApi.CreateRecipeAsync(admin, 8m, (dough.IngredientId, 10));
            (await SetRecipeActiveAsync(admin, recipe, isActive: false)).EnsureSuccessStatusCode();
            var customer = await api.NewUserAsync();
            var staff = await api.NewUserAsync("Staff");

            var customerMenu = await customer.Client.GetFromJsonAsync<List<RecipeDto>>("/api/recipes", TestApi.Json);
            Assert.DoesNotContain(customerMenu!, r => r.RecipeId == recipe.RecipeId);
            Assert.Equal(HttpStatusCode.NotFound, (await customer.Client.GetAsync($"/api/recipes/{recipe.RecipeId}")).StatusCode);

            var staffMenu = await staff.Client.GetFromJsonAsync<List<RecipeDto>>("/api/recipes", TestApi.Json);
            Assert.Contains(staffMenu!, r => r.RecipeId == recipe.RecipeId && !r.IsActive);

            var order = await TestApi.PlaceOrderAsync(customer.Client, new CreateOrderRequest(OrderType.Takeout, [new OrderItemRequest(recipe.RecipeId, null)]));
            var problem = await TestApi.ReadProblemAsync(order, HttpStatusCode.BadRequest);
            Assert.Contains("Items[0].RecipeId", problem.Errors.Keys);
        }

        [Fact]
        public async Task InactiveIngredient_LeavesToppings_CannotBeOrdered_OrAddedToNewRecipes()
        {
            var admin = await api.AdminAsync();
            var dough = await TestApi.CreateIngredientAsync(admin, stock: 100);
            var basil = await TestApi.CreateIngredientAsync(admin, stock: 100, toppingPrice: 0.50m, toppingPortion: 5);
            var pizza = await TestApi.CreateRecipeAsync(admin, 8m, (dough.IngredientId, 10));
            var basilPizza = await TestApi.CreateRecipeAsync(admin, 9m, (dough.IngredientId, 10), (basil.IngredientId, 5));
            (await SetIngredientActiveAsync(admin, basil, isActive: false)).EnsureSuccessStatusCode();
            var customer = await api.NewUserAsync();

            var toppings = await customer.Client.GetFromJsonAsync<List<ToppingDto>>("/api/toppings", TestApi.Json);
            Assert.DoesNotContain(toppings!, t => t.IngredientId == basil.IngredientId);

            var order = await TestApi.PlaceOrderAsync(customer.Client, new CreateOrderRequest(OrderType.Takeout,
                [new OrderItemRequest(pizza.RecipeId, null, 1, [new OrderItemToppingRequest(basil.IngredientId)])]));
            await TestApi.ReadProblemAsync(order, HttpStatusCode.BadRequest);

            var newRecipe = await admin.Client.PostAsJsonAsync("/api/recipes",
                new CreateRecipeRequest($"Recipe {TestApi.Unique()}", 9m, [new RecipeItemRequest(basil.IngredientId, 5)]), TestApi.Json);
            await TestApi.ReadProblemAsync(newRecipe, HttpStatusCode.BadRequest);

            // A recipe that already contains it stays editable.
            Assert.Equal(HttpStatusCode.OK, (await SetRecipeActiveAsync(admin, basilPizza, isActive: true)).StatusCode);
        }

        [Fact]
        public async Task DeletingARecipeUsedInOrders_Is409_SuggestingDeactivation()
        {
            var admin = await api.AdminAsync();
            var dough = await TestApi.CreateIngredientAsync(admin, stock: 100);
            var recipe = await TestApi.CreateRecipeAsync(admin, 8m, (dough.IngredientId, 10));
            await TestApi.PlaceSimpleOrderAsync(admin.Client, recipe.RecipeId);

            var response = await admin.Client.DeleteAsync($"/api/recipes/{recipe.RecipeId}");

            var problem = await TestApi.ReadProblemAsync(response, HttpStatusCode.Conflict);
            Assert.Contains("isActive", problem.Detail);
        }

        [Fact]
        public async Task ToppingPriceWithoutPortion_Is400()
        {
            var admin = await api.AdminAsync();

            var response = await admin.Client.PostAsJsonAsync("/api/ingredients",
                new CreateIngredientRequest($"Ingredient {TestApi.Unique()}", TestApi.GramUnitId, 10, ToppingPrice: 1m), TestApi.Json);

            var problem = await TestApi.ReadProblemAsync(response, HttpStatusCode.BadRequest);
            Assert.Contains("ToppingPortion", problem.Errors.Keys);
        }

        [Fact]
        public async Task ManualStockAdjustment_CannotGoNegative()
        {
            var admin = await api.AdminAsync();
            var staff = await api.NewUserAsync("Staff");
            var flour = await TestApi.CreateIngredientAsync(admin, stock: 5);
            var url = $"/api/ingredients/{flour.IngredientId}/stock-adjustments";

            var restock = await staff.Client.PostAsJsonAsync(url, new AdjustIngredientStockRequest(10), TestApi.Json);
            Assert.Equal(15.00m, (await TestApi.ReadAsync<IngredientDto>(restock)).CurrentStock);

            var tooMuch = await staff.Client.PostAsJsonAsync(url, new AdjustIngredientStockRequest(-20), TestApi.Json);
            await TestApi.ReadProblemAsync(tooMuch, HttpStatusCode.Conflict);
            Assert.Equal(15.00m, await TestApi.StockAsync(admin, flour.IngredientId));
        }
    }
}
