using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PizzaShop.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddOrdersCancelledAtIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Orders_CancelledAt",
                table: "Orders",
                column: "CancelledAt");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Orders_CancelledAt",
                table: "Orders");
        }
    }
}
