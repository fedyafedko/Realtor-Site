using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RealtorAPI.Common.DTO;
public class LoginUserDTO
{
    public string Login { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
