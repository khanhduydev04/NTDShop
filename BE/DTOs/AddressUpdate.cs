namespace BE.DTOs
{
    public class AddressUpdate
    {
        public string? Name { get; set; }
        public string? FullAddress { get; set; }
        public string? Phone { get; set; }
        public bool? IsDefault { get; set; }
        public string? UserId { get; internal set; }
    }
}
