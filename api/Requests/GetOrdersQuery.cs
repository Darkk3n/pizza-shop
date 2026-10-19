using System.ComponentModel.DataAnnotations;
using PizzaShop.Api.Models;

namespace PizzaShop.Api.Requests
{
    // Query string for GET /api/orders, bound with [AsParameters].
    // From is inclusive and To exclusive, both compared against CreatedAt.
    public record GetOrdersQuery(
        OrderStatus? Status,
        DateTimeOffset? From,
        DateTimeOffset? To,
        [Range(1, 100000)] int Page = 1,
        [Range(1, 100)] int PageSize = 25);
}
