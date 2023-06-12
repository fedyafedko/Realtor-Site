using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Realtor.BLL.Interfaces;
using RealtorAPI.Common.DTO;

namespace RealtorAPI.Controllers
{
    [Route("/")]
    [ApiController]
    public class ApartmentController : Controller
    {
        private readonly IApartmentService _service;
        public ApartmentController(IApartmentService service)
        {
            _service = service;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                return Ok(await _service.GetById(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("apartment")]
        [ActionName(nameof(GetById))]
        public async Task<IActionResult> InsertApartment(ApartmentDTO apartment)
        {
            try
            {
                var result = await _service.AddApartment(apartment);
                return CreatedAtAction(nameof(_service.GetById), new { apartment = result.Name }, result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
