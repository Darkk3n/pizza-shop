namespace PizzaShop.Api.Dtos
{
    // Every statistics response echoes the resolved range (local dates, both inclusive) and the
    // time zone they're in, so a client that sent no dates can show which days it got.

    // Non-cancelled orders: a sale is counted when the order is placed.
    public record SalesTotalsDto(int OrderCount, decimal SubTotal, decimal Tax, decimal Total, decimal AverageOrderValue) { }

    // Rate = cancelled orders / all orders placed in the range (0..1, four decimals).
    public record CancelledSummaryDto(int OrderCount, decimal Total, decimal Rate) { }

    public record SalesDayDto(DateOnly Date, int OrderCount, decimal Total, int CancelledCount, decimal CancelledTotal) { }

    public record SalesStatisticsDto(
        DateOnly From,
        DateOnly To,
        string TimeZone,
        SalesTotalsDto Totals,
        CancelledSummaryDto Cancelled,
        List<SalesDayDto> Days) { }

    // Revenue is the sum of the line totals, so it includes the toppings on those pizzas.
    public record TopRecipeDto(Guid RecipeId, string Name, int Quantity, decimal Revenue) { }

    // TimesPicked counts pizzas (item quantity), so 2 Large with olives = 2.
    public record TopToppingDto(Guid IngredientId, string Name, int TimesPicked, decimal Revenue) { }

    public record ItemStatisticsDto(
        DateOnly From,
        DateOnly To,
        string TimeZone,
        List<TopRecipeDto> Recipes,
        List<TopToppingDto> Toppings) { }

    // Staff = cancelled by a user who has a role now (Staff or Admin); customer = no role.
    public record CancellationsByRoleDto(int Customer, int Staff) { }

    public record CancelledOrderDto(
        Guid OrderId,
        int OrderNumber,
        DateTimeOffset? CancelledAt,
        string? CancelledByEmail,
        string? Reason,
        decimal Total) { }

    public record CancellationStatisticsDto(
        DateOnly From,
        DateOnly To,
        string TimeZone,
        CancelledSummaryDto Summary,
        CancellationsByRoleDto ByRole,
        List<CancelledOrderDto> Recent) { }

    // Used = what non-cancelled orders deducted (cancellations returned theirs).
    public record IngredientUsageDto(Guid IngredientId, string Name, string UnitOfMeasureName, decimal Used, decimal CurrentStock) { }

    public record IngredientUsageStatisticsDto(
        DateOnly From,
        DateOnly To,
        string TimeZone,
        List<IngredientUsageDto> Ingredients) { }
}
