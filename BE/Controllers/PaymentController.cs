using BE.Models;
using BE.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BE.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class PaymentController : ControllerBase
	{
		private readonly IVnPayService _vnPayService;

		public PaymentController(IVnPayService vnPayService)
		{
			_vnPayService = vnPayService;
		}

		/// <summary>
		/// Tạo URL thanh toán VNPay
		/// </summary>
		/// <param name="model">Thông tin thanh toán</param>
		/// <returns>URL thanh toán</returns>
		[HttpPost("create-payment-url")]
		public IActionResult CreatePaymentUrl([FromBody] PaymentInformationModel model)
		{
			if (model == null)
			{
				return BadRequest(new { Message = "Dữ liệu thanh toán không hợp lệ." });
			}

			var paymentUrl = _vnPayService.CreatePaymentUrl(model, HttpContext);
			return Ok(new { PaymentUrl = paymentUrl });
		}

		/// <summary>
		/// Xử lý phản hồi từ VNPay
		/// </summary>
		/// <returns>Kết quả thanh toán</returns>
		/// 
		[HttpGet("payment-callback")]
		public IActionResult PaymentCallback()
		{
			var response = _vnPayService.PaymentExecute(Request.Query);

			if (response.Success)
			{
				return Ok(new
				{
					Message = "Thanh toán thành công!",
					Data = response
				});
			}
			else
			{
				return BadRequest(new
				{
					Message = "Thanh toán thất bại!",
					Data = response
				});
			}
		}
	}
}
