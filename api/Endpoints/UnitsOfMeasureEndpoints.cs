using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using PizzaShop.Api.Db;
using PizzaShop.Api.Dtos;

namespace PizzaShop.Api.Endpoints
{
    public static class UnitsOfMeasureEndpoints
    {
        public static IEndpointRouteBuilder MapUnitsOfMeasureEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/api/units-of-measure")
                .WithTags("UnitsOfMeasure");

            group.MapGet("/", GetAll);

            return app;
        }

        private static async Task<Ok<List<UnitOfMeasureDto>>> GetAll(PizzaShopContext context, CancellationToken ct)
        {
            var unitsOfMeasure = await context.UnitsOfMeasure
                .OrderBy(uom => uom.Name)
                .Select(UnitOfMeasureMapper.ToDto)
                .ToListAsync(ct);
            return TypedResults.Ok(unitsOfMeasure);
        }
    }
}
