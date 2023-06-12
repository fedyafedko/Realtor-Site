namespace RealtorAPI.Common.DTO
{
    public class ApartmentDTO
    {
        public string Name { get; set; } = null!;
        public string Images { get; set; } = null!;
        public int NumberRoom { get; set; }
        public double? Square { get; set; }
        public string Description { get; set; } = null!;
        public int Floor { get; set; }
        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;
    }
}
