using Microsoft.EntityFrameworkCore;
using PizzaShop.Api.Db;
using PizzaShop.Api.Endpoints;
using PizzaShop.Api.Extensions;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("PizzaShop")
    ?? throw new InvalidOperationException("Connection string 'PizzaShop' not found.");
builder.Services.AddDbContext<PizzaShopContext>(options => options.UseNpgsql(connectionString));
builder.Services.AddFrontendCors(builder.Configuration);
builder.Services.AddProblemDetails();
builder.Services.AddValidation();

var app = builder.Build();

app.UseCors(CorsExtensions.FrontendPolicy);

app.MapGet("/", () => "Hello World!");
app.MapUnitsOfMeasureEndpoints();

app.Run();
