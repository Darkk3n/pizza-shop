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

            var units = await context.UnitsOfMeasure.ToDictionaryAsync(u => u.Name, u => u.UnitOfMeasureId);
            Ingredient Add(string name, string unit, decimal stock, decimal? toppingPrice = null, decimal? toppingPortion = null)
            {
                var ingredient = new Ingredient
                {
                    Name = name,
                    UnitOfMeasureId = units[unit],
                    CurrentStock = stock,
                    ToppingPrice = toppingPrice,
                    ToppingPortion = toppingPortion,
                };
                context.Ingredients.Add(ingredient);
                return ingredient;
            }

            // Amounts are per Small pizza; toppings priced per Small, Whole, Standard portion.
            var dough = Add("Pizza Dough", "Gram", 20000);
            var sauce = Add("Tomato Sauce", "Milliliter", 10000);
            var mozzarella = Add("Mozzarella", "Gram", 10000, 1.50m, 40);
            var pepperoni = Add("Pepperoni", "Gram", 5000, 1.75m, 30);
            var sausage = Add("Italian Sausage", "Gram", 4000, 1.75m, 35);
            var ham = Add("Ham", "Gram", 3000, 1.50m, 30);
            var mushrooms = Add("Mushrooms", "Gram", 4000, 1.25m, 30);
            var peppers = Add("Green Peppers", "Gram", 3000, 1.00m, 25);
            var onions = Add("Red Onions", "Gram", 3000, 0.75m, 25);
            var olives = Add("Black Olives", "Gram", 2000, 1.00m, 20);
            var pineapple = Add("Pineapple", "Gram", 3000, 1.25m, 30);
            var basil = Add("Fresh Basil", "Gram", 500, 0.75m, 3);
            var oregano = Add("Oregano", "Gram", 500);
            var oliveOil = Add("Olive Oil", "Milliliter", 2000);

            void Recipe(string name, decimal basePrice, bool isActive, params (Ingredient Ingredient, decimal Amount)[] items) =>
                context.Recipes.Add(new Recipe
                {
                    Name = name,
                    BasePrice = basePrice,
                    IsActive = isActive,
                    RecipeItems = [.. items.Select(i => new RecipeItem { Ingredient = i.Ingredient, Amount = i.Amount })],
                });

            (Ingredient, decimal)[] cheeseBase = [(dough, 250), (sauce, 90), (mozzarella, 120)];
            Recipe("Cheese", 9.99m, true, [.. cheeseBase, (oregano, 1)]);
            Recipe("Pepperoni", 11.99m, true, [.. cheeseBase, (pepperoni, 60)]);
            Recipe("Margherita", 11.49m, true, (dough, 250), (sauce, 90), (mozzarella, 100), (basil, 5), (oliveOil, 10));
            Recipe("Veggie", 12.49m, true, [.. cheeseBase, (mushrooms, 40), (peppers, 30), (onions, 30), (olives, 25)]);
            Recipe("Hawaiian", 12.49m, true, [.. cheeseBase, (ham, 50), (pineapple, 50)]);
            Recipe("Meat Lovers", 14.49m, true, [.. cheeseBase, (pepperoni, 40), (sausage, 50), (ham, 40)]);
            // Custom pizzas are this recipe plus toppings (order items require a recipe).
            Recipe("Build Your Own", 9.49m, true, [.. cheeseBase]);
            // Shows how retired items look in the admin screens.
            Recipe("Seasonal Pumpkin", 13.49m, false, [.. cheeseBase, (onions, 20)]);

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
