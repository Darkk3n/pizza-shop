using System.Linq.Expressions;
using PizzaShop.Api.Models;

namespace PizzaShop.Api.Dtos
{
    public record UnitOfMeasureDto(Guid UnitOfMeasureId, string Name) { }

    public static class UnitOfMeasureMapper
    {
        public static readonly Expression<Func<UnitOfMeasure, UnitOfMeasureDto>> ToDto = u => new UnitOfMeasureDto(u.UnitOfMeasureId, u.Name);
    }
}