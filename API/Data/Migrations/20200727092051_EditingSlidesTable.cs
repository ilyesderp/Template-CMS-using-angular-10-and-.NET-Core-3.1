using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class EditingSlidesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageText",
                table: "Slides",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "PosX",
                table: "Slides",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "PosY",
                table: "Slides",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageText",
                table: "Slides");

            migrationBuilder.DropColumn(
                name: "PosX",
                table: "Slides");

            migrationBuilder.DropColumn(
                name: "PosY",
                table: "Slides");
        }
    }
}
