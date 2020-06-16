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

                _context.Add(slide);
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

            return Ok(slides);
        }

    }
}
