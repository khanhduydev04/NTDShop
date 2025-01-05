using BE.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.Services
{
    public class ProductImageService
    {
        private readonly ApplicationDbContext _context;

        public ProductImageService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<ProductImage>> GetImagesByProductIdAsync(int productId)
        {
            return await _context.ProductImages
                                 .Where(pi => pi.ProductId == productId)
                                 .ToListAsync();
        }

        public async Task<ProductImage> AddImageAsync(ProductImage image)
        {
            _context.ProductImages.Add(image);
            await _context.SaveChangesAsync();
            return image;
        }

        public async Task<bool> DeleteImageAsync(int id)
        {
            var image = await _context.ProductImages.FindAsync(id);
            if (image == null)
            {
                return false;
            }

            _context.ProductImages.Remove(image);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
