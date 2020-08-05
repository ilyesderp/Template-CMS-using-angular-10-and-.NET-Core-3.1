using API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data.Requests
{
    public class EditCategorieChildrenRequestformat
    {
        public Categorie categorie { get; set; }

        public string titreParent { get; set; }
    }
}
