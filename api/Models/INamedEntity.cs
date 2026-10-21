namespace PizzaShop.Api.Models
{
    // Catalog entities whose Name must be unique (case-insensitive); see UniqueNames.
    public interface INamedEntity
    {
        string Name { get; }
    }
}
