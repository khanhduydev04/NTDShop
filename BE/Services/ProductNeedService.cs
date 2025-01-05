using BE.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.Services
{
    public class ProductNeedService
    {
        private readonly ApplicationDbContext _context;

        public ProductNeedService(ApplicationDbContext context)
        {
            _context = context;
        }

        //public async Task AddProductNeedsAsync(int productId, List<int> needIds)
        //{
        //    var productNeeds = needIds.Select(needId => new ProductNeed
        //    {
        //        ProductId = productId,
        //        NeedId = needId
        //    }).ToList();

        //    await _context.ProductNeeds.AddRangeAsync(productNeeds);
        //    await _context.SaveChangesAsync();
        //}

        public async Task<List<ProductNeed>> AddProductNeedsAsync(int productId, List<int> needIds)
        {
            // Thêm các ProductNeed mới
            var productNeeds = needIds.Select(needId => new ProductNeed
            {
                ProductId = productId,
                NeedId = needId
            }).ToList();

            await _context.ProductNeeds.AddRangeAsync(productNeeds);
            await _context.SaveChangesAsync();

            // Truy vấn lại dữ liệu để lấy thông tin Need
            var result = await _context.ProductNeeds
                .Where(pn => pn.ProductId == productId && needIds.Contains(pn.NeedId))
                .Include(pn => pn.Need) // Kết hợp với bảng Need
                .ToListAsync();

            return result;
        }

        public async Task RemoveProductNeedsAsync(int productId)
        {
            var productNeeds = _context.ProductNeeds.Where(pn => pn.ProductId == productId);
            _context.ProductNeeds.RemoveRange(productNeeds);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProductNeedsAsync(int productId, List<int> newNeedIds)
        {
            await RemoveProductNeedsAsync(productId);
            await AddProductNeedsAsync(productId, newNeedIds);
        }
    }
}
