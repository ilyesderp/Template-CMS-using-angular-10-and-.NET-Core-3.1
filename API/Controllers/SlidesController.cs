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


        [HttpPost]
        public ActionResult<List<Slide>> UploadSlides()
        {

            var slide = HttpContext.Request.Body;

            _context.Add(slide);
            _context.SaveChanges();

            return Ok("requete aboutie avec succes!");

        }

    }
}
