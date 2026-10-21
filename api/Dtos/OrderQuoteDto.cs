using PizzaShop.Api.Models;
using PizzaShop.Api.Orders;

namespace PizzaShop.Api.Dtos
{
    // Prices an order would get right now. Nothing is saved and no stock is touched, so a later
    // order can differ if the menu changes in between; the order's own prices are authoritative.
    public record OrderQuoteDto(
        List<OrderQuoteItemDto> Items,
        decimal SubTotal,
        decimal Tax,
        decimal Total) { }

    public record OrderQuoteItemDto(
        Guid RecipeId,
        Guid? PizzaSizeId,
        string ItemNameSnapshot,
        int Quantity,
        decimal UnitPrice,
        decimal LineTotal,
        List<OrderQuoteToppingDto> Toppings) { }

    public record OrderQuoteToppingDto(
        Guid IngredientId,
        string IngredientName,
        ToppingCoverage Coverage,
        ToppingAmount ExtraAmount,
        decimal PriceAdjustment) { }

    public static class OrderQuoteMapper
    {
        public static OrderQuoteDto FromPriced(PricedOrder priced, IReadOnlyDictionary<Guid, Ingredient> toppingIngredients) =>
            new(
                [.. priced.Items.Select(i => new OrderQuoteItemDto(
                    i.RecipeId!.Value,
                    i.PizzaSizeId,
                    i.ItemNameSnapshot,
                    i.Quantity,
                    i.UnitPrice,
                    i.LineTotal,
                    [.. i.Toppings.Select(t => new OrderQuoteToppingDto(
                        t.IngredientId,
                        toppingIngredients[t.IngredientId].Name,
                        t.Coverage,
                        t.ExtraAmount,
                        t.PriceAdjustment))]))],
                priced.SubTotal,
                priced.Tax,
                priced.Total);
    }
}
