using AutoMapper;
using Realtor.DAL.Entities;
using RealtorAPI.Common.DTO.Apartment;

namespace Realtor.BLL.AutoMapper;

public class ApartmentProfile : Profile
{
    public ApartmentProfile()
    {
        CreateMap<Apartment, ApartmentDTO>();
        CreateMap<CreateApartmentDTO, Apartment>().ReverseMap();
        CreateMap<UpdateApartmentDTO, Apartment>().ReverseMap();
    }
}
