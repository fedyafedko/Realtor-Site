using Microsoft.EntityFrameworkCore;
using Realtor.DAL.Entities;

namespace Realtor.DAL.EF
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<ApartmentEntity> Apartments { get; set; } = null!;
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
    }
}
