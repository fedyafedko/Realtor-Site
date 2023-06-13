using RealtorAPI.Common.DTO;

namespace Realtor.BLL.Interfaces
{
    public interface IApartmentService
    {
        Task<CreateApartmentDTO> AddApartment(CreateApartmentDTO apartment);
        Task<ApartmentDTO?> GetById(int id);
        List<ApartmentDTO> GetAll();
        Task<bool> DeleteApartment(int id);
        Task<UpdateApartmentDTO> UpdateApartment(int id, UpdateApartmentDTO apartment);
    }
}
