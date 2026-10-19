using System.ComponentModel.DataAnnotations;

namespace PizzaShop.Api.Requests
{
    // Replaces the user's roles. Each must be one of Auth.Roles; an empty list makes them a customer.
    public record UpdateUserRolesRequest([Required] List<string> Roles);
}
