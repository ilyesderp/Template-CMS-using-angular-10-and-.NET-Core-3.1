using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProduitController : ControllerBase
    {
        private readonly StoreContext _context;

        public ProduitController(StoreContext context)
        {
            _context = context;
        }

        [HttpPost, DisableRequestSizeLimit]
        public IActionResult CreateProduct()
        {
            var content = Request.Form;
            try
            {
                var file = content.Files[0];

                var subFolder = Path.Combine("images", "imagesProduitsServices");
                var folderName = Path.Combine("wwwroot", subFolder);
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);


                var produit = new Produit();

                if (file == null)
                {
                    return BadRequest();
                }

                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);



                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    if (file.Name == "entete")
                    {
                        produit.Entete = dbPath;
                    }

                

                var dbProduit = _context.Produits.Where(c => c.Titre.Equals(content["titre"])).Where(c => c.Categorie.Equals(content["categorieParente"])).FirstOrDefault();


                if (dbProduit == null)
                {
                    produit.Titre = content["titre"];
                    produit.Categorie = content["categorieParente"];
                    produit.State = content["state"];


                    produit.Onglet1 = content["onglet1"];
                    produit.Onglet2 = content["onglet2"];
                    produit.Onglet3 = content["onglet3"];
                    produit.Onglet4 = content["onglet4"];


                    var dbCategorieParente = _context.Categories.FirstOrDefault(x => x.Titre == produit.Categorie);
                    if (dbCategorieParente != null)
                    {
                        dbCategorieParente.Produits = dbCategorieParente.Produits + ";" + content["titre"];

                    }

                    _context.Add(produit);
                    _context.SaveChanges();





                    return Ok("Donées de catégorie envoyées avec succès!");
                }
                else
                {
                    return Ok("exists");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur serveur interne: {ex}");
            }
        }

    }
}
