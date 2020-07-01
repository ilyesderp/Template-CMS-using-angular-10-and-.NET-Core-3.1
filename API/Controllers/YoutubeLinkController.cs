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
    public class YoutubeLinkController : ControllerBase
    {

        private readonly StoreContext _context;

        public YoutubeLinkController(StoreContext context)
        {
            _context = context;
        }


        [HttpPost]
        public IActionResult saveYoutubeLink([FromBody] YoutubeLinkRequestFormat ytLink)
        {
            try
            {
                if(ytLink != null && ytLink.Nom != "YoutubeLink")
                {
                    return BadRequest("Le nom envoyé dans la requete n'est pas bon! ou bien mauvaise requete!");
                }
                var dbYtLink = _context.YoutubeLinks.FirstOrDefault(i => i.Nom.Equals(ytLink.Nom));

                if(dbYtLink != null)
                {
                    dbYtLink.Nom = ytLink.Nom;
                    dbYtLink.YoutubeId = ytLink.YoutubeId;
                }
                else
                {
                    var youtubeLink = new YoutubeLink();
                    youtubeLink.Nom = ytLink.Nom;
                    youtubeLink.YoutubeId = ytLink.YoutubeId;
                    _context.Add(youtubeLink);
                }
                _context.SaveChanges();
                return Ok("Lien enregistré avec succès");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur serveur interne: {ex}");
            }

        }


        [HttpGet]
        public async Task<ActionResult<List<YoutubeLink>>> getYoutubeLink()
        {

            var ytLinks = await _context.YoutubeLinks.ToListAsync();

            return Ok(ytLinks);
        }

        [HttpDelete]
        public IActionResult deleteYoutubeLink()
        {
            try
            {
                var dbYtLink = _context.YoutubeLinks.FirstOrDefault(i => i.Nom.Equals("YoutubeLink"));

                if (dbYtLink != null)
                {
                    _context.YoutubeLinks.Remove(dbYtLink);
                    _context.SaveChanges();
                }
                else
                {
                    StatusCode(500, $"Pas de lien à supprimer!");
                }

                return Ok("Lien Youtube supprimé avec succès!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur serveur interne: {ex}");
            }

        }


    }
}
