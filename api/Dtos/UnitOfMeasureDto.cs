using System.Linq.Expressions;
using PizzaShop.Api.Models;

namespace PizzaShop.Api.Dtos
{
    public record UnitOfMeasureDto(Guid UnitOfMeasureId, string Name) { }

    public static class UnitOfMeasureMapper
    {
        public static readonly Expression<Func<UnitOfMeasure, UnitOfMeasureDto>> ToDto = u => new UnitOfMeasureDto(u.UnitOfMeasureId, u.Name);

        // Same mapping for entities already in memory (e.g. right after an insert);
        // compiled once so ToDto stays the single source of truth.
        private static readonly Func<UnitOfMeasure, UnitOfMeasureDto> toDtoCompiled = ToDto.Compile();

        public static UnitOfMeasureDto FromEntity(UnitOfMeasure unit) => toDtoCompiled(unit);
    }
}