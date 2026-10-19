using System.Net;
using Microsoft.AspNetCore.HttpOverrides;

namespace PizzaShop.Api.Extensions
{
    public static class ForwardedHeadersExtensions
    {
        /// <summary>
        /// Makes <c>HttpContext.Connection.RemoteIpAddress</c> the browser's IP when requests arrive
        /// through the Next.js server (BFF) or Azure's front end, which send it in <c>X-Forwarded-For</c>.
        /// The header is only honored from the proxies listed in <c>ForwardedHeaders:KnownProxies</c> /
        /// <c>KnownNetworks</c> (loopback when none are listed); from anyone else it is ignored, or
        /// clients could fake a new IP per request and dodge per-IP rate limits.
        /// </summary>
        public static IServiceCollection AddClientIpForwarding(this IServiceCollection services, IConfiguration configuration)
        {
            var proxies = configuration.GetSection("ForwardedHeaders:KnownProxies").Get<string[]>() ?? [];
            var networks = configuration.GetSection("ForwardedHeaders:KnownNetworks").Get<string[]>() ?? [];

            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
                // Number of proxy hops to unwind (e.g. 2 for browser -> BFF -> Azure front end -> API).
                options.ForwardLimit = configuration.GetValue("ForwardedHeaders:ForwardLimit", 1);

                // Configured entries replace the loopback defaults, so production trusts exactly its proxies.
                if (proxies.Length > 0 || networks.Length > 0)
                {
                    options.KnownProxies.Clear();
                    options.KnownIPNetworks.Clear();
                }
                foreach (var proxy in proxies)
                {
                    options.KnownProxies.Add(IPAddress.Parse(proxy));
                }
                foreach (var network in networks)
                {
                    options.KnownIPNetworks.Add(System.Net.IPNetwork.Parse(network));
                }
            });

            return services;
        }
    }
}
