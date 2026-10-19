using System.Net;
using System.Net.Http.Json;
using PizzaShop.Api.Tests.Infrastructure;

namespace PizzaShop.Api.Tests
{
    // A separate host with low limits (its counters are independent of the shared ApiFactory).
    // The in-memory test server has no client IP, so every anonymous request shares one per-IP
    // bucket; per-IP separation and X-Forwarded-For trust are verified against a deployed API
    // (see the Azure checklist).
    public class RateLimitingTests(RateLimitedApiFactory factory) : IClassFixture<RateLimitedApiFactory>
    {
        private readonly TestApi api = new(factory);

        [Fact]
        public async Task AuthEndpoints_Return429WithRetryAfter_OnceTheBucketIsEmpty()
        {
            var client = api.Anonymous();
            var badLogin = new { email = "nobody@tests.local", password = "wrong" };

            // Burst of AuthPerMinute (Identity answers 401), then rejected.
            for (var i = 0; i < RateLimitedApiFactory.AuthPerMinute; i++)
            {
                Assert.Equal(HttpStatusCode.Unauthorized, (await client.PostAsJsonAsync("/api/auth/login", badLogin)).StatusCode);
            }
            var limited = await client.PostAsJsonAsync("/api/auth/login", badLogin);

            var problem = await TestApi.ReadProblemAsync(limited, HttpStatusCode.TooManyRequests);
            Assert.NotNull(limited.Headers.RetryAfter?.Delta);
            Assert.Contains("Try again in", problem.Detail);
        }

        [Fact]
        public async Task OrderCreation_IsLimitedPerUser_ReadsAreNot()
        {
            // Set up through a default-limit host so the logins don't drain this host's auth bucket.
            // Its tokens work here too: both hosts share the database and its Data Protection keys.
            await using var setupFactory = new ApiFactory();
            await setupFactory.InitializeAsync();
            var setup = new TestApi(setupFactory);
            var admin = await setup.AdminAsync();
            var dough = await TestApi.CreateIngredientAsync(admin, stock: 1000);
            var recipe = await TestApi.CreateRecipeAsync(admin, 8m, (dough.IngredientId, 10));
            var customer = await setup.NewUserAsync();
            var client = api.WithToken(customer.Client.DefaultRequestHeaders.Authorization!.Parameter!);

            for (var i = 0; i < RateLimitedApiFactory.OrderCreatePerMinute; i++)
            {
                await TestApi.PlaceSimpleOrderAsync(client, recipe.RecipeId);
            }
            var limited = await TestApi.PlaceOrderAsync(client, new(Models.OrderType.Takeout, [new(recipe.RecipeId, null)]));

            await TestApi.ReadProblemAsync(limited, HttpStatusCode.TooManyRequests);
            Assert.Equal(HttpStatusCode.OK, (await client.GetAsync("/api/orders")).StatusCode);
        }
    }
}
