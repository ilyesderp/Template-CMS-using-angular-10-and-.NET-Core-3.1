using System;
using System.Collections.Generic;
using System.Linq;
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
    public class ChoixPopupController : ControllerBase
    {

        private readonly StoreContext _context;

        public ChoixPopupController(StoreContext context)
        {
            _context = context;
        }


        [HttpPost]
        public IActionResult PostChoix([FromBody] ChoixRequestModel request)
        {

            try
            {
                if (request == null)
                {
                    return BadRequest("Mauvaise requete!");
                }

                var choix = request.Choix;
                var dbChoix = _context.ChoixPopups.FirstOrDefault(i => i.Nom.Equals("only"));

                if (dbChoix != null)
                {
                    dbChoix.Choix = choix;
                }
                else
                {
                    var choice = new ChoixPopup
                    {
                        Nom = "only",
                        Choix = choix
                    };
                    _context.Add(choice);
                }
                _context.SaveChanges();
                return Ok("choix enregistré!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur serveur interne: {ex}");
            }

            
        }


        [HttpGet]
        public async Task<ActionResult<List<ChoixPopup>>> getChoix()
        {

            var choix = await _context.ChoixPopups.ToListAsync();

            return Ok(choix[0].Choix);
        }
    }
}
