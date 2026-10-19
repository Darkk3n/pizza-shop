namespace PizzaShop.Api.Auth
{
    // Stored Identity roles (seeded in PizzaShopContext). Customer isn't a role:
    // it's any signed-in user without one of these, so every sign-up is a customer.
    public static class Roles
    {
        public const string Admin = "Admin";
        public const string Staff = "Staff";

        public static readonly IReadOnlyList<string> All = [Admin, Staff];
    }
}
