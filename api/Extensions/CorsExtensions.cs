namespace PizzaShop.Api.Extensions
{
    public static class CorsExtensions
    {
        public const string FrontendPolicy = "Frontend";

        /// <summary>
        /// Allows the web app to call the API from the origins listed in
        /// <c>Cors:AllowedOrigins</c>. With no origins configured, every
        /// cross-origin request is rejected.
        /// </summary>
        public static IServiceCollection AddFrontendCors(this IServiceCollection services, IConfiguration configuration)
        {
            var allowedOrigins = configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];

            services.AddCors(options =>
            {
                options.AddPolicy(FrontendPolicy, policy => policy
                    .WithOrigins(allowedOrigins)
                    .AllowAnyHeader()
                    .AllowAnyMethod());
            });

            return services;
        }
    }
}
