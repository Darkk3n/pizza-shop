namespace PizzaShop.Api.Dtos
{
    // Roles is empty for customers.
    public record UserDto(
        Guid UserId,
        string? Email,
        List<string> Roles) { }
}
