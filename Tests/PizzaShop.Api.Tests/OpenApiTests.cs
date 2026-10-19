using System.Net;
using System.Text.Json.Nodes;
using PizzaShop.Api.Tests.Infrastructure;

namespace PizzaShop.Api.Tests
{
    // The OpenAPI document is only mapped in Development. Generation once failed with a 500
    // ([AsParameters] records with validation attributes), and nothing else would notice.
    public class OpenApiTests(DevelopmentApiFactory factory) : IClassFixture<DevelopmentApiFactory>
    {
        [Fact]
        public async Task Document_Generates_WithBearerScheme()
        {
            var response = await factory.CreateClient().GetAsync("/openapi/v1.json");

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var document = JsonNode.Parse(await response.Content.ReadAsStringAsync())!;
            Assert.NotNull(document["paths"]?["/api/orders"]);
            Assert.Equal("bearer", document["components"]?["securitySchemes"]?["Bearer"]?["scheme"]?.GetValue<string>());
        }
    }
}
