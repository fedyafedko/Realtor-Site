using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Realtor.DAL.Entities
{
    public class Apartment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Images { get; set; } = null!;
        public int NumberRoom { get; set; }
        public double Square { get; set; } 
        public int Floor {get; set; }
        public string Description { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;
    }
}
