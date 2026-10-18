using Microsoft.EntityFrameworkCore;
using PizzaShop.Api.Db;
using PizzaShop.Api.Endpoints;
using PizzaShop.Api.Extensions;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("PizzaShop")
    ?? throw new InvalidOperationException("Connection string 'PizzaShop' not found.");
builder.Services.AddDbContext<PizzaShopContext>(options => options.UseNpgsql(connectionString));
builder.Services.AddFrontendCors(builder.Configuration);
builder.Services.AddProblemDetails();
builder.Services.AddValidation();
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseCors(CorsExtensions.FrontendPolicy);

if (app.Environment.IsDevelopment())
{
    // OpenAPI document at /openapi/v1.json, interactive docs at /scalar.
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.MapGet("/", () => "Hello World!");
app.MapUnitsOfMeasureEndpoints();
app.MapIngredientsEndpoints();
app.MapRecipesEndpoints();

app.Run();
