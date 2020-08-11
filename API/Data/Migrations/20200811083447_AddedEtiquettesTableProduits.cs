using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class AddedEtiquettesTableProduits : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Etiquette1",
                table: "Produits",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Etiquette2",
                table: "Produits",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Etiquette1",
                table: "Produits");

            migrationBuilder.DropColumn(
                name: "Etiquette2",
                table: "Produits");
        }
    }
}
