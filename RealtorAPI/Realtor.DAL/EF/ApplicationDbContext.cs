using Microsoft.EntityFrameworkCore;
using Realtor.DAL.Entities;

namespace Realtor.DAL.EF
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Apartment> Apartments { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!; 
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    }
}
