using BE.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.Services
{
    public class ProductService
    {
        private readonly ApplicationDbContext _context;

        public ProductService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Product>> GetAllProductsAsync()
        {
            return await _context.Products
                                .Include(p => p.Category)
                                .Include(p => p.ProductVariants)
                                .Include(p => p.ProductImages)
                                .Include(p => p.ProductSpecifications)
                                .Include(p => p.ProductNeeds)
                                    .ThenInclude(pn => pn.Need)
                                .ToListAsync();
        }

        public async Task<List<Product>> GetActiveProductsAsync()
        {
            return await _context.Products
                                 .Where(p => p.IsDeleted == false || p.IsDeleted == null)
                                 .Include(p => p.Category)
                                 .Include(p => p.ProductVariants)
                                 .Include(p => p.ProductImages)
                                 .Include(p => p.ProductSpecifications)
                                 .Include(p => p.ProductNeeds)
                                    .ThenInclude(pn => pn.Need)
                                 .ToListAsync();
        }

        public async Task<Product?> GetProductBySlugAsync(string slug)
        {
            return await _context.Products
                                 .Include(p => p.Category)
                                 .Include(p => p.ProductVariants)
                                 .Include(p => p.ProductImages)
                                 .Include(p => p.ProductSpecifications)
                                 .Include(p => p.ProductNeeds)
                                    .ThenInclude(pn => pn.Need)
                                 .FirstOrDefaultAsync(p => p.Slug == slug);
        }

        public async Task<Product?> GetProductByIdAsync(int id)
        {
            return await _context.Products
                                 .Include(p => p.Category)
                                 .Include(p => p.ProductVariants)
                                 .Include(p => p.ProductImages)
                                 .Include(p => p.ProductSpecifications)
                                 .Include(p => p.ProductNeeds)
                                    .ThenInclude(pn => pn.Need)
                                 .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<List<Product>> GetProductsByNeedsAsync(List<int> needIds)
        {
            return await _context.Products
                                .Where(p => p.ProductNeeds.Any(pn => needIds.Contains(pn.NeedId)))
                                .Include(p => p.Category)
                                .Include(p => p.ProductVariants)
                                .Include(p => p.ProductImages)
                                .Include(p => p.ProductSpecifications)
                                .Include(p => p.ProductNeeds)
                                    .ThenInclude(pn => pn.Need)
                                .ToListAsync();
        }

        public async Task<List<Product>> SearchProductsByNameAsync(string keyword)
        {
            return await _context.Products
                                .Where(p => p.Name.Contains(keyword))
                                .Include(p => p.Category)
                                .Include(p => p.ProductVariants)
                                .Include(p => p.ProductImages)
                                .Include(p => p.ProductSpecifications)
                                .Include(p => p.ProductNeeds)
                                    .ThenInclude(pn => pn.Need)
                                .ToListAsync();
        }

        public async Task<List<Product>> GetProductsByCategorySlugAsync(string categorySlug)
        {
            return await _context.Products
                                .Where(p => p.Category.Slug == categorySlug)
                                .Include(p => p.Category)
                                .Include(p => p.ProductVariants)
                                .Include(p => p.ProductImages)
                                .Include(p => p.ProductSpecifications)
                                .Include(p => p.ProductNeeds)
                                    .ThenInclude(pn => pn.Need)
                                .ToListAsync();
        }

        public async Task<Product> CreateProductAsync(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            var createdProduct = await _context.Products
                                               .Include(p => p.Category)
                                               .Include(p => p.ProductVariants)
                                               .Include(p => p.ProductImages)
                                               .Include(p => p.ProductSpecifications)
                                               .Include(p => p.ProductNeeds)
                                                    .ThenInclude(pn => pn.Need)
                                               .FirstOrDefaultAsync(p => p.Id == product.Id);


            if (createdProduct == null)
            {
                throw new InvalidOperationException("The created product could not be found in the database.");
            }

            return createdProduct;
        }

        public async Task<Product?> UpdateProductAsync(int id, Product updatedProduct)
        {
            var product = await _context.Products
                                        .Include(p => p.Category)
                                        .Include(p => p.ProductVariants)
                                        .Include(p => p.ProductImages)
                                        .Include(p => p.ProductSpecifications)
                                        .Include(p => p.ProductNeeds)
                                             .ThenInclude(pn => pn.Need)
                                        .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return null;
            }

            _context.Entry(product).CurrentValues.SetValues(updatedProduct);
            await _context.SaveChangesAsync();

            return await _context.Products
                                .Include(p => p.Category)
                                .Include(p => p.ProductVariants)
                                .Include(p => p.ProductImages)
                                .Include(p => p.ProductSpecifications)
                                .Include(p => p.ProductNeeds)
                                    .ThenInclude(pn => pn.Need)
                                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return false;
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
