using System.ComponentModel.DataAnnotations;

namespace BE.Models.Auth
{
    public class LoginModel
    {
		[Required(ErrorMessage = "Tên đăng nhập không được để trống")]
		public string Username { get; set; }

		[Required(ErrorMessage = "Mật khẩu là bắt buộc")]
		[DataType(DataType.Password)]
		public string Password { get; set; }

		[Display(Name = "Ghi nhớ đăng nhập")]
		public bool RememberMe { get; set; }
	}
}
