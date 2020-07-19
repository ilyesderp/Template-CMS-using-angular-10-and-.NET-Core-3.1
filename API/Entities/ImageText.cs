using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class ImageText
    {
        public int Id { get; set; }

        //public string Name { get; set; }

        public string ImageTextPath { get; set; }

        public string SlideName { get; set; }

        public double PositionX { get; set; }

        public double PositionY { get; set; }

        public string Device { get; set; }
    }
}
