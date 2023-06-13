using Realtor.BLL.Interfaces;

namespace Realtor.BLL.Service;

public class PasswordHasher : IPasswordHasher
{
    public string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }
}
