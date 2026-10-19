using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using PizzaShop.Api.Db;
using PizzaShop.Api.Models;

namespace PizzaShop.Api.Auth
{
    public static class AuthExtensions
    {
        /// <summary>
        /// ASP.NET Core Identity with its bearer tokens, the role policies, and token
        /// lifetimes from <c>Auth:AccessTokenMinutes</c> / <c>Auth:RefreshTokenMinutes</c>.
        /// </summary>
        public static IServiceCollection AddPizzaShopAuth(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddIdentityApiEndpoints<AppUser>(options =>
                {
                    options.User.RequireUniqueEmail = true;
                    // No email sender yet (Identity's default is a no-op).
                    options.SignIn.RequireConfirmedEmail = false;
                })
                .AddRoles<IdentityRole<Guid>>()
                .AddEntityFrameworkStores<PizzaShopContext>();

            services.AddDataProtection()
                .PersistKeysToDbContext<PizzaShopContext>();

            // Inactivity timeout: an active client refreshes before the access token expires and
            // each refresh issues a new refresh token, so the session slides. After
            // RefreshTokenMinutes without a refresh, both tokens are dead and the user logs in again.
            services.Configure<BearerTokenOptions>(IdentityConstants.BearerScheme, options =>
            {
                options.BearerTokenExpiration = TimeSpan.FromMinutes(configuration.GetValue("Auth:AccessTokenMinutes", 15));
                options.RefreshTokenExpiration = TimeSpan.FromMinutes(configuration.GetValue("Auth:RefreshTokenMinutes", 30));
            });

            services.AddAuthorizationBuilder()
                .AddPolicy(Policies.Admin, policy => policy.RequireRole(Roles.Admin))
                .AddPolicy(Policies.Staff, policy => policy.RequireRole(Roles.Admin, Roles.Staff));

            return services;
        }

        /// <summary>
        /// /api/auth/register, /login, /refresh, /manage/info, /forgotPassword, /resetPassword...
        /// Register and login are anonymous; /manage requires a token.
        /// </summary>
        public static IEndpointRouteBuilder MapAuthEndpoints(this IEndpointRouteBuilder app)
        {
            app.MapGroup("/api/auth")
                .WithTags("Auth")
                .MapIdentityApi<AppUser>();

            return app;
        }

        /// <summary>
        /// Creates the first admin from <c>Auth:BootstrapAdmin:Email</c> / <c>Password</c>
        /// (user-secrets locally, environment variables on Azure) when no admin exists yet.
        /// Does nothing when those settings are absent.
        /// </summary>
        public static async Task SeedBootstrapAdminAsync(this WebApplication app)
        {
            var email = app.Configuration["Auth:BootstrapAdmin:Email"];
            var password = app.Configuration["Auth:BootstrapAdmin:Password"];
            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
            {
                return;
            }

            using var scope = app.Services.CreateScope();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();

            if ((await userManager.GetUsersInRoleAsync(Roles.Admin)).Count > 0)
            {
                return;
            }

            var user = await userManager.FindByEmailAsync(email);
            if (user is null)
            {
                user = new AppUser { UserName = email, Email = email };
                ThrowIfFailed(await userManager.CreateAsync(user, password), "create the bootstrap admin");
            }

            ThrowIfFailed(await userManager.AddToRoleAsync(user, Roles.Admin), "grant the bootstrap admin the Admin role");
            app.Logger.LogInformation("Bootstrap admin {Email} created.", email);
        }

        // Only valid on authenticated requests: Identity always issues the NameIdentifier claim.
        public static Guid GetUserId(this ClaimsPrincipal user) =>
            Guid.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? throw new InvalidOperationException("The user has no NameIdentifier claim."));

        private static void ThrowIfFailed(IdentityResult result, string action)
        {
            if (!result.Succeeded)
            {
                throw new InvalidOperationException(
                    $"Could not {action}: {string.Join(" ", result.Errors.Select(e => e.Description))}");
            }
        }
    }
}
