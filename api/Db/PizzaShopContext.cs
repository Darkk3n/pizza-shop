using Microsoft.EntityFrameworkCore;
using PizzaShop.Api.Models;

public class PizzaShopContext : DbContext
{
    public PizzaShopContext(DbContextOptions<PizzaShopContext> options) : base(options)
    {
    }

    public DbSet<Ingredient> Ingredients { get; set; }
    public DbSet<UnitOfMeasure> UnitsOfMeasure { get; set; }
    public DbSet<Order> Orders { get; set; }
}