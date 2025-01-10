using System.ComponentModel.DataAnnotations;

namespace BE.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Tên danh mục là bắt buộc.")]
        [StringLength(100, ErrorMessage = "Tên danh mục không được vượt quá 100 ký tự.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Slug là bắt buộc.")]
        public string Slug { get; set; }
        //public List<Product>? Products { get; set; }

        public string? Logo { get; set; }
        public bool? IsDeleted { get; set; } = false;
    }
}
