using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PizzaShop.Api.Dtos;
using PizzaShop.Api.Models;
using PizzaShop.Api.Requests;

namespace PizzaShop.Api.Tests.Infrastructure
{
    // A signed-in test user: an HttpClient carrying their bearer token, plus what's needed to refresh.
    public record TestUser(HttpClient Client, string Email, string RefreshToken);

    public record LoginResponse(string AccessToken, string RefreshToken, int ExpiresIn);

    // Builds data through the public API, the same way the web app will.
    // Names and emails get a random suffix so tests sharing the database never collide.
    public class TestApi(ApiFactory factory)
    {
        // Seeded in PizzaShopContext.
        public static readonly Guid LargeSizeId = Guid.Parse("6818c0cd-1560-4a1a-8e57-3c870284a646");
        public static readonly Guid GramUnitId = Guid.Parse("d75312cf-bbc6-497a-8f54-a3a94178f73c");

        public const string Password = "Tests!Pass1";

        // Matches the API: camelCase, enums as strings.
        public static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web)
        {
            Converters = { new JsonStringEnumConverter() },
        };

        public HttpClient Anonymous() => factory.CreateClient();

        public async Task<TestUser> AdminAsync() =>
            await LoginAsync(ApiFactory.AdminEmail, ApiFactory.AdminPassword);

        public RecordingEmailDelivery Emails => factory.Emails;

        // A new customer, optionally promoted (by the admin) before logging in so the token carries the roles.
        public async Task<TestUser> NewUserAsync(params string[] roles)
        {
            var email = await RegisterAsync();
            await ConfirmEmailAsync(email);

            if (roles.Length > 0)
            {
                var admin = await AdminAsync();
                var userId = await FindUserIdAsync(admin, email);
                var response = await admin.Client.PutAsJsonAsync($"/api/users/{userId}/roles", new UpdateUserRolesRequest([.. roles]), Json);
                response.EnsureSuccessStatusCode();
            }

            return await LoginAsync(email, Password);
        }

        // A new, unconfirmed account (it can't sign in until ConfirmEmailAsync).
        public async Task<string> RegisterAsync()
        {
            var email = $"user-{Unique()}@tests.local";
            var register = await Anonymous().PostAsJsonAsync("/api/auth/register", new { email, password = Password }, Json);
            register.EnsureSuccessStatusCode();
            return email;
        }

        // Opens the latest confirmation email's link the way the web app's /confirm-email page
        // does: its userId and code go to the API's confirmEmail endpoint.
        public async Task ConfirmEmailAsync(string email)
        {
            var query = RecordingEmailDelivery.QueryOf(RecordingEmailDelivery.LinkIn(Emails.LatestTo(email)));
            var confirm = await Anonymous().GetAsync(
                $"/api/auth/confirmEmail?userId={Uri.EscapeDataString(query["userId"])}&code={Uri.EscapeDataString(query["code"])}");
            confirm.EnsureSuccessStatusCode();
        }

        public async Task<TestUser> LoginAsync(string email, string password)
        {
            var response = await Anonymous().PostAsJsonAsync("/api/auth/login", new { email, password }, Json);
            response.EnsureSuccessStatusCode();
            var tokens = await ReadAsync<LoginResponse>(response);
            return new TestUser(WithToken(tokens.AccessToken), email, tokens.RefreshToken);
        }

        public HttpClient WithToken(string accessToken)
        {
            var client = factory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            return client;
        }

        public static async Task<Guid> FindUserIdAsync(TestUser admin, string email)
        {
            var page = await admin.Client.GetFromJsonAsync<PagedResult<UserDto>>($"/api/users?email={Uri.EscapeDataString(email)}", Json);
            return page!.Items.Single(u => u.Email == email).UserId;
        }

        public static async Task<IngredientDto> CreateIngredientAsync(TestUser admin, decimal stock, decimal? toppingPrice = null, decimal? toppingPortion = null)
        {
            var request = new CreateIngredientRequest($"Ingredient {Unique()}", GramUnitId, stock, toppingPrice, toppingPortion);
            var response = await admin.Client.PostAsJsonAsync("/api/ingredients", request, Json);
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            return await ReadAsync<IngredientDto>(response);
        }

        public static async Task<RecipeDto> CreateRecipeAsync(TestUser admin, decimal basePrice, params (Guid IngredientId, decimal Amount)[] items)
        {
            var request = new CreateRecipeRequest($"Recipe {Unique()}", basePrice, [.. items.Select(i => new RecipeItemRequest(i.IngredientId, i.Amount))]);
            var response = await admin.Client.PostAsJsonAsync("/api/recipes", request, Json);
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            return await ReadAsync<RecipeDto>(response);
        }

        public static async Task<decimal> StockAsync(TestUser admin, Guid ingredientId) =>
            (await admin.Client.GetFromJsonAsync<IngredientDto>($"/api/ingredients/{ingredientId}", Json))!.CurrentStock;

        public static Task<HttpResponseMessage> PlaceOrderAsync(HttpClient client, CreateOrderRequest request, Guid? idempotencyKey = null)
        {
            var message = new HttpRequestMessage(HttpMethod.Post, "/api/orders")
            {
                Content = JsonContent.Create(request, options: Json),
            };
            message.Headers.Add("Idempotency-Key", (idempotencyKey ?? Guid.NewGuid()).ToString());
            return client.SendAsync(message);
        }

        // A one-item takeout order; asserts it was created.
        public static async Task<OrderDto> PlaceSimpleOrderAsync(HttpClient client, Guid recipeId, Guid? sizeId = null, int quantity = 1)
        {
            var response = await PlaceOrderAsync(client, new CreateOrderRequest(OrderType.Takeout, [new OrderItemRequest(recipeId, sizeId, quantity)]));
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            return await ReadAsync<OrderDto>(response);
        }

        public static async Task<T> ReadAsync<T>(HttpResponseMessage response) =>
            (await response.Content.ReadFromJsonAsync<T>(Json))
                ?? throw new InvalidOperationException($"Empty {typeof(T).Name} body.");

        // Every error is Problem Details; checks the media type and returns the body.
        public static async Task<HttpValidationProblemDetails> ReadProblemAsync(HttpResponseMessage response, HttpStatusCode expected)
        {
            Assert.Equal(expected, response.StatusCode);
            Assert.Equal("application/problem+json", response.Content.Headers.ContentType?.MediaType);
            var problem = await ReadAsync<HttpValidationProblemDetails>(response);
            Assert.Equal((int)expected, problem.Status);
            return problem;
        }

        public static string Unique() => Guid.NewGuid().ToString("N")[..8];
    }
}
