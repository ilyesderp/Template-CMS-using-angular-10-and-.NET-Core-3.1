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
    public class ImageTextController : ControllerBase
    {

        private readonly StoreContext _context;

        public ImageTextController(StoreContext context)
        {
            _context = context;
        }

        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Upload([FromForm] ImageTextRequestFormat imageTextClient)
        {
            try
            {
                var file = imageTextClient.Image[0];
                //var imageBase64 = imageTextClient.Image;

                //byte[] bytes = Convert.FromBase64String(imageBase64);


                var subFolder = Path.Combine("images", "uploads");
                var folderName = Path.Combine("wwwroot", subFolder);
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);


                /*using (MemoryStream ms = new MemoryStream(bytes))
                {
                    Image pic = Image.FromStream(ms);

                    pic.Save(DefaultImagePath);
                }*/


                if (file == null)
                {
                    return BadRequest();
                }
                
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    var imageText = new ImageText();



                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    imageText.ImageTextPath = dbPath;
                    imageText.SlideName = imageTextClient.NumSlide;
                    //imageText.PositionX = imageTextClient.PosX;
                    //imageText.PositionY = imageTextClient.PosY;

                    

                    var dbImagetext = _context.ImageTexts.Where(i => i.Device.Equals(imageTextClient.Device)).Where(i => i.SlideName.Equals(imageText.SlideName)).FirstOrDefault();
                    if (dbImagetext == null)
                    {
                            imageText.Device = imageTextClient.Device;
                            _context.Add(imageText);
                    }
                     else
                     {
                            //dbImagetext.ImageTextPath = imageText.ImageTextPath;
                            Ok("Image text is already set");
                     }

                     _context.SaveChanges();
                    
                 
                
                return Ok("All the files are successfully uploaded.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur serveur interne: {ex}");
            }
        }


        [HttpPut]
        public IActionResult UpdatePosition([FromBody] ImageTextRequestFormat posClient)
        {
            try
            {
                var dbImagetext = _context.ImageTexts.Where(i => i.SlideName.Equals(posClient.NumSlide)).Where(i => i.Device.Equals(posClient.Device)).FirstOrDefault();

                if(dbImagetext != null)
                {
                    dbImagetext.PositionX = posClient.PosX;
                    dbImagetext.PositionY = posClient.PosY;
                    _context.SaveChanges();
                }
                return Ok("Mise à jour de la position réussie");
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Erreur serveur interne: {e}");
            }
            
        }


        [HttpGet]
        public async Task<ActionResult<List<ImageText>>> GetImages()
        {
            var images = await _context.ImageTexts.ToListAsync();

            return Ok(images);
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteImageText(int id)
        {

            var dbImage = _context.ImageTexts.FirstOrDefault(i => i.Id.Equals(id));

            if(dbImage != null)
            {
                _context.ImageTexts.Remove(dbImage);
                _context.SaveChanges();
            }
            else
            {
                StatusCode(500, $"Internal server error");
            }

            return Ok("Suppression image texte réussie!");
        }
    }

}
