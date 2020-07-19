using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public class ImageTextRequestFormat
    {
        public List<IFormFile> Image { get; set; }

        public string NumSlide { get; set; }

        public double PosX { get; set; }

        public double PosY { get; set; }

        public string Device { get; set; }
    }
}
