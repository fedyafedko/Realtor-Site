using RealtorAPI.Common.DTO.Apartment;

namespace Realtor.BLL.Interfaces;

public interface IApartmentService
{
    Task<CreateApartmentDTO> AddApartment(int userId, CreateApartmentDTO apartment);
    Task<ApartmentDTO?> GetById(int id);
    List<ApartmentDTO> GetAll();
    List<ApartmentDTO> GetAllForRealtor(int userId);
    Task<bool> DeleteApartment(int id);
    Task<UpdateApartmentDTO> UpdateApartment(int id, UpdateApartmentDTO apartment);
}
