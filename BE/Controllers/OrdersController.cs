using BE.Models;
using BE.Services;
using Microsoft.AspNetCore.Mvc;

namespace BE.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly OrderService _orderService;

        public OrdersController(OrderService orderService)
        {
            _orderService = orderService;
        }

        // Lấy tất cả đơn hàng
        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            try
            {
                var orders = await _orderService.GetAllOrdersAsync();
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Có lỗi xảy ra khi lấy danh sách đơn hàng.", error = ex.Message });
            }
        }

        // Lấy đơn hàng theo ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            try
            {
                var order = await _orderService.GetOrderByIdAsync(id);
                if (order == null)
                {
                    return NotFound($"Không tìm thấy đơn hàng với ID {id}");
                }
                return Ok(order);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Có lỗi xảy ra khi lấy thông tin đơn hàng.", error = ex.Message });
            }
        }

        // Lấy các đơn hàng theo CustomerId
        [HttpGet("customer/{customerId}")]
        public async Task<IActionResult> GetOrdersByCustomerId(string customerId)
        {
            try
            {
                var orders = await _orderService.GetOrdersByCustomerIdAsync(customerId);
                if (orders == null || !orders.Any())
                {
                    return NotFound($"Không tìm thấy đơn hàng nào của khách hàng ID {customerId}");
                }
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Có lỗi xảy ra khi lấy danh sách đơn hàng của khách hàng.", error = ex.Message });
            }
        }

        // Tạo mới đơn hàng
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Tạo mới đơn hàng
                var createdOrder = await _orderService.CreateOrderAsync(order);

                if (order.PaymentMethod == "Online")
                {
                    // Nếu là thanh toán online, trả về thông tin tạo URL thanh toán
                    return Ok(new
                    {
                        Message = "Đơn hàng đã được tạo. Vui lòng tiến hành thanh toán.",
                        OrderId = createdOrder!.Id
                    });
                }

                return CreatedAtAction(nameof(GetOrderById), new { id = createdOrder!.Id }, createdOrder);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Có lỗi xảy ra khi tạo mới đơn hàng.", error = ex.Message });
            }
        }

        [HttpPut("{orderId}/status")]
        public async Task<IActionResult> UpdateOrderStatus(int orderId, [FromBody] dynamic requestBody)
        {
            string paymentStatus = requestBody.PaymentStatus;
            string status = requestBody.Status;

            var success = await _orderService.UpdateOrderStatusAsync(orderId, paymentStatus, status);
            if (!success)
            {
                return NotFound(new { Message = "Không tìm thấy đơn hàng." });
            }

            return Ok(new { Message = "Cập nhật trạng thái đơn hàng thành công." });
        }

        // Cập nhật đơn hàng
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, [FromBody] Order updatedOrder)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var success = await _orderService.UpdateOrderAsync(id, updatedOrder);
                if (!success)
                {
                    return NotFound($"Không tìm thấy đơn hàng với ID {id}");
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Có lỗi xảy ra khi cập nhật đơn hàng.", error = ex.Message });
            }
        }

        // Xóa đơn hàng
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            try
            {
                var success = await _orderService.DeleteOrderAsync(id);
                if (!success)
                {
                    return NotFound($"Không tìm thấy đơn hàng với ID {id}");
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Có lỗi xảy ra khi xóa đơn hàng.", error = ex.Message });
            }
        }
    }
}
