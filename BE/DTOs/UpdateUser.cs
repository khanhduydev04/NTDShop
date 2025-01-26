using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace BE.DTOs
{
	public class UpdateUser
	{
		[StringLength(100, ErrorMessage = "Tên không thể dài hơn 100 kí tự")]
		[Display(Name = "Họ và tên")]
		public string FullName { get; set; }

		[Phone(ErrorMessage = "Số điện thoại không hợp lệ")]
		[Display(Name = "Số điện thoại")]
		public string PhoneNumber { get; set; }

		public string Username { get; set; }

        public string Address { get; set; }

		[DefaultValue("Không xác định")]
		[RegularExpression(@"^(Nam|Nữ|Không xác định)$", ErrorMessage = "Chỉ nhận các giá trị Nam, Nữ, Hoặc Không xác định.")]
		public string? Gender { get; set; }
		public DateTime? DateOfBirth { get; set; }

		public string? Email { get; set; }
		//public string? Role { get; set; } // (Tùy chọn) Vai trò mới nếu cần
	}
}
