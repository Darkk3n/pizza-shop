namespace PizzaShop.Api.Models
{
    // Stored as strings (see PizzaShopContext.ConfigureConventions), so member
    // names are the database values: renaming a member requires a data migration.

    // Declared in workflow order: status changes may only move to a later member.
    public enum OrderStatus
    {
        Pending,
        Preparing,
        Ready,
        Completed,
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
