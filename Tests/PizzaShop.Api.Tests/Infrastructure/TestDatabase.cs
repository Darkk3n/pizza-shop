using System.Text.Json.Nodes;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using PizzaShop.Api.Db;

namespace PizzaShop.Api.Tests.Infrastructure
{
    // A dedicated Postgres database for the tests, dropped and re-migrated once per test run.
    internal static class TestDatabase
    {
        public const string ConnectionVariable = "PIZZASHOP_TEST_CONNECTION";

        private static readonly Lazy<Task> reset = new(ResetAsync);

        public static string ConnectionString { get; } = ResolveConnectionString();

        // Every factory awaits this; only the first call does the work.
        public static Task EnsureFreshAsync() => reset.Value;

        // PIZZASHOP_TEST_CONNECTION wins (e.g. in CI). Otherwise reuse the local development server
        // and credentials from api/appsettings.Development.json (untracked, so no secret is committed)
        // with a separate database, so the tests never touch development data.
        private static string ResolveConnectionString()
        {
            var fromEnvironment = Environment.GetEnvironmentVariable(ConnectionVariable);
            if (!string.IsNullOrWhiteSpace(fromEnvironment))
            {
                return fromEnvironment;
            }

            var settingsPath = Path.Combine(FindRepositoryRoot(), "api", "appsettings.Development.json");
            if (!File.Exists(settingsPath))
            {
                throw new InvalidOperationException(
                    $"Set {ConnectionVariable} or create {settingsPath} with ConnectionStrings:PizzaShop.");
            }

            var development = JsonNode.Parse(File.ReadAllText(settingsPath))?["ConnectionStrings"]?["PizzaShop"]?.GetValue<string>()
                ?? throw new InvalidOperationException($"{settingsPath} has no ConnectionStrings:PizzaShop.");
            return new NpgsqlConnectionStringBuilder(development) { Database = "pizzashop_tests" }.ConnectionString;
        }

        private static string FindRepositoryRoot()
        {
            for (var directory = new DirectoryInfo(AppContext.BaseDirectory); directory is not null; directory = directory.Parent)
            {
                if (File.Exists(Path.Combine(directory.FullName, "api", "PizzaShop.Api.csproj")))
                {
                    return directory.FullName;
                }
            }

            throw new InvalidOperationException("Could not find the repository root (the folder containing api/).");
        }

        private static async Task ResetAsync()
        {
            var options = new DbContextOptionsBuilder<PizzaShopContext>().UseNpgsql(ConnectionString).Options;
            await using var context = new PizzaShopContext(options);
            await context.Database.EnsureDeletedAsync();
            await context.Database.MigrateAsync();
        }
    }
}
