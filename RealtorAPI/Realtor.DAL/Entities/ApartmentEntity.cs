using System.ComponentModel.DataAnnotations;

namespace Realtor.DAL.Entities
{
    public class ApartmentEntity
    {
        [Key]
        public int Id { get; set; }
        public string?  Name { get; set; }
        public string? Images { get; set; }
        public int NumberRoom { get; set; }
        public double? Square { get; set; } 
        public string? Description { get; set; }
        public int Floor {get; set; }
    }
}
