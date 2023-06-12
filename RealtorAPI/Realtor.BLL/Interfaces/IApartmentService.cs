using RealtorAPI.Common.DTO;

namespace Realtor.BLL.Interfaces
{
    public interface IApartmentService
    {
        Task<ApartmentDTO> AddApartment(ApartmentDTO apartment);
        Task<ApartmentDTO?> GetById(int id);
        List<ApartmentDTO> GetAll();
        Task<bool> DeleteApartment(int id);
        Task<ApartmentDTO> UpdateApartment(int id, ApartmentDTO apartment);
    }
}
