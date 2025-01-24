using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Models
{
    public class Address
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Tên không được để trống")]
        [StringLength(100, ErrorMessage = "Tên không thể dài hơn 100 kí tự")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Địa chỉ không được để trống")]
        [StringLength(255, ErrorMessage = "Địa chỉ không thể dài hơn 255 kí tự")]
        public string FullAddress { get; set; }

        [Required(ErrorMessage = "Số điện thoại không được để trống")]
        [Phone(ErrorMessage = "Số điện thoại không hợp lệ")]
        public string Phone { get; set; }

        [DefaultValue(false)]
        public bool IsDefault { get; set; } = false;

        [ForeignKey(nameof(User.Id))]
        public string UserId { get; set; } // Liên kết với bảng User
        public User? User { get; set; } // Navigation property, không yêu cầu dữ liệu trong request

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}
