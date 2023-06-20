using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Realtor.DAL.Entities;

public class Apartment
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
    public int Id { get; set; }
    public int IdUser { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Images { get; set; } = string.Empty;
    public int NumberRoom { get; set; }
    public double Square { get; set; } 
    public int Floor {get; set; }
    public string Description { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
}
