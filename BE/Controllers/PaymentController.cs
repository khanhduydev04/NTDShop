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
        private readonly IConfiguration _configuration;
        private readonly OrderService _orderService;

        public PaymentController(IVnPayService vnPayService, IConfiguration configuration, OrderService orderService)
        {
            _vnPayService = vnPayService;
            _configuration = configuration;
            _orderService = orderService;
        }

        [HttpPost("create-payment-url")]
        public async Task<IActionResult> CreatePaymentUrl([FromBody] PaymentInformationModel model)
        {
            if (model == null)
            {
                return BadRequest(new { Message = "Dữ liệu thanh toán không hợp lệ." });
            }

            // Kiểm tra xem đơn hàng có tồn tại không
            var order = await _orderService.GetOrderByIdAsync(int.Parse(model.OrderId));
            if (order == null)
            {
                return NotFound(new { Message = "Không tìm thấy đơn hàng." });
            }

            // Tạo URL thanh toán
            var paymentUrl = _vnPayService.CreatePaymentUrl(model, HttpContext);
            return Ok(new { PaymentUrl = paymentUrl });
        }

        [HttpGet("payment-callback")]
        public async Task<IActionResult> PaymentCallback()
        {
            var response = _vnPayService.PaymentExecute(Request.Query);

            // Xác định trạng thái thanh toán
            var orderId = int.Parse(response.OrderId);
            var success = response.Success;

            // Cập nhật trạng thái đơn hàng
            if (success)
            {
                await _orderService.UpdateOrderStatusAsync(orderId, "Paid", "Success");
            }
            else
            {
                await _orderService.UpdateOrderStatusAsync(orderId, "Unpaid", "Failed");
            }

            // Redirect về URL callback client
            var clientReturnUrl = _configuration["PaymentCallBack:ReturnUrl"];
            var finalRedirectUrl = $"{clientReturnUrl}?success={success}&orderId={response.OrderId}";
            return Redirect(finalRedirectUrl);
        }
    }
}
