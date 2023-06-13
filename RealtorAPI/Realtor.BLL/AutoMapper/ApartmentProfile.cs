using AutoMapper;
using Realtor.DAL.Entities;
using RealtorAPI.Common.DTO;

namespace Realtor.BLL.AutoMapper
{
    public class ApartmentProfile : Profile
    {
        public ApartmentProfile() 
        {
            CreateMap<ApartmentDTO, Apartment>()
               .ForMember(dest => dest.Images, opt => opt.MapFrom(src => string.Join(", ", src.Images)));
        }
    }
}
