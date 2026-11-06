using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PizzaShop.Api.Auth;
using PizzaShop.Api.Models;

namespace PizzaShop.Api.Db
{
    // Sample data for local development only: a realistic menu and one account per role, so the
    // web app has something to show from the first run. Never in HasData (that would ship fake
    // recipes and known passwords to every database through the migrations); never outside
    // Development. Reference data the app needs everywhere (units, sizes, roles) stays in HasData.
    public static class DevelopmentSeeder
    {
        // Development-only accounts; all share this password.
        public const string Password = "Dev!Pass123";

        private static readonly (string Email, string? Role)[] Accounts =
        [
            ("admin@pizzashop.dev", Roles.Admin),
            ("staff@pizzashop.dev", Roles.Staff),
            ("customer@pizzashop.dev", null),
        ];

        /// <summary>
        /// Runs in Development unless <c>DevSeed:Enabled</c> is false. Accounts are created when
        /// missing; the menu only when there are no ingredients and no recipes yet, so it never
        /// mixes with data created by hand.
        /// </summary>
        public static async Task SeedDevelopmentDataAsync(this WebApplication app)
        {
            if (!app.Environment.IsDevelopment() || !app.Configuration.GetValue("DevSeed:Enabled", true))
            {
                return;
            }

            using var scope = app.Services.CreateScope();
            await SeedAccountsAsync(scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>(), app.Logger);
            await SeedMenuAsync(scope.ServiceProvider.GetRequiredService<PizzaShopContext>(), app.Logger);
        }

        private static async Task SeedAccountsAsync(UserManager<AppUser> userManager, ILogger logger)
        {
            foreach (var (email, role) in Accounts)
            {
                if (await userManager.FindByEmailAsync(email) is not null)
                {
                    continue;
                }

                // Confirmed so the sample accounts sign in without a trip through Mailpit.
                var user = new AppUser { UserName = email, Email = email, EmailConfirmed = true };
                ThrowIfFailed(await userManager.CreateAsync(user, Password), email);
                if (role is not null)
                {
                    ThrowIfFailed(await userManager.AddToRoleAsync(user, role), email);
                }
                logger.LogInformation("Development account {Email} ({Role}) created.", email, role ?? "Customer");
            }
        }

        private static async Task SeedMenuAsync(PizzaShopContext context, ILogger logger)
        {
            if (await context.Ingredients.AnyAsync() || await context.Recipes.AnyAsync())
            {
                return;
            }

            // By id, not name: the seeded units can be renamed. Only deletable while unused, so check.
            var gram = PizzaShopContext.GramUnitId;
            var milliliter = PizzaShopContext.MilliliterUnitId;
            if (await context.UnitsOfMeasure.CountAsync(u => u.UnitOfMeasureId == gram || u.UnitOfMeasureId == milliliter) < 2)
            {
                logger.LogWarning("Development menu skipped: the seeded Gram or Milliliter unit was deleted.");
                return;
            }

            Ingredient Add(string name, Guid unitId, decimal stock, decimal? toppingPrice = null, decimal? toppingPortion = null)
            {
                var ingredient = new Ingredient
                {
                    Name = name,
                    UnitOfMeasureId = unitId,
                    CurrentStock = stock,
                    ToppingPrice = toppingPrice,
                    ToppingPortion = toppingPortion,
                };
                context.Ingredients.Add(ingredient);
                return ingredient;
            }

            // Amounts are per Small pizza; toppings priced per Small, Whole, Standard portion.
            var dough = Add("Masa para pizza", gram, 20000);
            var sauce = Add("Salsa de tomate", milliliter, 10000);
            var mozzarella = Add("Mozzarella", gram, 10000, 1.50m, 40);
            var pepperoni = Add("Pepperoni", gram, 5000, 1.75m, 30);
            var sausage = Add("Salchicha italiana", gram, 4000, 1.75m, 35);
            var ham = Add("Jamón", gram, 3000, 1.50m, 30);
            var mushrooms = Add("Champiñones", gram, 4000, 1.25m, 30);
            var peppers = Add("Pimiento morrón", gram, 3000, 1.00m, 25);
            var onions = Add("Cebolla morada", gram, 3000, 0.75m, 25);
            var olives = Add("Aceitunas negras", gram, 2000, 1.00m, 20);
            var pineapple = Add("Piña", gram, 3000, 1.25m, 30);
            var basil = Add("Albahaca fresca", gram, 500, 0.75m, 3);
            var oregano = Add("Orégano", gram, 500);
            var oliveOil = Add("Aceite de oliva", milliliter, 2000);

            void Recipe(string name, decimal basePrice, bool isActive, params (Ingredient Ingredient, decimal Amount)[] items) =>
                context.Recipes.Add(new Recipe
                {
                    Name = name,
                    BasePrice = basePrice,
                    IsActive = isActive,
                    RecipeItems = [.. items.Select(i => new RecipeItem { Ingredient = i.Ingredient, Amount = i.Amount })],
                });

            (Ingredient, decimal)[] cheeseBase = [(dough, 250), (sauce, 90), (mozzarella, 120)];
            Recipe("Queso", 9.99m, true, [.. cheeseBase, (oregano, 1)]);
            Recipe("Pepperoni", 11.99m, true, [.. cheeseBase, (pepperoni, 60)]);
            Recipe("Margarita", 11.49m, true, (dough, 250), (sauce, 90), (mozzarella, 100), (basil, 5), (oliveOil, 10));
            Recipe("Vegetariana", 12.49m, true, [.. cheeseBase, (mushrooms, 40), (peppers, 30), (onions, 30), (olives, 25)]);
            Recipe("Hawaiana", 12.49m, true, [.. cheeseBase, (ham, 50), (pineapple, 50)]);
            Recipe("Carnes frías", 14.49m, true, [.. cheeseBase, (pepperoni, 40), (sausage, 50), (ham, 40)]);
            // Custom pizzas are this recipe plus toppings (order items require a recipe).
            Recipe("Arma la tuya", 9.49m, true, [.. cheeseBase]);
            // Shows how retired items look in the admin screens.
            Recipe("Calabaza de temporada", 13.49m, false, [.. cheeseBase, (onions, 20)]);

            await context.SaveChangesAsync();
            logger.LogInformation("Development menu seeded.");
        }

        private static void ThrowIfFailed(IdentityResult result, string email)
        {
            if (!result.Succeeded)
            {
                throw new InvalidOperationException(
                    $"Could not create development account {email}: {string.Join(" ", result.Errors.Select(e => e.Description))}");
            }
        }
    }
}
