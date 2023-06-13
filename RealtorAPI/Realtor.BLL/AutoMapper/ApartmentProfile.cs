using AutoMapper;
using Realtor.DAL.Entities;
using RealtorAPI.Common.DTO;

namespace Realtor.BLL.AutoMapper
{
    public class ApartmentProfile : Profile
    {
        public ApartmentProfile() 
        {
            CreateMap<ApartmentDTO, Apartment>().ReverseMap();
            CreateMap<CreateApartmentDTO, Apartment>().ReverseMap();
            CreateMap<UpdateApartmentDTO, Apartment>().ReverseMap();
        }
    }
}
