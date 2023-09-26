using Microsoft.EntityFrameworkCore;
using Realtor.DAL.EF;
using Realtor.DAL.Entities;
using Realtor.DAL.Repositories.Base;
using Realtor.DAL.Repositories.Interfaces;

namespace Realtor.DAL.Repositories;

public class ApartmentRepository : Repo<Apartment, int>, IApartmentsRepository
{
    public ApartmentRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext)
    {
    }
    public async Task<Apartment?> GetByApartmentId(int userId)
    {
        var apartment = Table
            .Include(a => a.User) // Включаємо інформацію про користувача
            .FirstOrDefault(a => a.Id == userId);

        return Table.Include(a => a.User).FirstOrDefault(a => a.Id == userId);;
    }
    public async Task<List<Apartment>> GetByUserId(int userId)
    {
        return await Table.Where(a => a.UserId == userId).ToListAsync();
    }
}