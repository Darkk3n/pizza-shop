using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PizzaShop.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddRecipeItemUniqueIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_RecipeItems_RecipeId",
                table: "RecipeItems");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeItems_RecipeId_IngredientId",
                table: "RecipeItems",
                columns: new[] { "RecipeId", "IngredientId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_RecipeItems_RecipeId_IngredientId",
                table: "RecipeItems");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeItems_RecipeId",
                table: "RecipeItems",
                column: "RecipeId");
        }
    }
}
