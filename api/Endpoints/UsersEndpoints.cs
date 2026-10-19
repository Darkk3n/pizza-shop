using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PizzaShop.Api.Auth;
using PizzaShop.Api.Db;
using PizzaShop.Api.Dtos;
using PizzaShop.Api.Models;
using PizzaShop.Api.Requests;

namespace PizzaShop.Api.Endpoints
{
    // Accounts are created through /api/auth/register; admins only manage roles here.
    public static class UsersEndpoints
    {
        public static IEndpointRouteBuilder MapUsersEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/api/users")
                .WithTags("Users")
                .RequireAuthorization(Policies.Admin);

            group.MapGet("/", GetAll)
                .ProducesValidationProblem();
            group.MapPut("/{id:guid}/roles", UpdateRoles)
                .ProducesProblem(StatusCodes.Status409Conflict)
                .ProducesValidationProblem();

            return app;
        }

        // Query string: email (substring), page, pageSize. Plain parameters rather than an
        // [AsParameters] record: OpenAPI generation throws on validation attributes there.
        private static async Task<Ok<PagedResult<UserDto>>> GetAll(
            PizzaShopContext context,
            [MaxLength(256)] string? email,
            [Range(1, 100000)] int page = 1,
            [Range(1, 100)] int pageSize = 25,
            CancellationToken ct = default)
        {
            var users = context.Users.AsQueryable();

            // NormalizedEmail is upper-cased by Identity, so this matches case-insensitively.
            if (!string.IsNullOrWhiteSpace(email))
            {
                var normalized = email.Trim().ToUpperInvariant();
                users = users.Where(u => u.NormalizedEmail!.Contains(normalized));
            }

            var totalCount = await users.CountAsync(ct);
            var items = await users
                .OrderBy(u => u.NormalizedEmail)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(u => new UserDto(
                    u.Id,
                    u.Email,
                    context.UserRoles
                        .Where(ur => ur.UserId == u.Id)
                        .Join(context.Roles, ur => ur.RoleId, r => r.Id, (ur, r) => r.Name!)
                        .OrderBy(name => name)
                        .ToList()))
                .ToListAsync(ct);

            return TypedResults.Ok(new PagedResult<UserDto>(items, page, pageSize, totalCount));
        }

        // New roles reach the user's token on their next /api/auth/refresh (at most one
        // access-token lifetime later), which rebuilds the claims from the database.
        private static async Task<Results<Ok<UserDto>, NotFound, ValidationProblem, ProblemHttpResult>> UpdateRoles(Guid id, UpdateUserRolesRequest request, UserManager<AppUser> userManager)
        {
            var unknown = request.Roles.Except(Roles.All).ToList();
            if (unknown.Count > 0)
            {
                return TypedResults.ValidationProblem(new Dictionary<string, string[]>
                {
                    [nameof(UpdateUserRolesRequest.Roles)] = [$"Unknown roles: {string.Join(", ", unknown)}. Valid roles: {string.Join(", ", Roles.All)}."],
                });
            }

            var user = await userManager.FindByIdAsync(id.ToString());
            if (user is null)
            {
                return TypedResults.NotFound();
            }

            var requested = request.Roles.Distinct().ToList();
            var current = await userManager.GetRolesAsync(user);

            // Without an admin nobody could manage catalogs or roles again (short of the bootstrap seed).
            var losesAdmin = current.Contains(Roles.Admin) && !requested.Contains(Roles.Admin);
            if (losesAdmin && (await userManager.GetUsersInRoleAsync(Roles.Admin)).Count == 1)
            {
                return TypedResults.Problem(
                    statusCode: StatusCodes.Status409Conflict,
                    title: "Last admin.",
                    detail: $"'{user.Email}' is the only admin; promote another user to Admin first.");
            }

            ThrowIfFailed(await userManager.RemoveFromRolesAsync(user, current.Except(requested)));
            ThrowIfFailed(await userManager.AddToRolesAsync(user, requested.Except(current)));

            return TypedResults.Ok(new UserDto(user.Id, user.Email, [.. requested.Order()]));
        }

        // Role names are validated above, so a failure here is unexpected: let it surface as a 500.
        private static void ThrowIfFailed(IdentityResult result)
        {
            if (!result.Succeeded)
            {
                throw new InvalidOperationException(string.Join(" ", result.Errors.Select(e => e.Description)));
            }
        }
    }
}
