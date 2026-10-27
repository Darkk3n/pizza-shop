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

        [Fact]
        public async Task DuplicateName_IsCaseInsensitive409_ButRenamingToItselfIsAllowed()
        {
            var admin = await api.AdminAsync();
            var dough = await TestApi.CreateIngredientAsync(admin, stock: 100);
            var first = await TestApi.CreateRecipeAsync(admin, 8m, (dough.IngredientId, 10));
            var second = await TestApi.CreateRecipeAsync(admin, 8m, (dough.IngredientId, 10));
            var items = new[] { new RecipeItemRequest(dough.IngredientId, 10) };

            var create = await admin.Client.PostAsJsonAsync("/api/recipes",
                new CreateRecipeRequest(first.Name.ToUpperInvariant(), 9m, [.. items]), TestApi.Json);
            await TestApi.ReadProblemAsync(create, HttpStatusCode.Conflict);

            var renameToOther = await admin.Client.PutAsJsonAsync($"/api/recipes/{second.RecipeId}",
                new UpdateRecipeRequest(first.Name.ToLowerInvariant(), 8m, [.. items], true), TestApi.Json);
            await TestApi.ReadProblemAsync(renameToOther, HttpStatusCode.Conflict);

            var renameToSelf = await admin.Client.PutAsJsonAsync($"/api/recipes/{first.RecipeId}",
                new UpdateRecipeRequest(first.Name.ToUpperInvariant(), 8m, [.. items], true), TestApi.Json);
            Assert.Equal(HttpStatusCode.OK, renameToSelf.StatusCode);

            var unitName = $"Unit {TestApi.Unique()}";
            var unit = await admin.Client.PostAsJsonAsync("/api/units-of-measure", new CreateUnitOfMeasureRequest(unitName), TestApi.Json);
            Assert.Equal(HttpStatusCode.Created, unit.StatusCode);
            var duplicateUnit = await admin.Client.PostAsJsonAsync("/api/units-of-measure", new CreateUnitOfMeasureRequest(unitName.ToUpperInvariant()), TestApi.Json);
            await TestApi.ReadProblemAsync(duplicateUnit, HttpStatusCode.Conflict);
        }

        [Fact]
        public async Task PopularRecipes_RankRecentNonCancelledOrders_OfActiveRecipesOnly()
        {
            var admin = await api.AdminAsync();
            var dough = await TestApi.CreateIngredientAsync(admin, stock: 100000);
            var recipe = async () => await TestApi.CreateRecipeAsync(admin, 10.00m, (dough.IngredientId, 1));
            var (first, second, retired, cancelled, old) = (await recipe(), await recipe(), await recipe(), await recipe(), await recipe());
            var customer = await api.NewUserAsync();
            var order = (RecipeDto r, int quantity) => TestApi.PlaceSimpleOrderAsync(customer.Client, r.RecipeId, quantity: quantity);

            // Far more than other tests order of their own recipes, so these two lead the shared database.
            await order(first, 99);
            await order(second, 98);
            await order(retired, 100);
            Assert.Equal(HttpStatusCode.OK, (await SetRecipeActiveAsync(admin, retired, isActive: false)).StatusCode);
            var cancelledOrder = await order(cancelled, 100);
            (await customer.Client.PostAsJsonAsync($"/api/orders/{cancelledOrder.OrderId}/cancel", new CancelOrderRequest(null), TestApi.Json)).EnsureSuccessStatusCode();
            var oldOrder = await order(old, 100);
            await api.BackdateOrderAsync(oldOrder.OrderId, TimeSpan.FromDays(40));

            // Other tests' recipes share the database (some ordered in bulk), so only this test's
            // recipes are compared with each other.
            var popular = (await customer.Client.GetFromJsonAsync<List<RecipeDto>>("/api/recipes/popular?limit=20", TestApi.Json))!
                .Select(r => r.RecipeId)
                .ToList();
            Assert.Contains(first.RecipeId, popular);
            Assert.Contains(second.RecipeId, popular);
            Assert.True(popular.IndexOf(first.RecipeId) < popular.IndexOf(second.RecipeId));
            Assert.DoesNotContain(retired.RecipeId, popular);
            Assert.DoesNotContain(cancelled.RecipeId, popular);
            Assert.DoesNotContain(old.RecipeId, popular);

            var top = await customer.Client.GetFromJsonAsync<List<RecipeDto>>("/api/recipes/popular?limit=1", TestApi.Json);
            Assert.Single(top!);

            var tooMany = await customer.Client.GetAsync("/api/recipes/popular?limit=21");
            Assert.Contains("limit", (await TestApi.ReadProblemAsync(tooMany, HttpStatusCode.BadRequest)).Errors.Keys);
        }
    }
}
