using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("PizzaShop")
    ?? throw new InvalidOperationException("Connection string 'PizzaShop' not found.");
builder.Services.AddDbContext<PizzaShopContext>(options => options.UseNpgsql(connectionString));

var app = builder.Build();


app.MapGet("/", () => "Hello World!");

app.Run();
