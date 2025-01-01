using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BE.Models;
using BE.DTOs;

namespace BE.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders
                .Include(o => o.Manager)
                .Include(o => o.Manager) //lay nguoi quan ly don hang
                .Include(o => o.OrderDetails) // lay chi tiet don hang
                .ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders
                    .Where(o => o.Id == id)
                    .Include(o => o.Customer)
                    .Include(o => o.OrderDetails) // lay danh sach chi tiet order trong order
                        .ThenInclude(op => op.Product) // lay thong tin cua product trong danh sach chi tiet
                            .ThenInclude(opc => opc.Category) // lay ten category trong product
                    .FirstOrDefaultAsync();

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.Id }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound(new { message = "Đơn hàng không tồn tại." });
            }

            //xoa chi tiet don hang
            if (order.OrderDetails != null && order.OrderDetails.Any())
            {
                _context.OrderDetails.RemoveRange(order.OrderDetails);
            }

            //xoa hoa ddonw
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync(); //luu

            return Ok(new { message = "Hóa đơn và các chi tiết liên quan đã được xóa thành công." });
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }

        //cap nhat trang thai
        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] UpdateStatusOrder updateStatusOrder)
        {
			// Kiểm tra nếu có lỗi khi áp dụng thay đổi
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			// Tìm đơn hàng cần cập nhật
			var order = await _context.Orders.FindAsync(id);
			if (order == null)
			{
				return NotFound(new { message = "Đơn hàng không tồn tại." });
			}

            order.Status = updateStatusOrder.Status;

			// Lưu thay đổi
			_context.Entry(order).State = EntityState.Modified;
			await _context.SaveChangesAsync();

			return Ok(new { message = "Cập nhật trạng thái thành công.", order });
		}

		//dat hang
        /////
        /// nhap vao mot gio hang gom cac chi tiet trong gio hang
        /// tao don hang
        /// them chi tiet don hang dua vao chi tiet gio hang
        ////
		}
}
