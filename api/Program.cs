using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using PizzaShop.Api.Auth;
using PizzaShop.Api.Db;
using PizzaShop.Api.Endpoints;
using PizzaShop.Api.Extensions;
using PizzaShop.Api.Options;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("PizzaShop")
    ?? throw new InvalidOperationException("Connection string 'PizzaShop' not found.");
builder.Services.AddDbContext<PizzaShopContext>(options => options.UseNpgsql(connectionString));
builder.Services.AddFrontendCors(builder.Configuration);
builder.Services.AddClientIpForwarding(builder.Configuration);
builder.Services.AddPizzaShopAuth(builder.Configuration);
builder.Services.AddPizzaShopRateLimiting();
builder.Services.AddOptions<OrderOptions>()
    .BindConfiguration(OrderOptions.SectionName)
    .ValidateDataAnnotations()
    .ValidateOnStart();
builder.Services.AddOptions<StatisticsOptions>()
    .BindConfiguration(StatisticsOptions.SectionName)
    .ValidateDataAnnotations()
    .Validate(o => TimeZoneInfo.TryFindSystemTimeZoneById(o.TimeZone, out _), "Statistics:TimeZone must be an IANA time zone id, e.g. America/Mexico_City.")
    .ValidateOnStart();
// Enums travel as their names ("DineIn", "LeftHalf"), matching how they're stored; numbers are rejected.
builder.Services.ConfigureHttpJsonOptions(options =>
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter(allowIntegerValues: false)));
builder.Services.AddProblemDetails();
builder.Services.AddValidation();
builder.Services.AddOpenApi(options => options.AddDocumentTransformer<BearerSecuritySchemeTransformer>());
// Reports Unhealthy (503) when the database can't be reached.
builder.Services.AddHealthChecks()
    .AddDbContextCheck<PizzaShopContext>();

var app = builder.Build();

// First, so everything after it (rate limits, logs) sees the browser's IP rather than the proxy's.
app.UseForwardedHeaders();

// Every error response is Problem Details (application/problem+json), so the web app needs one
// parser. Unhandled exceptions become a generic 500 outside Development (where the developer
// exception page, which also answers JSON clients with problem details, shows the stack trace).
// Status code pages fill the empty bodies of 401/403/404/405 and binding failures.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler();
}
app.UseStatusCodePages();

app.UseCors(CorsExtensions.FrontendPolicy);
app.UseAuthentication();
// After authentication so limits can be per user; before authorization so floods stop early.
app.UseRateLimiter();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    // OpenAPI document at /openapi/v1.json, interactive docs at /scalar.
    app.MapOpenApi();
    app.MapScalarApiReference();
}

// Every resource group requires a signed-in user (role policies per endpoint);
// only this health check and /api/auth's register/login/refresh are anonymous.
// Azure probes it every few seconds, so it is never rate limited (a throttled probe would mark
// the instance unhealthy). Plain-text "Healthy"/"Unhealthy" with 200/503.
app.MapHealthChecks("/health")
    .DisableRateLimiting();
app.MapAuthEndpoints();
app.MapUsersEndpoints();
app.MapUnitsOfMeasureEndpoints();
app.MapIngredientsEndpoints();
app.MapToppingsEndpoints();
app.MapRecipesEndpoints();
app.MapPizzaSizesEndpoints();
app.MapOrdersEndpoints();
app.MapStatisticsEndpoints();
app.MapPublicEndpoints();

await app.SeedBootstrapAdminAsync();
await app.SeedDevelopmentDataAsync();

app.Run();
