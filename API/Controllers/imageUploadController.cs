using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Controllers
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

        [HttpGet]
        public async Task<ActionResult<List<Image>>> GetImages()
        {
            var images = await _context.Images.ToListAsync();

            return Ok(images);
        }

        [HttpGet("{id}")]//just for tests
        public async Task<ActionResult<Image>> GetImage(int id)
        {
            return await _context.Images.FindAsync(id);
        }
    }
}
