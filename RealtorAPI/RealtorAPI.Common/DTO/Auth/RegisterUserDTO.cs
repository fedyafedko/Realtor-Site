namespace RealtorAPI.Common.DTO.Auth;

public class RegisterUserDTO
{
    public string Login { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}