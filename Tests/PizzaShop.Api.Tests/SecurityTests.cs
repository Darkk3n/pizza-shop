using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using PizzaShop.Api.Dtos;
using PizzaShop.Api.Tests.Infrastructure;

namespace PizzaShop.Api.Tests
{
    [Collection(ApiCollection.Name)]
    public class SecurityTests(ApiFactory factory)
    {
        private readonly TestApi api = new(factory);

        // The only endpoints allowed without a token. Anything else must carry authorization
        // metadata, so a new endpoint group that forgets .RequireAuthorization() fails here.
        private static readonly HashSet<string> AnonymousRoutes =
        [
            "/health",
            "/api/auth/register",
            "/api/auth/login",
            "/api/auth/refresh",
            "/api/auth/confirmEmail",
            "/api/auth/resendConfirmationEmail",
            "/api/auth/forgotPassword",
            "/api/auth/resetPassword",
        ];

        [Fact]
        public void EveryEndpoint_RequiresAuthorization_UnlessAllowlisted()
        {
            var endpoints = factory.Services.GetRequiredService<EndpointDataSource>().Endpoints
                .OfType<RouteEndpoint>()
                .ToList();
            Assert.NotEmpty(endpoints);

            var unprotected = endpoints
                .Where(e => e.Metadata.GetMetadata<IAuthorizeData>() is null || e.Metadata.GetMetadata<IAllowAnonymous>() is not null)
                .Select(e => "/" + e.RoutePattern.RawText?.TrimStart('/'))
                .Where(route => !AnonymousRoutes.Contains(route))
                .Distinct()
                .ToList();

            Assert.Empty(unprotected);
        }

        [Theory]
        [InlineData("/api/recipes")]
        [InlineData("/api/orders")]
        [InlineData("/api/toppings")]
        [InlineData("/api/auth/me")]
        public async Task Anonymous_Gets401ProblemDetails(string url)
        {
            var response = await api.Anonymous().GetAsync(url);

            await TestApi.ReadProblemAsync(response, HttpStatusCode.Unauthorized);
        }

        [Theory]
        [InlineData("GET", "/api/ingredients")]
        [InlineData("GET", "/api/users")]
        [InlineData("POST", "/api/pizza-sizes")]
        [InlineData("POST", "/api/recipes")]
        [InlineData("DELETE", "/api/units-of-measure/00000000-0000-0000-0000-000000000001")]
        [InlineData("PATCH", "/api/orders/00000000-0000-0000-0000-000000000001/status")]
        [InlineData("POST", "/api/ingredients/00000000-0000-0000-0000-000000000001/stock-adjustments")]
        public async Task Customer_IsForbiddenFromStaffAndAdminEndpoints(string method, string url)
        {
            var customer = await api.NewUserAsync();

            var response = await customer.Client.SendAsync(new HttpRequestMessage(new HttpMethod(method), url)
            {
                Content = JsonContent.Create(new { }),
            });

            await TestApi.ReadProblemAsync(response, HttpStatusCode.Forbidden);
        }

        [Theory]
        [InlineData("GET", "/api/users")]
        [InlineData("POST", "/api/recipes")]
        [InlineData("DELETE", "/api/pizza-sizes/00000000-0000-0000-0000-000000000001")]
        public async Task Staff_IsForbiddenFromAdminEndpoints(string method, string url)
        {
            var staff = await api.NewUserAsync("Staff");

            var response = await staff.Client.SendAsync(new HttpRequestMessage(new HttpMethod(method), url)
            {
                Content = JsonContent.Create(new { }),
            });

            await TestApi.ReadProblemAsync(response, HttpStatusCode.Forbidden);
        }

        [Fact]
        public async Task Customer_CanReadMenuEndpoints()
        {
            var customer = await api.NewUserAsync();

            foreach (var url in new[] { "/api/recipes", "/api/pizza-sizes", "/api/units-of-measure", "/api/toppings" })
            {
                var response = await customer.Client.GetAsync(url);
                Assert.True(response.StatusCode == HttpStatusCode.OK, $"{url} returned {response.StatusCode}");
            }
        }

        [Fact]
        public async Task Me_ReturnsEmailAndRoles_AndIsNotCached()
        {
            var customer = await api.NewUserAsync();
            var admin = await api.AdminAsync();

            var customerResponse = await customer.Client.GetAsync("/api/auth/me");
            var customerMe = await TestApi.ReadAsync<CurrentUserDto>(customerResponse);
            var adminMe = await admin.Client.GetFromJsonAsync<CurrentUserDto>("/api/auth/me", TestApi.Json);

            Assert.Equal(customer.Email, customerMe.Email);
            Assert.Empty(customerMe.Roles);
            Assert.Equal(["Admin"], adminMe!.Roles);
            Assert.True(customerResponse.Headers.CacheControl?.NoStore);
        }

        [Fact]
        public async Task UnknownRoute_Is404ProblemDetails()
        {
            var customer = await api.NewUserAsync();

            var response = await customer.Client.GetAsync("/api/does-not-exist");

            await TestApi.ReadProblemAsync(response, HttpStatusCode.NotFound);
        }
    }
}
