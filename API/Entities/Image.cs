﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Image
    {
        public int Id { get; set; }

        //public string Name { get; set; }

        public string ImagePath { get; set; }


        public string Device { get; set; }
    }
}
