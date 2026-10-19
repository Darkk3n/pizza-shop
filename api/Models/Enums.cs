namespace PizzaShop.Api.Models
{
    // Stored as strings (see PizzaShopContext.ConfigureConventions), so member
    // names are the database values: renaming a member requires a data migration.

    // Pending..Completed are declared in workflow order: status changes may only move to a
    // later member. Cancelled is terminal and outside that flow: it is only reached through
    // POST /api/orders/{id}/cancel, which also returns the order's stock.
    public enum OrderStatus
    {
        Pending,
        Preparing,
        Ready,
        Completed,
        Cancelled,
    }

    public enum OrderType
    {
        DineIn,
        Takeout,
        Delivery,
    }

    public enum ToppingCoverage
    {
        Whole,
        LeftHalf,
        RightHalf,
    }

    public enum ToppingAmount
    {
        // First member is the default for new toppings.
        Standard,
        Light,
        Extra,
    }
}
