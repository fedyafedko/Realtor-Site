using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Realtor.BLL.Interfaces;
using Realtor.DAL.Entities;
using Realtor.DAL.Repositories;
using RealtorAPI.Common.DTO;
using RealtorAPI.Common.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace Realtor.BLL.Service;
public class AuthService : IAuthService
{
    private readonly UserRepository _repository;
    private readonly IPasswordHasher _hasher;
    private readonly JwtSettings _settings;

    public AuthService(UserRepository repo, IPasswordHasher hasher, IOptions<JwtSettings> settings)
    {
        _repository = repo;
        _hasher = hasher;
        _settings = settings.Value;
    }
    public async Task<AuthSuccessDTO> LoginAsync(LoginUserDTO user)
    {
        string hashedPassword = "$2a$10$mo57Oh7rFONfXUUGmV8GMeAuAPq4PcjoobGy1kyOBGlA0cGOVZ/Pq";
        var existingUser = await _repository.FindByLoginAsync(user.Login);

        if (existingUser == null)
            throw new KeyNotFoundException(user.Login);

        if (existingUser.Password != hashedPassword)
            throw new UnauthorizedAccessException(user.Login);

        return new AuthSuccessDTO(GenerateJwtToken(existingUser));

    }
    public async Task<AuthSuccessDTO> RegisterAsync(RegisterUserDTO user)
    {
        string hashedPassword = _hasher.HashPassword(user.Password);
        var existingUser = await _repository.FindByLoginAsync(user.Login);

        if (existingUser != null)
            throw new InvalidOperationException(user.Login);

        var newUser = new User()
        {
            Login = user.Login,
            Password = hashedPassword,
            Role = user.Role,
        };
        _repository.Add(newUser);

        return new AuthSuccessDTO(GenerateJwtToken(newUser));
    }
    private string GenerateJwtToken(User user)
    {
        var jwtTokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_settings.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim("id", user.Id.ToString()),
                new Claim("login", user.Login),
                new Claim("role", user.Role),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            }),
            Expires = DateTime.UtcNow.AddHours(2),
            SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            Issuer = _settings.Issuer,
            Audience = _settings.Audience
        };

        var token = jwtTokenHandler.CreateToken(tokenDescriptor);
        var jwtToken = jwtTokenHandler.WriteToken(token);
        return jwtToken;
    }
}
