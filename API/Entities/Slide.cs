using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Slide
    {

        public int Id { get; set; }
        
    
        public string SlideNumber { get; set; }

        public string Path { get; set; }
    }
}
