using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Produit
    {
        public int Id { get; set; }

        public string Titre { get; set; }

        public string Entete { get; set; }

        public string Miniature { get; set; }

        public string Categorie { get; set; }

        public string Onglet1 { get; set; }

        public string Onglet2 { get; set; }

        public string Onglet3 { get; set; }

        public string Onglet4 { get; set; }

        public string Etiquette1 { get; set; }

        public string Etiquette2 { get; set; }

        public string State { get; set; }
    }
}
