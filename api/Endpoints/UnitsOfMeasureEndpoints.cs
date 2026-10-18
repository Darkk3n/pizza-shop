using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using PizzaShop.Api.Db;
using PizzaShop.Api.Dtos;
using PizzaShop.Api.Models;
using PizzaShop.Api.Requests;

namespace PizzaShop.Api.Endpoints
{
    public static class UnitsOfMeasureEndpoints
    {
        private const string GetByIdRouteName = "GetUnitOfMeasureById";

        public static IEndpointRouteBuilder MapUnitsOfMeasureEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/api/units-of-measure")
                .WithTags("UnitsOfMeasure");

            group.MapGet("/", GetAll);
            group.MapGet("/{id:guid}", GetById)
                .WithName(GetByIdRouteName);
            group.MapPost("/", Create)
                .ProducesProblem(StatusCodes.Status409Conflict)
                .ProducesValidationProblem();
            group.MapPut("/{id:guid}", Update)
                .ProducesProblem(StatusCodes.Status409Conflict)
                .ProducesValidationProblem();
            group.MapDelete("/{id:guid}", Delete)
                .ProducesProblem(StatusCodes.Status409Conflict);

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

        private static async Task<Results<Ok<UnitOfMeasureDto>, NotFound>> GetById(Guid id, PizzaShopContext context, CancellationToken ct)
        {
            var unitOfMeasure = await context.UnitsOfMeasure
                .Where(uom => uom.UnitOfMeasureId == id)
                .Select(UnitOfMeasureMapper.ToDto)
                .FirstOrDefaultAsync(ct);
            return unitOfMeasure is null ? TypedResults.NotFound() : TypedResults.Ok(unitOfMeasure);
        }

        private static async Task<Results<CreatedAtRoute<UnitOfMeasureDto>, ProblemHttpResult>> Create(CreateUnitOfMeasureRequest request, PizzaShopContext context, CancellationToken ct)
        {
            var name = request.Name.Trim();

            if (await NameTakenAsync(context, name, excludeId: null, ct))
            {
                return DuplicateName(name);
            }

            var unitOfMeasure = new UnitOfMeasure { Name = name };
            context.UnitsOfMeasure.Add(unitOfMeasure);
            await context.SaveChangesAsync(ct);

            return TypedResults.CreatedAtRoute(
                UnitOfMeasureMapper.FromEntity(unitOfMeasure),
                GetByIdRouteName,
                new { id = unitOfMeasure.UnitOfMeasureId });
        }

        private static async Task<Results<Ok<UnitOfMeasureDto>, NotFound, ProblemHttpResult>> Update(Guid id, UpdateUnitOfMeasureRequest request, PizzaShopContext context, CancellationToken ct)
        {
            var unitOfMeasure = await context.UnitsOfMeasure.FindAsync([id], ct);
            if (unitOfMeasure is null)
            {
                return TypedResults.NotFound();
            }

            var name = request.Name.Trim();

            if (await NameTakenAsync(context, name, excludeId: id, ct))
            {
                return DuplicateName(name);
            }

            unitOfMeasure.Name = name;
            await context.SaveChangesAsync(ct);

            return TypedResults.Ok(UnitOfMeasureMapper.FromEntity(unitOfMeasure));
        }

        private static async Task<Results<NoContent, NotFound, ProblemHttpResult>> Delete(Guid id, PizzaShopContext context, CancellationToken ct)
        {
            var unitOfMeasure = await context.UnitsOfMeasure.FindAsync([id], ct);
            if (unitOfMeasure is null)
            {
                return TypedResults.NotFound();
            }

            // The Ingredient -> UnitOfMeasure FK is Restrict, so check up front for a clear 409
            // instead of surfacing a database exception.
            var inUse = await context.Ingredients.AnyAsync(i => i.UnitOfMeasureId == id, ct);
            if (inUse)
            {
                return TypedResults.Problem(
                    statusCode: StatusCodes.Status409Conflict,
                    title: "Unit of measure is in use.",
                    detail: $"The unit of measure '{unitOfMeasure.Name}' is used by one or more ingredients.");
            }

            context.UnitsOfMeasure.Remove(unitOfMeasure);
            await context.SaveChangesAsync(ct);

            return TypedResults.NoContent();
        }

        // Case-insensitive via ToLower(), which EF Core translates to SQL lower();
        // string.Equals with a StringComparison has no SQL translation.
        private static Task<bool> NameTakenAsync(PizzaShopContext context, string name, Guid? excludeId, CancellationToken ct)
        {
            var lowered = name.ToLower();
            return context.UnitsOfMeasure
                .AnyAsync(uom => uom.Name.ToLower() == lowered && uom.UnitOfMeasureId != excludeId, ct);
        }

        private static ProblemHttpResult DuplicateName(string name) =>
            TypedResults.Problem(
                statusCode: StatusCodes.Status409Conflict,
                title: "Unit of measure already exists.",
                detail: $"A unit of measure named '{name}' already exists.");
    }
}
