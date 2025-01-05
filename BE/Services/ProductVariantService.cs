using BE.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.Services
{
    public class ProductVariantService
    {
        private readonly ApplicationDbContext _context;

        public ProductVariantService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<ProductVariant>> GetVariantsByProductIdAsync(int productId)
        {
            return await _context.ProductVariants
                                 .Where(pv => pv.ProductId == productId)
                                 .ToListAsync();
        }

        public async Task<ProductVariant?> GetVariantByIdAsync(int id)
        {
            return await _context.ProductVariants.FindAsync(id);
        }

        public async Task<ProductVariant> CreateVariantAsync(ProductVariant variant)
        {
            _context.ProductVariants.Add(variant);
            await _context.SaveChangesAsync();
            return variant;
        }

        public async Task<bool> UpdateVariantAsync(int id, ProductVariant updatedVariant)
        {
            var variant = await _context.ProductVariants.FindAsync(id);
            if (variant == null)
            {
                return false;
            }

            variant.Color = updatedVariant.Color;
            variant.Storage = updatedVariant.Storage;
            variant.Price = updatedVariant.Price;
            variant.Stock = updatedVariant.Stock;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteVariantAsync(int id)
        {
            var variant = await _context.ProductVariants.FindAsync(id);
            if (variant == null)
            {
                return false;
            }

            _context.ProductVariants.Remove(variant);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
