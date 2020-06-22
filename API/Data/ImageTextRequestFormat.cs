using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public class ImageTextRequestFormat
    {
        public string Image { get; set; }

        public string NumSlide { get; set; }
    }
}
