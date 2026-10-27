using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PizzaShop.Api.Migrations
{
    /// <inheritdoc />
    public partial class ConfirmExistingUserEmails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Sign-in now requires a confirmed email (Auth:RequireConfirmedEmail). Accounts created
            // before there was an email sender could never have confirmed, so they're trusted as is
            // rather than locked out. New accounts confirm through the emailed link.
            migrationBuilder.Sql("""UPDATE "AspNetUsers" SET "EmailConfirmed" = TRUE WHERE NOT "EmailConfirmed";""");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Nothing to undo: which accounts were unconfirmed before isn't recorded, and marking
            // them unconfirmed again would lock them out.
        }
    }
}
