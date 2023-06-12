using Realtor.DAL.EF;
using Realtor.DAL.Entities;
using Realtor.DAL.Repositories.Base;
using Realtor.DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Realtor.DAL.Repositories;

public class ApartmentRepository : Repo<Apartment, string>, IApartmentsRepository
{
    public ApartmentRepository(ApplicationDbContext applicationDbContext) : base(applicationDbContext) { }
}
