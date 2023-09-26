using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Realtor.BLL.Interfaces;
using Realtor.DAL.Repositories.Interfaces;
using RealtorAPI.Common.DTO.User;

namespace Realtor.BLL.Service;
public class UserService : IUserService
{
    private readonly IUserRepository _repository;
    private readonly IMapper _mapper;
    
    public UserService(IUserRepository repository, IMapper mapper)
    {
        _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        _mapper = mapper;
    }

    public async Task<UserDTO> GetByIdAsync(int userId)
    {
        var user = await _repository.FindAsync(userId);
        if (user == null)
            throw new KeyNotFoundException(nameof(userId));

        return _mapper.Map<UserDTO>(user);
    }
}
