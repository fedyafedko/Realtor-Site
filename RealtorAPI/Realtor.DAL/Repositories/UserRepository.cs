using Microsoft.EntityFrameworkCore;
using Realtor.DAL.EF;
using Realtor.DAL.Entities;
using Realtor.DAL.Repositories.Base;

namespace Realtor.DAL.Repositories;

public class UserRepository : Repo<User, int>
{
    public UserRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
    {

    }
    public User? FindByLogin(string login)
    {
        return Table.FirstOrDefault(user => user.Login == login);
    }
    public async Task<User?> FindByLoginAsync(string login)
    {
        return await Table.FirstOrDefaultAsync(user => user.Login == login);
    }
}
