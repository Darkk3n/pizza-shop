using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PizzaShop.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddIngredientToppingFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "ToppingPortion",
                table: "Ingredients",
                type: "numeric(10,4)",
                precision: 10,
                scale: 4,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ToppingPrice",
                table: "Ingredients",
                type: "numeric(10,2)",
                precision: 10,
                scale: 2,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ToppingPortion",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "ToppingPrice",
                table: "Ingredients");
        }
    }
}
