using Microsoft.AspNetCore.Identity;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace BE.Models
{
	public class User: IdentityUser
	{
		[Required(ErrorMessage = "Tên không được để trống")]
		[StringLength(100, ErrorMessage = "Tên không thể dài hơn 100 kí tự")]
		[Display(Name = "Họ và tên")]
		public string? FullName { get; set; }

		[Required(ErrorMessage = "Số điện thoại không được để trống")]
		[Phone(ErrorMessage = "Số điện thoại không hợp lệ")]
		[Display(Name = "Số điện thoại")]
		public override string? PhoneNumber { get; set; }

		[Required(ErrorMessage = "Địa chỉ không được để trống.")]
		public required string Address { get; set; }

		[DefaultValue("Không xác định")]
		[RegularExpression(@"^(Nam|Nữ|Không xác định)$", ErrorMessage = "Chỉ nhận các giá trị Nam, Nữ, Hoặc Không xác định.")]
		public string? Gender { get; set; }

		[Display(Name = "Ngày sinh")]
		public DateTime? DateOfBirth { get; set; }


		[Display(Name = "Hoạt động")]
		public bool IsActive { get; set; } = true;


	}
}
