namespace PizzaShop.Api.Dtos
{
    // The signed-in user, for the web app to choose which screens to show.
    // Roles is empty for customers. Not a security boundary: the API enforces every rule itself.
    public record CurrentUserDto(
        string? Email,
        List<string> Roles) { }
}
