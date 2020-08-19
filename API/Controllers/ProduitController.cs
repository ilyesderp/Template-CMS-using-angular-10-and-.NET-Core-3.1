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
using Microsoft.EntityFrameworkCore;

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
                var files = content.Files;

                var subFolder = Path.Combine("images", "imagesProduitsServices");
                var folderName = Path.Combine("wwwroot", subFolder);
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);


                var produit = new Produit();

                if (files.Any(f => f.Length == 0))
                {
                    return BadRequest();
                }

                foreach (var file in files)
                {
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
                    else if (file.Name == "miniature")
                    {
                        produit.Miniature = dbPath;
                    }

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

                        produit.Etiquette1 = dbCategorieParente.Etiquette1;
                        produit.Etiquette2 = dbCategorieParente.Etiquette2;

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


        [HttpGet]
        public async Task<ActionResult<List<Produit>>> GetProducts()
        {
            var products = await _context.Produits.ToListAsync();

            return Ok(products);
        }


        [HttpGet("{titre}/{etiq1}/{etiq2}")]
        public async Task<ActionResult<List<Produit>>> GetOneProduct(string titre, string etiq1, string etiq2)
        {
            var dbProduct = await _context.Produits.Where(i => i.Titre.Equals(titre)).Where(i => i.Etiquette1.Equals(etiq1)).Where(i => i.Etiquette2.Equals(etiq2)).FirstOrDefaultAsync();

            //var products = await _context.Produits.ToListAsync();

            return Ok(dbProduct);
        }

    }
}
