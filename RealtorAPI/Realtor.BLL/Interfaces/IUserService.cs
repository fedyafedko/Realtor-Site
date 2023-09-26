using RealtorAPI.Common.DTO.User;

namespace Realtor.BLL.Interfaces;

public interface IUserService
{
    Task<UserDTO> GetByIdAsync(int userId);
}