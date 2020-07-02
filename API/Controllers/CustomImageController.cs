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
    public class CustomImageController : ControllerBase
    {

        private readonly StoreContext _context;

        public CustomImageController(StoreContext context)
        {
            _context = context;
        }

        [HttpPost, DisableRequestSizeLimit]
        public IActionResult PostCustomImage()
        {
            try
            {
                var file = Request.Form.Files[0];


                var subFolder = Path.Combine("images", "uploads");
                var folderName = Path.Combine("wwwroot", subFolder);
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);


                if (file == null)
                {
                    return BadRequest();
                }

                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fullPath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(folderName, fileName);
                var image = new CustomImage();



                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                image.Path = dbPath;
                image.Nom = "CustomImage";



                
                var dbImagetext = _context.CustomImages.FirstOrDefault(i => i.Nom.Equals(image.Nom));
                if (dbImagetext == null)
                {
                   _context.Add(image);
                }
                else
                {
                    Ok("Image text is already set");
                }

                _context.SaveChanges();

                return Ok("Image posted!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur serveur interne: {ex}");
            }
        }


        [HttpDelete]
        public IActionResult DeleteCustomImage()
        {
            try
            {
                var dbImage = _context.CustomImages.FirstOrDefault(i => i.Nom.Equals("CustomImage"));

                if (dbImage != null)
                {
                    _context.CustomImages.Remove(dbImage);
                    _context.SaveChanges();
                }
                else
                {
                    StatusCode(500, $"Pas d'image à supprimer!");
                }

                return Ok("Image Supprimée avec succès!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur serveur interne: {ex}");
            }

            
        }


        [HttpGet]
        public async Task<ActionResult<List<CustomImage>>> GetCustomImage()
        {
            var image = await _context.CustomImages.ToListAsync();

            return Ok(image[0]);
        }
    }
}
