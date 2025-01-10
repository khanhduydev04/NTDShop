using BE.Helpers;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BE.Models
{
	public class Order
	{
		public int Id { get; set; }


		[DataType(DataType.Date)]
		[Required(ErrorMessage = "Ngày đặt hàng không được để trống")]
		public DateOnly DateOrder { get; set; }

		[DataType(DataType.Date)]
		[DateNotAfter(nameof(DateOrder), ErrorMessage = "Ngày nhận không được nhỏ hơn ngày đặt hàng")]
		public DateOnly? DateReceive { get; set; }

		[Required(ErrorMessage = "Chi phí vận chuyển là bắt buộc.")]
		[Range(0, double.MaxValue, ErrorMessage = "Chi phí vận chuyển không được nhỏ hơn 0.")]
		public double DeliveryCost { get; set; }

		[Required(ErrorMessage = "Trạng thái không được để trống.")]
		[DefaultValue("Đã đặt hàng")]
		[RegularExpression(@"^(Đã đặt hàng|Đang vận chuyển|Đã thanh toán|Đã hủy)$", ErrorMessage = "Chỉ nhận các giá trị Đã đặt hàng, Đang vận chuyển, Đã thanh toán, Đã hủy.")]
		public required string Status { get; set; }

		public string? Note { get; set; }

		public Boolean IsActive { get; set; } = true;

		[Required(ErrorMessage = "Địa chỉ giao hàng không được để trống.")]
		public required string Address { get; set; }

		public string PaymentMethod { get; set; } = "COD";

		public DateTime Create_at { get; set; } = DateTime.UtcNow;
		public DateTime? Update_at { get; set; }

		[ForeignKey(nameof(User.Id))] // khoa ngoai lien ket voi bang User
		public string? ManagerId { get; set; }
		public User? Manager { get; set; }

		[ForeignKey(nameof(User.Id))] // khoa ngoai lien ket voi bang User
		public string? CustomerId { get; set; }
		public User? Customer { get; set; } // order chi co 1 khach hang

		public List<OrderDetail>? OrderDetails { get; set; } // mot order co nhieu ordeDetail
	}
}
