using System.ComponentModel.DataAnnotations;

namespace BE.DTOs
{
	public class ChangePassword
	{
		[Required(ErrorMessage = "Thiếu thông tin mật khẩu cũ.")]
		[DataType(DataType.Password)]
		public required string oldPassword { get;set;}

		[Required(ErrorMessage = "Mật khẩu là bắt buộc")]
		[DataType(DataType.Password)]
		public required string Password { get; set; }

		[Required(ErrorMessage = "Xác nhận mật khẩu là bắt buộc")]
		[DataType(DataType.Password)]
		[Compare("Password", ErrorMessage = "Mật khẩu và xác nhận mật khẩu không khớp")]
		public required string ConfirmPassword { get; set; }
	}
}
