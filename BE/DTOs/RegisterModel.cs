using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace BE.Auth
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "Tên không được để trống")]
        [StringLength(100, ErrorMessage = "Tên không thể dài hơn 100 kí tự")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "Tên đăng nhập không được để trống")]
        public string Username { get; set; }
        [Required(ErrorMessage = "Số điện thoại không được để trống")]
        [Phone(ErrorMessage = "Số điện thoại không hợp lệ")]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Email không được để trống")]
        [EmailAddress(ErrorMessage = "Email không hợp lệ")]
        public string Email { get; set; }

        [DefaultValue("Không xác định")]
        [RegularExpression(@"^(Nam|Nữ|Không xác định)$", ErrorMessage = "Chỉ nhận các giá trị Nam, Nữ, Hoặc Không xác định.")]
        public string? Gender { get; set; }

        [DefaultValue("Customer")]
        public string Role { get; set; }

        [Required(ErrorMessage = "Địa chỉ không được để trống.")]
        public required string Address { get; set; }

        [DataType(DataType.Date)]
        public DateTime? DateOfBirth { get; set; }

        [Required(ErrorMessage = "Mật khẩu là bắt buộc")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Xác nhận mật khẩu là bắt buộc")]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Mật khẩu và xác nhận mật khẩu không khớp")]
        public string ConfirmPassword { get; set; }
    }
}
