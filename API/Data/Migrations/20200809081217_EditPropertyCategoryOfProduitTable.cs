using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class EditPropertyCategoryOfProduitTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Ctegorie",
                table: "Produits");

            migrationBuilder.AddColumn<string>(
                name: "Categorie",
                table: "Produits",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Categorie",
                table: "Produits");

            migrationBuilder.AddColumn<string>(
                name: "Ctegorie",
                table: "Produits",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
