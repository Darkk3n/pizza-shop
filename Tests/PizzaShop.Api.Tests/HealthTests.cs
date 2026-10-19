using System.Net;
using PizzaShop.Api.Tests.Infrastructure;

namespace PizzaShop.Api.Tests
{
    [Collection(ApiCollection.Name)]
    public class HealthTests(ApiFactory factory)
    {
        private readonly TestApi api = new(factory);

        [Fact]
        public async Task Health_IsAnonymousAndReportsHealthy()
        {
            var response = await api.Anonymous().GetAsync("/health");

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("Healthy", await response.Content.ReadAsStringAsync());
        }

        [Fact]
        public async Task BootstrapAdmin_CanLogIn()
        {
            var admin = await api.AdminAsync();

            var response = await admin.Client.GetAsync("/api/users");

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
    }
}
