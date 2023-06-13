namespace Realtor.BLL.Interfaces;
public interface IPasswordHasher
{
    string HashPassword(string password);
}
