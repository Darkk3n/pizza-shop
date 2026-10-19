using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;

namespace PizzaShop.Api.Tests.Infrastructure
{
    // Hosts the real API (Program.cs) in memory against the test database.
    // Rate limits are raised so tests don't trip them; RateLimitedApiFactory lowers them.
    public class ApiFactory : WebApplicationFactory<Program>, IAsyncLifetime
    {
        public const string AdminEmail = "admin@tests.local";
        public const string AdminPassword = "Tests!Admin1";

        protected virtual string Environment => "Testing";

        protected virtual Dictionary<string, string?> Settings => new()
        {
            ["ConnectionStrings:PizzaShop"] = TestDatabase.ConnectionString,
            ["Auth:BootstrapAdmin:Email"] = AdminEmail,
            ["Auth:BootstrapAdmin:Password"] = AdminPassword,
            // Pinned so pricing assertions don't depend on appsettings.json.
            ["Orders:TaxRate"] = "0.0825",
            // Keeps the Development-only sample data (and its extra admin) out of the test database.
            ["DevSeed:Enabled"] = "false",
            ["RateLimiting:AuthPerMinute"] = "100000",
            ["RateLimiting:UserPerMinute"] = "100000",
            ["RateLimiting:OrderCreatePerMinute"] = "100000",
        };

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.UseEnvironment(Environment);
            foreach (var (key, value) in Settings)
            {
                builder.UseSetting(key, value);
            }
        }

        public async Task InitializeAsync()
        {
            await TestDatabase.EnsureFreshAsync();
            // Starts the host now, so the bootstrap admin is seeded before the first test.
            _ = Server;
        }

        Task IAsyncLifetime.DisposeAsync() => DisposeAsync().AsTask();
    }

    public class RateLimitedApiFactory : ApiFactory
    {
        public const int AuthPerMinute = 3;
        public const int OrderCreatePerMinute = 2;

        protected override Dictionary<string, string?> Settings
        {
            get
            {
                var settings = base.Settings;
                settings["RateLimiting:AuthPerMinute"] = AuthPerMinute.ToString();
                settings["RateLimiting:OrderCreatePerMinute"] = OrderCreatePerMinute.ToString();
                return settings;
            }
        }
    }

    // Development maps the OpenAPI document; used only to check that it generates.
    public class DevelopmentApiFactory : ApiFactory
    {
        protected override string Environment => "Development";
    }

    // One shared host for most test classes; tests create their own uniquely named data.
    [CollectionDefinition(Name)]
    public class ApiCollection : ICollectionFixture<ApiFactory>
    {
        public const string Name = "Api";
    }
}
