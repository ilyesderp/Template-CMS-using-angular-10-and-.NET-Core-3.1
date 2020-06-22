﻿using System;
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

                        var dbImagetext = _context.ImageTexts.FirstOrDefault(i => i.SlideName.Equals(imageText.SlideName));
                        if (dbImagetext == null)
                        {
                            _context.Add(imageText);
                        }
                        else
                        {
                            dbImagetext.ImageTextPath = imageText.ImageTextPath;
                        }

                        _context.SaveChanges();
                    
                 
                
                return Ok("All the files are successfully uploaded.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur serveur interne: {ex}");
            }
        }

        [HttpGet]
        public async Task<ActionResult<List<ImageText>>> GetImages()
        {
            var images = await _context.ImageTexts.ToListAsync();

            return Ok(images);
        }
    }

}
