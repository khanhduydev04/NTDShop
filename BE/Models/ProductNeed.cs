namespace BE.Models
{
    public class ProductNeed
    {
        public int ProductId { get; set; }
        public Product? Product { get; set; }

        public int NeedId { get; set; }
        public Need? Need { get; set; }
    }
}
