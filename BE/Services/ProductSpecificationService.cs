using BE.DTOs;
using BE.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace BE.Services
{
    public class ProductSpecificationService
    {
        private readonly ApplicationDbContext _context;

        public ProductSpecificationService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<ProductSpecification>> GetSpecificationsByProductIdAsync(int productId)
        {
            return await _context.ProductSpecifications
                                 .Where(ps => ps.ProductId == productId)
                                 .ToListAsync();
        }

        public async Task<ProductSpecification> CreateSpecificationAsync(ProductSpecification specification)
        {
            _context.ProductSpecifications.Add(specification);
            await _context.SaveChangesAsync();
            return specification;
        }

        public async Task<bool> DeleteSpecificationAsync(int id)
        {
            var specification = await _context.ProductSpecifications.FindAsync(id);
            if (specification == null)
            {
                return false;
            }

            _context.ProductSpecifications.Remove(specification);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
