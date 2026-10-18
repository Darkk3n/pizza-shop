using System.Linq.Expressions;
using PizzaShop.Api.Models;

namespace PizzaShop.Api.Dtos
{
    public record PizzaSizeDto(Guid PizzaSizeId, string Name, decimal PriceMultiplier) { }

    public static class PizzaSizeMapper
    {
        public static readonly Expression<Func<PizzaSize, PizzaSizeDto>> ToDto = s => new PizzaSizeDto(s.PizzaSizeId, s.Name, s.PriceMultiplier);

        // Same mapping for entities already in memory (e.g. right after an insert);
        // compiled once so ToDto stays the single source of truth.
        private static readonly Func<PizzaSize, PizzaSizeDto> toDtoCompiled = ToDto.Compile();

        public static PizzaSizeDto FromEntity(PizzaSize size) => toDtoCompiled(size);
    }
}
