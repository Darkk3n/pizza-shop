namespace PizzaShop.Api.Dtos
{
    // What signed-out visitors see: active items only, with names and prices but no IDs of
    // ingredients, recipe amounts or stock. RecipeId is kept so the menu can link to the builder.
    public record PublicMenuDto(
        List<PublicRecipeDto> Recipes,
        List<PublicSizeDto> Sizes,
        List<PublicToppingDto> Toppings,
        List<Guid> PopularRecipeIds) { }

    public record PublicRecipeDto(Guid RecipeId, string Name, decimal BasePrice, List<string> Ingredients) { }

    public record PublicSizeDto(string Name, decimal PriceMultiplier) { }

    public record PublicToppingDto(string Name, decimal Price) { }
}
