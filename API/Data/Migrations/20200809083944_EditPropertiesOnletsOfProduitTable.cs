using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class EditPropertiesOnletsOfProduitTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Onglet1",
                table: "Produits",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Onglet2",
                table: "Produits",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Onglet3",
                table: "Produits",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Onglet4",
                table: "Produits",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Onglet1",
                table: "Produits");

            migrationBuilder.DropColumn(
                name: "Onglet2",
                table: "Produits");

            migrationBuilder.DropColumn(
                name: "Onglet3",
                table: "Produits");

            migrationBuilder.DropColumn(
                name: "Onglet4",
                table: "Produits");
        }
    }
}
