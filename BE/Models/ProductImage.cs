using System.ComponentModel.DataAnnotations;

namespace BE.Models
{
    public class ProductImage
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "URL hình ảnh là bắt buộc.")]
        public string ImageUrl { get; set; }

        public int ProductId { get; set; }
        public Product? Product { get; set; }
    }
}
