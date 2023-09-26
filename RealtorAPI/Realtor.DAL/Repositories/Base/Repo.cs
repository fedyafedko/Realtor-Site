using Microsoft.EntityFrameworkCore;
using Realtor.DAL.EF;

namespace Realtor.DAL.Repositories.Base;

public class Repo<TEntity, TKey> : IRepo<TEntity, TKey>
    where TEntity : class
    where TKey : IEquatable<TKey>
{
    private ApplicationDbContext ApplicationDbContext { get; set; }
    public DbSet<TEntity> Table { get; }
    protected Repo(ApplicationDbContext applicationDbContext)
    {
        ApplicationDbContext = applicationDbContext ?? throw new ArgumentNullException(nameof(applicationDbContext));
        Table = ApplicationDbContext.Set<TEntity>();
    }

    public int Add(TEntity entity, bool persist = true)
    {
        Table.Add(entity);
        return persist ? SaveGanges() : 0;
    }

    public async Task<int> AddAsync(TEntity entity, bool persist = true)
    {
        await Table.AddAsync(entity);
        return persist ? await SaveGangesAsync() : 0;
    }

    public int Delete(TEntity entity, bool persist = true)
    {
        Table.Remove(entity);
        return persist ? SaveGanges() : 0;
    }

    public async Task<int> DeleteAsync(TEntity entity, bool persist = true)
    {
        Table.Remove(entity);
        return persist ? await SaveGangesAsync() : 0;
    }


    public TEntity? Find(TKey key)
    {
        return Table.Find(key);
    }

    public async Task<TEntity?> FindAsync(TKey key)
    {
        return await Table.FindAsync(key);
    }

    public IEnumerable<TEntity> GetAll()
    {
        return Table;
    }

    public int SaveGanges()
    {
        try
        {
            return ApplicationDbContext.SaveChanges();
        }
        catch (Exception ex)
        {
            throw new Exception("An error occurred updating the database", ex);
        }
    }

    public Task<int> SaveGangesAsync()
    {
        try
        {
            return ApplicationDbContext.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new Exception("An error occurred updating the database", ex);
        }
    }

    public int Update(TEntity entity, bool persist = true)
    {
        Table.Update(entity);
        return persist ? SaveGanges() : 0;
    }

    public async Task<int> UpdateAsync(TEntity entity, bool persist = true)
    {
        Table.Update(entity);
        return persist ? await SaveGangesAsync() : 0;
    }
}
