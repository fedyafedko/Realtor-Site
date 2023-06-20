using AutoMapper;
using Realtor.BLL.Interfaces;
using Realtor.DAL.Entities;
using Realtor.DAL.Repositories.Interfaces;
using RealtorAPI.Common.DTO;
using System.Data;

namespace Realtor.BLL.Service;

public class ApartmentService : IApartmentService
{

    private readonly IApartmentsRepository _repository;
    private readonly IMapper _mapper;
    public ApartmentService(IApartmentsRepository repository, IMapper mapper)
    {
        _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }
    public async Task<CreateApartmentDTO> AddApartment(CreateApartmentDTO apartment, string jwtToken)
    {
        Apartment entity = _mapper.Map<Apartment>(apartment);

        var claims = AuthService.GetClaimsFromJwtToken(jwtToken);

        if (await _repository.Table.FindAsync(entity.Id) != null)
            throw new InvalidOperationException("Entity with such key already exists in the database");

        var userIdClaim = claims.FirstOrDefault(claim => claim.Type == "id");
        if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
            entity.IdUser = userId;
        else
            throw new InvalidOperationException("Invalid user id in token");
        
        await _repository.AddAsync(entity);
        return _mapper.Map<CreateApartmentDTO>(entity);
    }
    public async Task<bool> DeleteApartment(int id)
    {
        var apartment = await _repository.Table.FindAsync(id);
        return apartment != null && await _repository.DeleteAsync(apartment) > 0;
    }

    public List<ApartmentDTO> GetAll(string jwtToken)
    {
        var claims = AuthService.GetClaimsFromJwtToken(jwtToken);
        var userIdClaim = claims.FirstOrDefault(claim => claim.Type == "id");
        var userRoleClaim = claims.FirstOrDefault(claim => claim.Type == "role");

        if (userRoleClaim != null && userRoleClaim.Value == "Realtor")
        {
            if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
                return _mapper.Map<IEnumerable<ApartmentDTO>>(_repository.GetAll().Where(apartment => apartment.IdUser == userId)).ToList();
            else
                throw new InvalidOperationException("Invalid user id in token");    
        }
        else
        {
            return _mapper.Map<IEnumerable<ApartmentDTO>>(_repository.GetAll()).ToList();
        }
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
            throw new KeyNotFoundException($"Unable to find entity with such key {id}");
        
        _mapper.Map(apartment, entity);
        await _repository.UpdateAsync(entity);
        return _mapper.Map<UpdateApartmentDTO>(entity);
    }
}
