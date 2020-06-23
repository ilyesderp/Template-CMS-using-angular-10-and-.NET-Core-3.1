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
    public class ImageUploadController : ControllerBase
    {
        private readonly StoreContext _context;

        public ImageUploadController(StoreContext context)
        {
            _context = context;
        }

        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Upload()
        {
            try
            {
                var files = Request.Form.Files;
                var subFolder = Path.Combine("images", "uploads");
                var folderName = Path.Combine("wwwroot", subFolder);
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (files.Any(f => f.Length == 0))
                {
                    return BadRequest();
                }

                foreach (var file in files)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    var image = new Image();

                    
                    

                    using(var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    
                    image.ImagePath = dbPath;
                    var count = _context.Images.Count();
                    if (count < 100)
                    {
                        var dbImage = _context.Images.FirstOrDefault(i => i.ImagePath.Equals(image.ImagePath));
                        if (dbImage == null)
                        {
                            _context.Add(image);
                        }
                        else
                        {
                            dbImage.ImagePath = image.ImagePath;
                        }
                        
                        _context.SaveChanges();
                    }
                    else
                    {
                        return Ok("over100");
                        
                    }
                                
                }
                return Ok("All the files are successfully uploaded.");
            }
            catch(Exception ex)
            {
                return StatusCode(500, $"Erreur serveur interne: {ex}");
            }
        }

        [HttpGet]
        public async Task<ActionResult<List<Image>>> GetImages()
        {
            var images = await _context.Images.ToListAsync();

            return Ok(images);
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteImage(int id)
        {

            try
            {
                var dbImage = _context.Images.FirstOrDefault(i => i.Id.Equals(id));

                if(dbImage != null)
                {
                
                    string imgPath = dbImage.ImagePath.Replace("\\", "/");
                    string imgPathFinal =  "https://localhost:44324/" + imgPath;

                    //var findInSlides = _context.Slides.FirstOrDefault(s => s.Path.Equals(dbImage.ImagePath));
                    var findInSlides = _context.Slides.FirstOrDefault(s => s.Path.Equals(imgPathFinal));

                    if (findInSlides == null)
                    {
                        if (System.IO.File.Exists(dbImage.ImagePath)) //delete image from wwwroot
                        {
                            System.IO.File.Delete(dbImage.ImagePath);
                        }

                        _context.Images.Remove(dbImage);
                        _context.SaveChanges();
                    }
                    else
                    {
                        return Ok(findInSlides.SlideNumber);// return slide as text exp: "slide 1" to use it in client.
                    }
                }
                else
                {
                    StatusCode(500, $"Internal server error");
                }

            }
            catch(Exception e)
            {
                return StatusCode(500, $"Erreurlors de la suppresion de l'image: {e}");
            }

                return Ok("Suppression réussie!");
        }

        /*[HttpGet("{id}")]//just for tests
        public async Task<ActionResult<Image>> GetImage(int id)
        {
            return await _context.Images.FindAsync(id);
        }*/
    }
}
