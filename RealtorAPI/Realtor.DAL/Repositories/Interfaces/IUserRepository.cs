using Realtor.DAL.Entities;
using Realtor.DAL.Repositories.Base;

namespace Realtor.DAL.Repositories.Interfaces;

public interface IUserRepository : IRepo<User, int>
{
    User? FindByLogin(string login);
    Task<User?> FindByLoginAsync(string login);
}