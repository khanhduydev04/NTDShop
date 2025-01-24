using BE.Models;

namespace BE.DTOs
{
    public class ProductResponse
    {
        public int Id { get; set; }
        public string Slug { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        public decimal Price { get; set; }
        public decimal PriceSale { get; set; }
        public string Image { get; set; }
        public CategoryResponse? Category { get; set; }
    }

    public class CategoryResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Slug { get; set; }
    }

}
