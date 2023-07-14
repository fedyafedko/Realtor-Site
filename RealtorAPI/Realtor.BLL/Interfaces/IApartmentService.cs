using RealtorAPI.Common.DTO;

namespace Realtor.BLL.Interfaces;

public interface IApartmentService
{
    Task<CreateApartmentDTO> AddApartment(CreateApartmentDTO apartment, string jwtToken);
    Task<ApartmentDTO?> GetById(int id);
    List<ApartmentDTO> GetAll();
    List<ApartmentDTO> GetAllForRealtor(string jwtToken);
    Task<bool> DeleteApartment(int id);
    Task<UpdateApartmentDTO> UpdateApartment(int id, UpdateApartmentDTO apartment);
}
