using API.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
        }

        public DbSet<Image> Images { get; set; }

        public DbSet<Slide> Slides { get; set; }

        public DbSet<ImageText> ImageTexts { get; set; }

        public DbSet<YoutubeLink> YoutubeLinks { get; set; }

        public DbSet<CustomImage> CustomImages { get; set; }

        public DbSet<ChoixPopup> ChoixPopups { get; set; }

    }
}
