using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using PizzaShop.Api.Dtos;
using PizzaShop.Api.Requests;
using PizzaShop.Api.Tests.Infrastructure;

namespace PizzaShop.Api.Tests
{
    [Collection(ApiCollection.Name)]
    public class PublicMenuTests(ApiFactory factory)
    {
        private readonly TestApi api = new(factory);

        private async Task<(PublicMenuDto Menu, string Json)> GetMenuAsync()
        {
            var response = await api.Anonymous().GetAsync("/api/public/menu");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var json = await response.Content.ReadAsStringAsync();
            return (JsonSerializer.Deserialize<PublicMenuDto>(json, TestApi.Json)!, json);
        }

        [Fact]
        public async Task Anonymous_SeesActiveItemsOnly_WithoutAmountsOrStock()
        {
            var admin = await api.AdminAsync();
            var cheese = await TestApi.CreateIngredientAsync(admin, stock: 500);
            var olive = await TestApi.CreateIngredientAsync(admin, stock: 50, toppingPrice: 1.25m, toppingPortion: 10m);
            var retiredTopping = await TestApi.CreateIngredientAsync(admin, stock: 50, toppingPrice: 2m, toppingPortion: 10m);
            var active = await TestApi.CreateRecipeAsync(admin, 9.50m, (cheese.IngredientId, 123.4567m), (olive.IngredientId, 5m));
            var retired = await TestApi.CreateRecipeAsync(admin, 8m, (cheese.IngredientId, 10m));

            (await admin.Client.PutAsJsonAsync($"/api/recipes/{retired.RecipeId}",
                new UpdateRecipeRequest(retired.Name, retired.BasePrice, [new RecipeItemRequest(cheese.IngredientId, 10m)], IsActive: false),
                TestApi.Json)).EnsureSuccessStatusCode();
            (await admin.Client.PutAsJsonAsync($"/api/ingredients/{retiredTopping.IngredientId}",
                new UpdateIngredientRequest(retiredTopping.Name, retiredTopping.UnitOfMeasureId, 2m, 10m, IsActive: false),
                TestApi.Json)).EnsureSuccessStatusCode();
            var size = await TestApi.ReadAsync<PizzaSizeDto>(await admin.Client.PostAsJsonAsync("/api/pizza-sizes",
                new CreatePizzaSizeRequest($"Size {TestApi.Unique()}", 2.50m), TestApi.Json));
            (await admin.Client.PutAsJsonAsync($"/api/pizza-sizes/{size.PizzaSizeId}",
                new UpdatePizzaSizeRequest(size.Name, size.PriceMultiplier, IsActive: false), TestApi.Json)).EnsureSuccessStatusCode();

            var (menu, json) = await GetMenuAsync();

            var recipe = Assert.Single(menu.Recipes, r => r.RecipeId == active.RecipeId);
            Assert.Equal(9.50m, recipe.BasePrice);
            Assert.Equal(new[] { cheese.Name, olive.Name }.Order(), recipe.Ingredients);
            Assert.DoesNotContain(menu.Recipes, r => r.RecipeId == retired.RecipeId);
            Assert.Contains(menu.Toppings, t => t.Name == olive.Name && t.Price == 1.25m);
            Assert.DoesNotContain(menu.Toppings, t => t.Name == retiredTopping.Name);
            Assert.DoesNotContain(menu.Toppings, t => t.Name == cheese.Name);
            Assert.DoesNotContain(menu.Sizes, s => s.Name == size.Name);

            // Nothing about stock or recipe amounts, and no ingredient IDs.
            Assert.DoesNotContain("123.4567", json);
            Assert.DoesNotContain(cheese.IngredientId.ToString(), json);
            Assert.DoesNotContain("stock", json, StringComparison.OrdinalIgnoreCase);
            Assert.DoesNotContain("amount", json, StringComparison.OrdinalIgnoreCase);
        }

        [Fact]
        public async Task PopularRecipeIds_AreActiveMenuRecipes_RankedLikeTheCustomerHome()
        {
            var admin = await api.AdminAsync();
            var dough = await TestApi.CreateIngredientAsync(admin, stock: 100000);
            var recipe = await TestApi.CreateRecipeAsync(admin, 10m, (dough.IngredientId, 1));
            var customer = await api.NewUserAsync();
            // Ordered in bulk so it ranks among the top 4 of the shared test database (other tests order
            // their own recipes up to 100 at a time).
            for (var i = 0; i < 3; i++)
            {
                await TestApi.PlaceSimpleOrderAsync(customer.Client, recipe.RecipeId, quantity: 100);
            }

            var (menu, _) = await GetMenuAsync();
            var popular = await customer.Client.GetFromJsonAsync<List<RecipeDto>>("/api/recipes/popular", TestApi.Json);

            Assert.Contains(recipe.RecipeId, menu.PopularRecipeIds);
            Assert.Equal(popular!.Select(r => r.RecipeId), menu.PopularRecipeIds);
            Assert.All(menu.PopularRecipeIds, id => Assert.Contains(menu.Recipes, r => r.RecipeId == id));
        }
    }
}
