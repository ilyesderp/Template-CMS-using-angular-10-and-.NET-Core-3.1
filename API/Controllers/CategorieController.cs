using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using API.Data;
using API.Data.Requests;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategorieController : ControllerBase
    {

        private readonly StoreContext _context;

        public CategorieController(StoreContext context)
        {
            _context = context;
        }

        [HttpPost, DisableRequestSizeLimit]
        public IActionResult SaveCategory()
        {
            var content = Request.Form;
            try
            {
                var files = content.Files;

                var subFolder = Path.Combine("images", "imagesProduitsServices");
                var folderName = Path.Combine("wwwroot", subFolder);
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);


                var categorie = new Categorie();


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

                    if(file.Name == "entete")
                    {
                        categorie.Entete = dbPath;
                    }
                    else if(file.Name == "miniature")
                    {
                        categorie.Miniature = dbPath;
                    }


                }

                var dbCategorie = _context.Categories.Where(c => c.Titre.Equals(content["titre"]))
                                    .Where(c => c.Etiquette1.Equals(content["etiquette1"]))
                                    .Where(c => c.Etiquette2.Equals(content["etiquette2"]))
                                    .FirstOrDefault();


                if(dbCategorie == null)
                {
                    categorie.Titre = content["titre"];
                    categorie.Etiquette1 = content["etiquette1"];
                    categorie.Etiquette2 = content["etiquette2"];
                    categorie.Parent = content["categorieParente"];
                    categorie.Children = "";
                    categorie.State = content["state"];

                    var dbCategorieParente = _context.Categories.FirstOrDefault(x => x.Titre == categorie.Parent);
                    if (dbCategorieParente != null)
                    {
                        dbCategorieParente.Children = dbCategorieParente.Children + ";" + content["titre"];

                    }

                    _context.Add(categorie);
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
        public async Task<ActionResult<List<Categorie>>> GetCategories()
        {
            var categories = await _context.Categories.ToListAsync(); 
            
            return Ok(categories);
        }

        /*[HttpPatch]
        public IActionResult SetChildCategory([FromBody] EditCategorieChildrenRequestformat request)
        {
            var dbCategorie = _context.Categories.FirstOrDefault(c => c.Titre == request.categorie.Titre);
            var dbCategorieParente = _context.Categories.FirstOrDefault(c => c.Titre == request.titreParent);

            var children = "";

            if(dbCategorie != null && dbCategorieParente != null)
            {
                //children = dbCategorie.Children.Concat(categorie.Titre);
                children = dbCategorieParente.Children + ";" + dbCategorie.Titre;
                dbCategorieParente.Children = children;
                _context.SaveChanges();
            }

            return Ok("Catégorie parente modifiée avec succès!");
        }*/

    }
}
