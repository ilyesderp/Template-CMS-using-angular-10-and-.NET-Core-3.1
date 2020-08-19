using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class EditTableProduits : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AutreProduits",
                table: "Produits",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "JenProfite",
                table: "Produits",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AutreProduits",
                table: "Produits");

            migrationBuilder.DropColumn(
                name: "JenProfite",
                table: "Produits");
        }
    }
}
