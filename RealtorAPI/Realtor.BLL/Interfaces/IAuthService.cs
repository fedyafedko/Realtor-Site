using RealtorAPI.Common.DTO;

namespace Realtor.BLL.Interfaces;

public interface IAuthService
{
    Task<AuthSuccessDTO> LoginAsync(LoginUserDTO user);
    Task<AuthSuccessDTO> RegisterAsync(RegisterUserDTO user);
}