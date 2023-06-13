using AutoMapper;
using Realtor.BLL.Interfaces;
using Realtor.DAL.Entities;
using Realtor.DAL.Repositories.Interfaces;
using RealtorAPI.Common.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Realtor.BLL.Service
{
    public class ApartmentService : IApartmentService
    {
        private readonly IApartmentsRepository _repository;
        private readonly IMapper _mapper;
        public ApartmentService(IApartmentsRepository repository, IMapper mapper)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<CreateApartmentDTO> AddApartment(CreateApartmentDTO apartment)
        {
            Apartment entity = _mapper.Map<Apartment>(apartment);
            if (await _repository.Table.FindAsync(entity.Id) != null)
                throw new InvalidOperationException("Entity with such key already exists in database");
            await _repository.AddAsync(entity);
            return _mapper.Map<CreateApartmentDTO>(entity);
        }
        public async Task<bool> DeleteApartment(int id)
        {
            var apartment = await _repository.Table.FindAsync(id);
            return apartment != null && await _repository.DeleteAsync(apartment) > 0;
        }

        public List<ApartmentDTO> GetAll()
        {
            return _mapper.Map<IEnumerable<ApartmentDTO>>(_repository.GetAll()).ToList();
        }

        public async Task<ApartmentDTO?> GetById(int id)
        {
            var apartment = await _repository.Table.FindAsync(id);
            return apartment != null ? _mapper.Map<ApartmentDTO>(apartment) : null;
        }

        public async Task<UpdateApartmentDTO> UpdateApartment(int id, UpdateApartmentDTO apartment)
        {
            var entity = await _repository.Table.FindAsync(id);
            if (entity == null)
            {
                throw new KeyNotFoundException($"Unable to find entity with such key {id}");
            }
            _mapper.Map(apartment, entity);
            await _repository.UpdateAsync(entity);
            return _mapper.Map<UpdateApartmentDTO>(entity);
        }
    }
}
