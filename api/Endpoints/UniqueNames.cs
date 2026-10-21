using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using PizzaShop.Api.Models;

namespace PizzaShop.Api.Endpoints
{
    public static class UniqueNames
    {
        // Case-insensitive via ToLower(), which EF Core translates to SQL lower();
        // string.Equals with a StringComparison has no SQL translation. The key is read from the
        // EF model so each entity's own Guid PK (RecipeId, IngredientId, ...) can be excluded.
        public static Task<bool> NameTakenAsync<T>(this DbSet<T> set, string name, Guid? excludeId, CancellationToken ct)
            where T : class, INamedEntity
        {
            var keyName = set.EntityType.FindPrimaryKey()!.Properties.Single().Name;
            var lowered = name.ToLower();
            return set.AnyAsync(e => e.Name.ToLower() == lowered && EF.Property<Guid>(e, keyName) != excludeId, ct);
        }

        // resource is the display name, e.g. "Pizza size".
        public static ProblemHttpResult DuplicateName(string resource, string name) =>
            TypedResults.Problem(
                statusCode: StatusCodes.Status409Conflict,
                title: $"{resource} already exists.",
                detail: $"{resource} '{name}' already exists.");
    }
}
