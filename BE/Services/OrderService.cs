using BE.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.Services
{
    public class OrderService
    {
        private readonly ApplicationDbContext _context;

        public OrderService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Lấy tất cả đơn hàng
        public async Task<List<Order>> GetAllOrdersAsync()
        {
            return await _context.Orders
                .Include(o => o.OrderDetails)
                .ThenInclude(od => od.ProductVariant)
                .ThenInclude(pv => pv.Product)
                .ToListAsync();
        }

        // Lấy đơn hàng theo ID
        public async Task<Order?> GetOrderByIdAsync(int id)
        {
            return await _context.Orders
                .Include(o => o.OrderDetails)
                .ThenInclude(od => od.ProductVariant)
                .ThenInclude(pv => pv.Product)
                .FirstOrDefaultAsync(o => o.Id == id);
        }

        // Lấy các đơn hàng theo CustomerId
        public async Task<List<Order>> GetOrdersByCustomerIdAsync(string customerId)
        {
            return await _context.Orders
                .Include(o => o.OrderDetails)
                .ThenInclude(od => od.ProductVariant)
                .ThenInclude(pv => pv.Product)
                .Where(o => o.CustomerId == customerId)
                .ToListAsync();
        }

        // Tạo mới đơn hàng
        public async Task<Order?> CreateOrderAsync(Order order)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                foreach (var orderDetail in order.OrderDetails)
                {
                    var productVariant = await _context.ProductVariants.FindAsync(orderDetail.ProductVariantId);
                    if (productVariant == null)
                    {
                        throw new Exception($"Không tìm thấy biến thể sản phẩm với ID {orderDetail.ProductVariantId}.");
                    }

                    if (productVariant.Stock < orderDetail.Quantity)
                    {
                        throw new Exception($"Sản phẩm {productVariant.Product?.Name} không đủ tồn kho.");
                    }

                    productVariant.Stock -= orderDetail.Quantity;

                    orderDetail.Price = productVariant.Price;
                }

                _context.Orders.Add(order);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return order;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        // Cập nhật đơn hàng
        public async Task<bool> UpdateOrderAsync(int id, Order updatedOrder)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var existingOrder = await _context.Orders
                    .Include(o => o.OrderDetails)
                    .FirstOrDefaultAsync(o => o.Id == id);

                if (existingOrder == null)
                {
                    return false;
                }

                _context.Entry(existingOrder).CurrentValues.SetValues(updatedOrder);

                var existingDetails = existingOrder.OrderDetails.ToList();

                foreach (var existingDetail in existingDetails)
                {
                    var updatedDetail = updatedOrder.OrderDetails
                        .FirstOrDefault(od => od.Id == existingDetail.Id);

                    if (updatedDetail == null)
                    {
                        var productVariant = await _context.ProductVariants.FindAsync(existingDetail.ProductVariantId);
                        if (productVariant != null)
                        {
                            productVariant.Stock += existingDetail.Quantity;
                        }

                        _context.OrderDetails.Remove(existingDetail);
                    }
                    else
                    {
                        var productVariant = await _context.ProductVariants.FindAsync(existingDetail.ProductVariantId);
                        if (productVariant != null)
                        {
                            int stockChange = existingDetail.Quantity - updatedDetail.Quantity;

                            if (stockChange > 0)
                            {
                                productVariant.Stock += stockChange;
                            }
                            else if (productVariant.Stock >= Math.Abs(stockChange))
                            {
                                productVariant.Stock += stockChange;
                            }
                            else
                            {
                                throw new Exception($"Sản phẩm {productVariant.Product?.Name} không đủ tồn kho.");
                            }
                        }

                        _context.Entry(existingDetail).CurrentValues.SetValues(updatedDetail);
                    }
                }

                foreach (var newDetail in updatedOrder.OrderDetails.Where(od => od.Id == 0))
                {
                    var productVariant = await _context.ProductVariants.FindAsync(newDetail.ProductVariantId);
                    if (productVariant == null)
                    {
                        throw new Exception($"Không tìm thấy biến thể sản phẩm với ID {newDetail.ProductVariantId}.");
                    }

                    if (productVariant.Stock < newDetail.Quantity)
                    {
                        throw new Exception($"Sản phẩm {productVariant.Product?.Name} không đủ tồn kho.");
                    }

                    productVariant.Stock -= newDetail.Quantity;

                    existingOrder.OrderDetails.Add(newDetail);
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return true;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        // Cập nhật trạng thái đơn hàng
        public async Task<bool> UpdateOrderStatusAsync(int orderId, string paymentStatus, string status)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null)
            {
                return false;
            }

            order.PaymentStatus = paymentStatus ?? order.PaymentStatus;
            order.Status = status ?? order.Status;

            _context.Orders.Update(order);
            await _context.SaveChangesAsync();
            return true;
        }

        // Xóa đơn hàng
        public async Task<bool> DeleteOrderAsync(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderDetails)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return false;
            }

            foreach (var detail in order.OrderDetails)
            {
                var productVariant = await _context.ProductVariants.FindAsync(detail.ProductVariantId);
                if (productVariant != null)
                {
                    productVariant.Stock += detail.Quantity;
                }
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
