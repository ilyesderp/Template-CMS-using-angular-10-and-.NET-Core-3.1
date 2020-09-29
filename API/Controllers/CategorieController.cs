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
                    categorie.Produits = "";
                    categorie.State = content["state"];

                    var dbCategorieParente = _context.Categories.FirstOrDefault(x => x.Titre == categorie.Parent && x.Etiquette1 == categorie.Etiquette1 && x.Etiquette2 == categorie.Etiquette2);
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





        [HttpPatch, DisableRequestSizeLimit]
        public async Task<IActionResult> EditCategory()
        {
            var content = Request.Form;
            try
            {
                var files = content.Files;

                var subFolder = Path.Combine("images", "imagesProduitsServices");
                var folderName = Path.Combine("wwwroot", subFolder);
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);


                var enteteGlobal = "";
                var minatureGlobal = "";



                if (!files.Any(f => f.Length == 0))
                {
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
                            enteteGlobal = dbPath;
                        }
                        else if (file.Name == "miniature")
                        {
                            minatureGlobal = dbPath;
                        }

                    }
                    //return BadRequest();
                }

                

                int id;
                Int32.TryParse(content["id"], out id);

                var categorie = await _context.Categories.FindAsync(id);


                if (categorie != null)
                {
                    var dbCategorieParente = await _context.Categories.FirstOrDefaultAsync(x => x.Titre == categorie.Parent && x.Etiquette1 == categorie.Etiquette1 && x.Etiquette2 == categorie.Etiquette2);
                    if (dbCategorieParente == null)
                    {
                        categorie.Titre = content["titre"];
                        if(enteteGlobal != "")
                            categorie.Entete = enteteGlobal;
                        if(minatureGlobal != "")
                            categorie.Miniature = minatureGlobal;
                        categorie.State = content["state"];
                    }
                    else
                    {
                        //modif du titre et children du parent car il sera affecté:
                        dbCategorieParente.Children.Replace(";" + categorie.Titre, content["titre"]);

                        //_context.Update(dbCategorieParente);
                        //await _context.SaveChangesAsync();

                        categorie.Titre = content["titre"];

                        if (enteteGlobal != "")
                            categorie.Entete = enteteGlobal;
                        if (minatureGlobal != "")
                            categorie.Miniature = minatureGlobal;
                        categorie.State = content["state"];

                        //_context.SaveChanges();


                    }

                    //_context.Entry(categorie).State = EntityState.Modified;
                    //_context.Update(categorie);
                    await _context.SaveChangesAsync();

                    
                    return Ok("Donées de catégorie modifiées avec succès!");
                }
                else
                {
                    return Ok("Erreur, cette catégorie n'a pas été trouvée et donc ne peut etre modifiée !");
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
            //var sousCategories = 
            
            return Ok(categories);
        }


        [HttpDelete("{ids}")]
        public IActionResult DeleteCategorie(string ids)
        {
            try
            {
                string[] idsArray = ids.Split(',');

                foreach (var id in idsArray)
                {
                    int idConverted;
                    Int32.TryParse(id, out idConverted);

                    var dbCategorie = _context.Categories.FirstOrDefault(c => c.Id.Equals(idConverted));

                    if(dbCategorie != null)
                    {
                        var verifMiniatureExistanceInCateg = _context.Categories.Where(c => c.Miniature == dbCategorie.Miniature).Count();
                        var verifMiniatureExistanceInProd = _context.Produits.Where(c => c.Miniature == dbCategorie.Miniature).Count();

                        var verifEnteteExistanceInCateg = _context.Categories.Where(c => c.Entete == dbCategorie.Entete).Count();//needs to be at least 2 to not delete
                        var verifEnteteExistanceInProd = _context.Produits.Where(c => c.Entete == dbCategorie.Entete).Count();//needs to be at least 2 to not delete
                        var verifEnteteExistanceInImages = _context.Images.Where(i => i.ImagePath == dbCategorie.Entete).Count();//needs to be just 1 to not delete


                        if (System.IO.File.Exists(dbCategorie.Miniature) && (verifMiniatureExistanceInCateg < 2 && verifMiniatureExistanceInProd < 2)) //delete image from wwwroot
                        {
                            System.IO.File.Delete(dbCategorie.Miniature);
                        }
                        if (System.IO.File.Exists(dbCategorie.Entete) && (verifEnteteExistanceInCateg < 2 && verifEnteteExistanceInProd < 2 && verifEnteteExistanceInImages < 1)) //delete image from wwwroot
                        {
                            System.IO.File.Delete(dbCategorie.Entete);
                        }
                        // besoin d'ajout condition pour supprimer les categ de leurs parent

                        if(dbCategorie.Parent != "none")
                        {
                            var dbParent = _context.Categories.FirstOrDefault(c => c.Titre.Equals(dbCategorie.Parent) && c.Etiquette1.Equals(dbCategorie.Etiquette1) && c.Etiquette2.Equals(dbCategorie.Etiquette2));
                            
                            if(dbParent != null)
                            {
                                dbParent.Children = dbParent.Children.Replace(";" + dbCategorie.Titre, "");
                            }
                            else
                            {
                                Ok("Erreur, Parent non trouvé!");
                            }
                        }


                        if (dbCategorie.Produits != "")
                        {
                            return Ok("has products");
                        }
                        else
                        {
                            _context.Categories.Remove(dbCategorie);
                            _context.SaveChanges();
                            
                        }
                        
                    }
                    
                }
                return Ok("Suppression réussie!");
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Erreurlors de la suppresion de la catégorie: {e}");
            }
            
        }
    }
}
