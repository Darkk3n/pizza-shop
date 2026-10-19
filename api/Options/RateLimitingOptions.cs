using System.ComponentModel.DataAnnotations;

namespace PizzaShop.Api.Options
{
    // Bound from the "RateLimiting" section of appsettings.json and validated at startup.
    // All limits are requests per minute (see RateLimitingExtensions).
    public class RateLimitingOptions
    {
        public const string SectionName = "RateLimiting";

        // Per client IP on /api/auth (login, register, refresh, password reset...).
        // Staff tablets in one shop usually share a public IP, so leave room for them.
        [Range(1, 100000)]
        public int AuthPerMinute { get; set; } = 20;

        // Per signed-in user (per client IP when anonymous) on every endpoint.
        [Range(1, 100000)]
        public int UserPerMinute { get; set; } = 300;

        // Per user on POST /api/orders, on top of UserPerMinute.
        [Range(1, 100000)]
        public int OrderCreatePerMinute { get; set; } = 20;
    }
}
