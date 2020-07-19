using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public class ImagesDevicesRequestFormat
    {
        public List<IFormFile> Images { get; set; }
        public string Device { get; set; }
    }
}
