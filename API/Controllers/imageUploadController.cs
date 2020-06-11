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

                    //sauvgarde du path de l'image dans la bdd à faire, i just need to check [FromBody] cz might help.
                    

                    using(var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    
                    image.ImagePath = dbPath;
                    _context.Add(image);
                    _context.SaveChanges();            
                }
                return Ok("All the files are successfully uploaded.");
            }
            catch(Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpGet]
        public async Task<ActionResult<List<Image>>> GetImages()
        {
            var images = await _context.Images.ToListAsync();

            return Ok(images);
        }

        /*[HttpGet("{id}")]//just for tests
        public async Task<ActionResult<Image>> GetImage(int id)
        {
            return await _context.Images.FindAsync(id);
        }*/
    }
}
