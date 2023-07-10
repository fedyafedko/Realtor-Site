using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RealtorAPI.Common.DTO;

public class UpdateApartmentDTO
{
    public string Name { get; set; } = null!;
    public string Images { get; set; } = null!;
    public string Address { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public int NumberRoom { get; set; }
    public double Square { get; set; }
    public int Floor { get; set; }
    public string Description { get; set; } = null!;
    public string Price { get; set; } = string.Empty;

    public string Email { get; set; } = null!;
    public string Phone { get; set; } = null!;
}
