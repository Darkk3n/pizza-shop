using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using PizzaShop.Api.Db;
using PizzaShop.Api.Email;
using PizzaShop.Api.Dtos;
using PizzaShop.Api.Extensions;
using PizzaShop.Api.Models;
using PizzaShop.Api.Options;

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
                    // New accounts can't sign in until they click the emailed link (login answers
                    // 401 "NotAllowed"), so nobody signs up with someone else's address.
                    options.SignIn.RequireConfirmedEmail = configuration.GetValue("Auth:RequireConfirmedEmail", true);
                })
                .AddRoles<IdentityRole<Guid>>()
                .AddEntityFrameworkStores<PizzaShopContext>();

            // Replaces Identity's no-op sender: confirmation and reset emails go out through SMTP
            // (Email:Smtp), with links to the web app (Email:WebBaseUrl).
            services.AddOptions<EmailOptions>()
                .BindConfiguration(EmailOptions.SectionName)
                .ValidateDataAnnotations()
                .ValidateOnStart();
            services.AddSingleton<IEmailDelivery, SmtpEmailDelivery>();
            services.AddTransient<IEmailSender<AppUser>, IdentityEmailSender>();

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
        /// Register and login are anonymous; /manage and /me require a token.
        /// </summary>
        public static IEndpointRouteBuilder MapAuthEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/api/auth")
                .WithTags("Auth");

            // Per client IP against password spraying and mass sign-ups; /me only has the per-user limit.
            group.MapIdentityApi<AppUser>()
                .RequireRateLimiting(RateLimitPolicies.Auth)
                .AddEndpointFilter(RejectMalformedUserId);
            group.MapGet("/me", GetCurrentUser)
                .RequireAuthorization();

            return app;
        }

        // GET /confirmEmail?userId=...&code=... looks the user up by id, and with Guid keys a
        // non-GUID id throws inside EF (a 500 on an anonymous endpoint). Answer like a wrong code.
        private static ValueTask<object?> RejectMalformedUserId(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
        {
            var userId = context.HttpContext.Request.Query["userId"];
            return userId.Count > 0 && !Guid.TryParse(userId.ToString(), out _)
                ? ValueTask.FromResult<object?>(TypedResults.Unauthorized())
                : next(context);
        }

        // Read from the token's claims, not the database: these are exactly the roles the API
        // enforces for this token, so the UI never offers an action that would get a 403. A role
        // change shows up after the user's next /refresh, the same moment the API applies it.
        private static Ok<CurrentUserDto> GetCurrentUser(ClaimsPrincipal user, HttpResponse response)
        {
            // One user's identity must never be stored by a browser cache or proxy.
            response.Headers.CacheControl = "no-store";

            var roles = user.FindAll(ClaimTypes.Role)
                .Select(c => c.Value)
                .Order()
                .ToList();
            return TypedResults.Ok(new CurrentUserDto(user.FindFirstValue(ClaimTypes.Email), roles));
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
                // Confirmed up front: whoever holds these settings owns the address, and the admin
                // must be able to sign in before any email is configured.
                user = new AppUser { UserName = email, Email = email, EmailConfirmed = true };
                ThrowIfFailed(await userManager.CreateAsync(user, password), "create the bootstrap admin");
            }

            ThrowIfFailed(await userManager.AddToRoleAsync(user, Roles.Admin), "grant the bootstrap admin the Admin role");
            app.Logger.LogInformation("Bootstrap admin {Email} created.", email);
        }

        // Only valid on authenticated requests: Identity always issues the NameIdentifier claim.
        public static Guid GetUserId(this ClaimsPrincipal user) =>
            Guid.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? throw new InvalidOperationException("The user has no NameIdentifier claim."));

        // Mirrors the Staff policy (admins pass too), for handlers that vary by role instead of rejecting.
        public static bool IsStaff(this ClaimsPrincipal user) =>
            user.IsInRole(Roles.Admin) || user.IsInRole(Roles.Staff);

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
