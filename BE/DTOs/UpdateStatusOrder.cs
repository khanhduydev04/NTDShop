using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace BE.DTOs
{
	public class UpdateStatusOrder
	{
		//public int Id { get; set; }

		[Required(ErrorMessage = "Trạng thái không được để trống.")]
		[DefaultValue("Đã đặt hàng")]
		[RegularExpression(@"^(Đã đặt hàng|Đang vận chuyển|Đã thanh toán|Đã hủy)$", ErrorMessage = "Chỉ nhận các giá trị Đã đặt hàng, Đang vận chuyển, Đã thanh toán, Đã hủy.")]
		public required string Status { get; set; }
	}
}
