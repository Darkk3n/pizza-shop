using Microsoft.AspNetCore.Identity;

namespace PizzaShop.Api.Models
{
    // A signed-in user with no role is a customer; Admin and Staff are stored roles (see Auth/Roles.cs).
    public class AppUser : IdentityUser<Guid>
    {
    }
}
