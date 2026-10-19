namespace PizzaShop.Api.Auth
{
    // Authorization policy names, registered in AuthExtensions.AddPizzaShopAuth.
    public static class Policies
    {
        // Catalog management, users, statistics.
        public const string Admin = "Admin";

        // All orders, order status, stock adjustments. Admins pass too.
        public const string Staff = "Staff";
    }
}
