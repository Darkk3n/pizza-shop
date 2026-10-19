using System.Net;
using System.Net.Http.Json;
using PizzaShop.Api.Dtos;
using PizzaShop.Api.Requests;
using PizzaShop.Api.Tests.Infrastructure;

namespace PizzaShop.Api.Tests
{
    [Collection(ApiCollection.Name)]
    public class UsersTests(ApiFactory factory)
    {
        private readonly TestApi api = new(factory);

        [Fact]
        public async Task RemovingAdminFromTheLastAdmin_Is409()
        {
            var admin = await api.AdminAsync();
            var adminId = await TestApi.FindUserIdAsync(admin, ApiFactory.AdminEmail);

            var response = await admin.Client.PutAsJsonAsync($"/api/users/{adminId}/roles", new UpdateUserRolesRequest([]), TestApi.Json);

            var problem = await TestApi.ReadProblemAsync(response, HttpStatusCode.Conflict);
            Assert.Equal("Last admin.", problem.Title);
        }

        [Fact]
        public async Task UnknownRole_Is400()
        {
            var admin = await api.AdminAsync();
            var customer = await api.NewUserAsync();
            var userId = await TestApi.FindUserIdAsync(admin, customer.Email);

            var response = await admin.Client.PutAsJsonAsync($"/api/users/{userId}/roles", new UpdateUserRolesRequest(["Chef"]), TestApi.Json);

            var problem = await TestApi.ReadProblemAsync(response, HttpStatusCode.BadRequest);
            Assert.Contains("Roles", problem.Errors.Keys);
        }

        [Fact]
        public async Task RoleChange_AppliesAfterRefresh_NotBefore()
        {
            var admin = await api.AdminAsync();
            var user = await api.NewUserAsync();
            var userId = await TestApi.FindUserIdAsync(admin, user.Email);

            var promote = await admin.Client.PutAsJsonAsync($"/api/users/{userId}/roles", new UpdateUserRolesRequest(["Staff"]), TestApi.Json);
            promote.EnsureSuccessStatusCode();

            // The current token still has the old (empty) roles, and the API agrees with /me.
            Assert.Equal(HttpStatusCode.Forbidden, (await user.Client.GetAsync("/api/ingredients")).StatusCode);
            Assert.Empty((await user.Client.GetFromJsonAsync<CurrentUserDto>("/api/auth/me", TestApi.Json))!.Roles);

            var refresh = await api.Anonymous().PostAsJsonAsync("/api/auth/refresh", new { refreshToken = user.RefreshToken }, TestApi.Json);
            var tokens = await TestApi.ReadAsync<LoginResponse>(refresh);
            var refreshed = api.WithToken(tokens.AccessToken);

            Assert.Equal(HttpStatusCode.OK, (await refreshed.GetAsync("/api/ingredients")).StatusCode);
            Assert.Equal(["Staff"], (await refreshed.GetFromJsonAsync<CurrentUserDto>("/api/auth/me", TestApi.Json))!.Roles);
        }
    }
}
