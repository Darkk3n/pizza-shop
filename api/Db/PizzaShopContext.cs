using Microsoft.EntityFrameworkCore;
using PizzaShop.Api.Models;

namespace PizzaShop.Api.Db
{
    public class PizzaShopContext(DbContextOptions<PizzaShopContext> options) : DbContext(options)
    {
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<UnitOfMeasure> UnitsOfMeasure { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<OrderItemTopping> OrderItemToppings { get; set; }
        public DbSet<PizzaSize> PizzaSizes { get; set; }
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<RecipeItem> RecipeItems { get; set; }

        protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
        {
            // Store every enum by name rather than as an integer.
            configurationBuilder.Properties<Enum>().HaveConversion<string>();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ingredient>()
                .Property(i => i.CurrentStock)
                .HasDefaultValue(0m);

            modelBuilder.Entity<PizzaSize>()
                .Property(s => s.PriceMultiplier)
                .HasDefaultValue(1.00m);

            modelBuilder.Entity<OrderItem>()
                .Property(i => i.Quantity)
                .HasDefaultValue(1);

            modelBuilder.Entity<OrderItemTopping>()
                .Property(t => t.PriceAdjustment)
                .HasDefaultValue(0m);

            modelBuilder.Entity<Order>()
                .Property(i => i.CreatedAt)
                .HasDefaultValueSql("now()");

            // Deleting catalog data (units, ingredients, sizes, recipes) must not
            // erase order history, so those relationships are Restrict. Child rows
            // owned by an order or recipe (items, toppings, recipe items) still cascade.
            modelBuilder.Entity<Ingredient>()
                .HasOne(i => i.UnitOfMeasure)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<RecipeItem>()
                .HasOne(ri => ri.Ingredient)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Recipe)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.PizzaSize)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<OrderItemTopping>()
                .HasOne(t => t.Ingredient)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PizzaSize>().HasData(
                new PizzaSize { PizzaSizeId = Guid.Parse("dd64f6fa-4a2d-4e4d-aa26-ba77dcd3c496"), Name = "Small", PriceMultiplier = 1.00m },
                new PizzaSize { PizzaSizeId = Guid.Parse("8a5ab672-b4da-48fc-876b-4ca5b87754ee"), Name = "Medium", PriceMultiplier = 1.20m },
                new PizzaSize { PizzaSizeId = Guid.Parse("6818c0cd-1560-4a1a-8e57-3c870284a646"), Name = "Large", PriceMultiplier = 1.70m });

            modelBuilder.Entity<UnitOfMeasure>().HasData(
                new UnitOfMeasure { UnitOfMeasureId = Guid.Parse("d75312cf-bbc6-497a-8f54-a3a94178f73c"), Name = "Gram" },
                new UnitOfMeasure { UnitOfMeasureId = Guid.Parse("d2b7f138-8fb4-490f-aca6-ad9a399c50e7"), Name = "Milliliter" },
                new UnitOfMeasure { UnitOfMeasureId = Guid.Parse("a531c7e3-b9fc-46c1-b887-7b1d6c67f21f"), Name = "Piece" });
        }
    }
}
