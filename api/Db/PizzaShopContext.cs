using Microsoft.AspNetCore.DataProtection.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using AppRoles = PizzaShop.Api.Auth.Roles; // "Roles" alone is IdentityDbContext.Roles here.
using PizzaShop.Api.Models;

namespace PizzaShop.Api.Db
{
    // Identity tables (AspNetUsers, AspNetRoles, ...) live alongside the shop data.
    // Data Protection keys are stored here too: they encrypt the Identity bearer tokens,
    // and keys kept on local disk would be lost on every redeploy, signing everyone out.
    public class PizzaShopContext(DbContextOptions<PizzaShopContext> options)
        : IdentityDbContext<AppUser, IdentityRole<Guid>, Guid>(options), IDataProtectionKeyContext
    {
        public DbSet<DataProtectionKey> DataProtectionKeys { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<UnitOfMeasure> UnitsOfMeasure { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<OrderItemTopping> OrderItemToppings { get; set; }
        public DbSet<OrderIngredientUsage> OrderIngredientUsages { get; set; }
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
            // Maps the Identity tables; must run before the configuration below.
            base.OnModelCreating(modelBuilder);

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

            modelBuilder.Entity<Order>()
                .HasOne(o => o.PlacedBy)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Order>()
                .HasOne(o => o.CancelledBy)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<OrderIngredientUsage>()
                .HasOne(u => u.Ingredient)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            // Fixed ConcurrencyStamps keep HasData from producing a new migration every time.
            modelBuilder.Entity<IdentityRole<Guid>>().HasData(
                new IdentityRole<Guid> { Id = Guid.Parse("3f0c8a52-6d1e-4b7a-9c2d-8e5f1a7b4c60"), Name = AppRoles.Admin, NormalizedName = "ADMIN", ConcurrencyStamp = "b1d6f0e2-0a3c-4e5f-8a9b-1c2d3e4f5a60" },
                new IdentityRole<Guid> { Id = Guid.Parse("7a9e2b14-3c5d-4f6e-8b7a-0d1c2e3f4a51"), Name = AppRoles.Staff, NormalizedName = "STAFF", ConcurrencyStamp = "c2e7a1f3-1b4d-4f6a-9b0c-2d3e4f5a6b71" });

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
