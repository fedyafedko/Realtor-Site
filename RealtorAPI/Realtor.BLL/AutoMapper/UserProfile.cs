using AutoMapper;
using Realtor.DAL.Entities;
using RealtorAPI.Common.DTO.User;

namespace Realtor.BLL.AutoMapper;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserDTO>();
    }
}