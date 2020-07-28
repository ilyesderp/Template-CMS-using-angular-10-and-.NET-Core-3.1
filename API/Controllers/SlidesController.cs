using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SlidesController : ControllerBase
    {


        private readonly StoreContext _context;

        public SlidesController(StoreContext context)
        {
            _context = context;
        }



        [HttpPut]
        public IActionResult UploadSlides([FromBody] Slide slide)
        { 
            try
            {
                if (slide == null)
                {
                    return BadRequest("Slide object is null");
                }

                var dbSlide = _context.Slides.Where(s => s.SlideNumber.Equals(slide.SlideNumber)).Where(s => s.Device.Equals(slide.Device)).FirstOrDefault();

                if (dbSlide == null)
                {
                    _context.Add(slide);
                }
                else
                {
                    dbSlide.Device = slide.Device;
                    dbSlide.Path = slide.Path;
                }

                _context.SaveChanges();

                return Ok("requete put aboutie avec succès!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }

        }

        [HttpGet]
        public async Task<ActionResult<List<Slide>>> GetSlides()
        {
            var slides = await _context.Slides.ToListAsync();

            foreach(var slide in slides)
            {
                var dbImagetext = _context.ImageTexts.Where(i => i.SlideName.Equals(slide.SlideNumber)).Where(i => i.Device.Equals(slide.Device)).FirstOrDefault();

                if(dbImagetext != null)
                {
                    slide.ImageText = dbImagetext.ImageTextPath;
                    slide.PosX = dbImagetext.PositionX;
                    slide.PosY = dbImagetext.PositionY;
                }
            }

            return Ok(slides);
        }

    }
}
