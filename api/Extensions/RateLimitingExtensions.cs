using System.Globalization;
using System.Security.Claims;
using System.Threading.RateLimiting;
using Microsoft.Extensions.Options;
using PizzaShop.Api.Options;

namespace PizzaShop.Api.Extensions
{
    // Named policies, attached with RequireRateLimiting on top of the global per-user limit.
    public static class RateLimitPolicies
    {
        public const string Auth = "Auth";
        public const string OrderCreate = "OrderCreate";
    }

    public static class RateLimitingExtensions
    {
        private static readonly TimeSpan Window = TimeSpan.FromMinutes(1);

        /// <summary>
        /// In-memory limits from <c>RateLimiting</c> (see <see cref="RateLimitingOptions"/>): a global
        /// per-user limit on every endpoint, plus the <see cref="RateLimitPolicies"/>. Counters are per
        /// server instance, so scaling out multiplies the effective limits.
        /// Rejections are 429 Problem Details with a Retry-After header.
        /// </summary>
        public static IServiceCollection AddPizzaShopRateLimiting(this IServiceCollection services)
        {
            services.AddOptions<RateLimitingOptions>()
                .BindConfiguration(RateLimitingOptions.SectionName)
                .ValidateDataAnnotations()
                .ValidateOnStart();

            services.AddRateLimiter(options =>
            {
                // Runs after authentication (see Program.cs), so signed-in users are counted per account
                // wherever they connect from; anonymous callers are counted per client IP.
                // Note: when a named policy rejects a request, the middleware's retry acquires this
                // global permit a second time, so each rejection costs 2. Only clients that keep
                // hitting a named limit (e.g. ~140 auth rejections a minute) feel it.
                options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(context =>
                {
                    var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
                    var key = userId is null ? $"ip:{ClientIp(context)}" : $"user:{userId}";
                    return RateLimitPartition.GetFixedWindowLimiter(key, _ =>
                        FixedWindow(Limits(context).UserPerMinute));
                });

                // Per client IP, never per account: password spraying targets many accounts at once.
                // A token bucket (burst of AuthPerMinute, refilled a sixth every 10 s) so a burst can't be
                // doubled across a fixed window's reset, and unlike a sliding window it reports Retry-After.
                options.AddPolicy(RateLimitPolicies.Auth, context =>
                    RateLimitPartition.GetTokenBucketLimiter(ClientIp(context), _ =>
                    {
                        var perMinute = Limits(context).AuthPerMinute;
                        return new TokenBucketRateLimiterOptions
                        {
                            TokenLimit = perMinute,
                            TokensPerPeriod = Math.Max(1, (int)Math.Ceiling(perMinute / 6.0)),
                            ReplenishmentPeriod = Window / 6,
                            QueueLimit = 0,
                        };
                    }));

                options.AddPolicy(RateLimitPolicies.OrderCreate, context =>
                    RateLimitPartition.GetFixedWindowLimiter(
                        context.User.FindFirstValue(ClaimTypes.NameIdentifier) ?? $"ip:{ClientIp(context)}",
                        _ => FixedWindow(Limits(context).OrderCreatePerMinute)));

                options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
                options.OnRejected = async (context, ct) =>
                {
                    var httpContext = context.HttpContext;
                    var detail = "Too many requests. Try again later.";
                    if (context.Lease.TryGetMetadata(MetadataName.RetryAfter, out var retryAfter))
                    {
                        var seconds = (int)Math.Ceiling(retryAfter.TotalSeconds);
                        httpContext.Response.Headers.RetryAfter = seconds.ToString(CultureInfo.InvariantCulture);
                        detail = $"Too many requests. Try again in {seconds} seconds.";
                    }

                    // Same shape as every other error response.
                    await httpContext.RequestServices.GetRequiredService<IProblemDetailsService>().WriteAsync(new ProblemDetailsContext
                    {
                        HttpContext = httpContext,
                        ProblemDetails =
                        {
                            Status = StatusCodes.Status429TooManyRequests,
                            Title = "Too Many Requests",
                            Detail = detail,
                        },
                    });
                };
            });

            return services;
        }

        // The browser's IP once UseForwardedHeaders has run (see ForwardedHeadersExtensions).
        private static string ClientIp(HttpContext context) =>
            context.Connection.RemoteIpAddress?.ToString() ?? "unknown";

        // Read when a partition is first created (once per user or IP), not per request.
        private static RateLimitingOptions Limits(HttpContext context) =>
            context.RequestServices.GetRequiredService<IOptions<RateLimitingOptions>>().Value;

        private static FixedWindowRateLimiterOptions FixedWindow(int permitLimit) => new()
        {
            PermitLimit = permitLimit,
            Window = Window,
            QueueLimit = 0,
        };
    }
}
