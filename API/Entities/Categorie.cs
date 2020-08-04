using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Categorie
    {

        public int Id { get; set; }

        public string Titre { get; set; }

        public string Entete { get; set; }

        public string Parent { get; set; }

        public string Children { get; set; }

        public string Etiquette1 { get; set; }

        public string Etiquette2 { get; set; }

        public string Miniature { get; set; }
    }
}
