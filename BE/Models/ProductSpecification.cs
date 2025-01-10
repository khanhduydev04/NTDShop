using System.ComponentModel.DataAnnotations;

namespace BE.Models
{
    public class ProductSpecification
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Tên thông số là bắt buộc.")]
        [StringLength(100, ErrorMessage = "Tên thông số không được vượt quá 100 ký tự.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Giá trị thông số là bắt buộc.")]
        public string Value { get; set; }

        public int ProductId { get; set; }
        public Product? Product { get; set; }
    }
}
