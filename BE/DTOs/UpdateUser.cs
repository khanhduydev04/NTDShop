using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace BE.DTOs
{
	public class UpdateUser
	{
		[Required(ErrorMessage = "Tên không được để trống")]
		[StringLength(100, ErrorMessage = "Tên không thể dài hơn 100 kí tự")]
		[Display(Name = "Họ và tên")]
		public required string FullName { get; set; }

		[Required(ErrorMessage = "Số điện thoại không được để trống")]
		[Phone(ErrorMessage = "Số điện thoại không hợp lệ")]
		[Display(Name = "Số điện thoại")]
		public required string PhoneNumber { get; set; }

		[Required(ErrorMessage = "Địa chỉ không được để trống.")]
		public required string Address { get; set; }

		[DefaultValue("Không xác định")]
		[RegularExpression(@"^(Nam|Nữ|Không xác định)$", ErrorMessage = "Chỉ nhận các giá trị Nam, Nữ, Hoặc Không xác định.")]
		public string? Gender { get; set; }
		public DateTime? DateOfBirth { get; set; }

		public string? Email { get; set; }
		//public string? Role { get; set; } // (Tùy chọn) Vai trò mới nếu cần
	}
}
