using BE.Models;
using System.ComponentModel.DataAnnotations;

namespace BE.DTOs
{
    public class UpdateProductDTO
    {
        [StringLength(150, ErrorMessage = "Tên sản phẩm không được vượt quá 150 ký tự.")]
        public string? Name { get; set; }
        public string? Slug { get; set; }
        public string? Description { get; set; }
        public int? CategoryId { get; set; }
        public List<int>? NeedIds { get; set; } = new List<int>();
        public List<int>? DeleteImageIds { get; set; } = new List<int>();
        public string? ProductVariants { get; set; }
        public string? ProductSpecifications { get; set; }
    }
}