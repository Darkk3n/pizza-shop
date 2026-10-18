using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using PizzaShop.Api.Db;
using PizzaShop.Api.Dtos;
using PizzaShop.Api.Models;

namespace PizzaShop.Api.Endpoints
{
    public static class UnitsOfMeasureEndpoints
    {
        public static IEndpointRouteBuilder MapUnitsOfMeasureEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/api/units-of-measure")
                .WithTags("UnitsOfMeasure");

            group.MapGet("/", GetAll);
            group.MapPost("/", Create)
                .ProducesProblem(StatusCodes.Status409Conflict)
                .ProducesValidationProblem();

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

        private static async Task<Results<Created<UnitOfMeasureDto>, ProblemHttpResult>> Create(CreateUnitOfMeasureRequest request, PizzaShopContext context, CancellationToken ct)
        {
            var name = request.Name.Trim();

            var exists = await context.UnitsOfMeasure
                .AnyAsync(uom => uom.Name.Equals(name, StringComparison.CurrentCultureIgnoreCase), ct);
            if (exists)
            {
                return TypedResults.Problem(
                    statusCode: StatusCodes.Status409Conflict,
                    title: "Unit of measure already exists.",
                    detail: $"A unit of measure named '{name}' already exists.");
            }

            var unitOfMeasure = new UnitOfMeasure { Name = name };
            context.UnitsOfMeasure.Add(unitOfMeasure);
            await context.SaveChangesAsync(ct);

            return TypedResults.Created((string?)null, UnitOfMeasureMapper.FromEntity(unitOfMeasure));
        }
    }
}
