using System.ComponentModel.DataAnnotations;

namespace BE.Models
{
    public class ProductVariant
    {
        public int Id { get; set; }

        [StringLength(50, ErrorMessage = "Màu sắc không được vượt quá 50 ký tự.")]
        public string? Color { get; set; }
        public string? Storage { get; set; }

        [Required(ErrorMessage = "Giá là bắt buộc.")]
        [Range(1, double.MaxValue, ErrorMessage = "Giá phải lớn hơn 0.")]
        public decimal Price { get; set; }

        [Range(1, double.MaxValue, ErrorMessage = "Giá phải lớn hơn 0.")]
        public decimal PriceSale { get; set; } = decimal.Zero;

        [Range(0, int.MaxValue, ErrorMessage = "Số lượng không hợp lệ.")]
        public int Stock { get; set; }

        public int ProductId { get; set; }
        public Product? Product { get; set; }

        public bool IsDeleted { get; set; } = false;

        // Custom validation for logic
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (string.IsNullOrEmpty(Color) && string.IsNullOrEmpty(Storage))
            {
                yield return new ValidationResult("Phải có ít nhất một giá trị cho Màu sắc hoặc Dung lượng.", new[] { nameof(Color), nameof(Storage) });
            }
        }
    }
}
