using Microsoft.AspNetCore.Mvc;
using Realtor.BLL.Interfaces;
using RealtorAPI.Common.DTO;

namespace RealtorAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }
    [HttpPost("[action]")]
    public async Task<IActionResult> Register(RegisterUserDTO userDTO)
    {
        return Ok(await _authService.RegisterAsync(userDTO));
    }
    [HttpPost("[action]")]
    public async Task<IActionResult> Login(LoginUserDTO userDTO)
    {
        return Ok(await _authService.LoginAsync(userDTO));
    }
}
