using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Models
{
    public class OrderDetail
    {
        public int Id { get; set; }

        [ForeignKey(nameof(Order.Id))]
        [Required]
        public int OrderId { get; set; }
        public Order? Order { get; set; }

        [ForeignKey(nameof(ProductVariant.Id))]
        [Required]
        public int ProductVariantId { get; set; }
        public ProductVariant? ProductVariant { get; set; }

        [Required(ErrorMessage = "Số lượng là bắt buộc.")]
        [Range(1, int.MaxValue, ErrorMessage = "Số lượng phải lớn hơn 0.")]
        public int Quantity { get; set; }

        [Required(ErrorMessage = "Giá là bắt buộc.")]
        [Range(0, double.MaxValue, ErrorMessage = "Giá phải lớn hơn hoặc bằng 0.")]
        public decimal Price { get; set; }

        public decimal Total => Price * Quantity;

        public bool IsDeleted { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
    }
}
