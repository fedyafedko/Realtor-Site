using AutoMapper;
using Realtor.DAL.Entities;
using RealtorAPI.Common.DTO;

namespace Realtor.BLL.AutoMapper;

public class ApartmentProfile : Profile
{
    public ApartmentProfile() 
    {
        CreateMap<ApartmentDTO, Apartment>().ReverseMap();
        CreateMap<CreateApartmentDTO, Apartment>().ReverseMap();
        CreateMap<User, Apartment>()
            .ForMember(dest => dest.IdUser, source => source.MapFrom(s => s.Id))
            .ReverseMap();
        CreateMap<UpdateApartmentDTO, Apartment>().ReverseMap();
    }
}
