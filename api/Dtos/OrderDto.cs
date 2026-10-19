using System.Linq.Expressions;
using PizzaShop.Api.Models;

namespace PizzaShop.Api.Dtos
{
    public record OrderDto(
        Guid OrderId,
        int OrderNumber,
        OrderStatus Status,
        OrderType OrderType,
        decimal SubTotal,
        decimal Tax,
        decimal Total,
        DateTimeOffset CreatedAt,
        string? PlacedByEmail,
        List<OrderItemDto> Items) { }

    public record OrderItemDto(
        Guid OrderItemId,
        Guid? RecipeId,
        Guid? PizzaSizeId,
        string ItemNameSnapshot,
        int Quantity,
        decimal UnitPrice,
        decimal LineTotal,
        List<OrderItemToppingDto> Toppings) { }

    public record OrderItemToppingDto(
        Guid OrderItemToppingId,
        Guid IngredientId,
        string IngredientName,
        ToppingCoverage Coverage,
        ToppingAmount ExtraAmount,
        decimal PriceAdjustment) { }

    // List view: totals only, without items.
    public record OrderSummaryDto(
        Guid OrderId,
        int OrderNumber,
        OrderStatus Status,
        OrderType OrderType,
        decimal SubTotal,
        decimal Tax,
        decimal Total,
        DateTimeOffset CreatedAt,
        string? PlacedByEmail,
        int ItemCount) { }

    public record PagedResult<T>(List<T> Items, int Page, int PageSize, int TotalCount) { }

    public static class OrderMapper
    {
        public static readonly Expression<Func<Order, OrderDto>> ToDto = o => new OrderDto(
            o.OrderId,
            o.OrderNumber,
            o.Status,
            o.OrderType,
            o.SubTotal,
            o.Tax,
            o.Total,
            o.CreatedAt,
            o.PlacedBy.Email,
            o.Items
                .OrderBy(i => i.ItemNameSnapshot)
                .Select(i => new OrderItemDto(
                    i.OrderItemId,
                    i.RecipeId,
                    i.PizzaSizeId,
                    i.ItemNameSnapshot,
                    i.Quantity,
                    i.UnitPrice,
                    i.LineTotal,
                    i.Toppings
                        .OrderBy(t => t.Ingredient.Name)
                        .Select(t => new OrderItemToppingDto(
                            t.OrderItemToppingId,
                            t.IngredientId,
                            t.Ingredient.Name,
                            t.Coverage,
                            t.ExtraAmount,
                            t.PriceAdjustment))
                        .ToList()))
                .ToList());

        public static readonly Expression<Func<Order, OrderSummaryDto>> ToSummaryDto = o => new OrderSummaryDto(
            o.OrderId,
            o.OrderNumber,
            o.Status,
            o.OrderType,
            o.SubTotal,
            o.Tax,
            o.Total,
            o.CreatedAt,
            o.PlacedBy.Email,
            o.Items.Sum(i => i.Quantity));
    }
}
