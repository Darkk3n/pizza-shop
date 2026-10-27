using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PizzaShop.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddPizzaSizeIsActive : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "PizzaSizes",
                type: "boolean",
                nullable: false,
                defaultValue: true);

            migrationBuilder.UpdateData(
                table: "PizzaSizes",
                keyColumn: "PizzaSizeId",
                keyValue: new Guid("6818c0cd-1560-4a1a-8e57-3c870284a646"),
                column: "IsActive",
                value: true);

            migrationBuilder.UpdateData(
                table: "PizzaSizes",
                keyColumn: "PizzaSizeId",
                keyValue: new Guid("8a5ab672-b4da-48fc-876b-4ca5b87754ee"),
                column: "IsActive",
                value: true);

            migrationBuilder.UpdateData(
                table: "PizzaSizes",
                keyColumn: "PizzaSizeId",
                keyValue: new Guid("dd64f6fa-4a2d-4e4d-aa26-ba77dcd3c496"),
                column: "IsActive",
                value: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "PizzaSizes");
        }
    }
}
