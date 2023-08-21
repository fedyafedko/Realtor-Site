﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Realtor.BLL.Interfaces;
using RealtorAPI.Common.DTO;

namespace RealtorAPI.Controllers;

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
    [Authorize(Roles = "Realtor")]
    public async Task<IActionResult> InsertApartment(CreateApartmentDTO apartment)
    {
        try
        {
            string jwtToken = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var result = await _service.AddApartment(apartment, jwtToken);
            return CreatedAtAction(nameof(_service.GetById), new { apartment = result.Name }, result);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Realtor")]
    public async Task<IActionResult> DeleteApartment(int id)
    {
        try
        {
            return await _service.DeleteApartment(id) ? Ok() : NotFound();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Realtor")]
    public async Task<IActionResult> UpdateApartment(int id, [FromBody] UpdateApartmentDTO apartment)
    {
        try
        {
            var result = await _service.UpdateApartment(id, apartment);
            return Ok(result);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        try
        {
            return Ok(_service.GetAll());
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }
    [HttpGet("realtor")]
    [Authorize(Roles = "Realtor")]
    public IActionResult GetAllForRealtor()
    {
        try
        {
            string jwtToken = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            return Ok(_service.GetAllForRealtor(jwtToken));
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }
}