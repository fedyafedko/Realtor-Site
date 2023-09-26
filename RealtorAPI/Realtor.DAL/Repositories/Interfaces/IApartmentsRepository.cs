using Realtor.DAL.Entities;
using Realtor.DAL.Repositories.Base;

namespace Realtor.DAL.Repositories.Interfaces;

public interface IApartmentsRepository : IRepo<Apartment, int>
{
    Task<List<Apartment>> GetByUserId(int userId);
}
