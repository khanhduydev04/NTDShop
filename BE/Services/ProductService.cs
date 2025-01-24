using BE.DTOs;
using BE.Helpers;
using BE.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.Services
{
    public class ProductService
    {
        private readonly ApplicationDbContext _context;
        private readonly FirebaseStorageHelper _firebaseStorageHelper;

        public ProductService(ApplicationDbContext context, FirebaseStorageHelper firebaseStorageHelper)
        {
            _context = context;
            _firebaseStorageHelper = firebaseStorageHelper;
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

        //public async Task<List<Product>> GetActiveProductsAsync()
        //{
        //    return await _context.Products
        //                         .Where(p => p.IsDeleted == false || p.IsDeleted == null)
        //                         .Include(p => p.Category)
        //                         .Include(p => p.ProductVariants)
        //                         .Include(p => p.ProductImages)
        //                         .Include(p => p.ProductSpecifications)
        //                         .Include(p => p.ProductNeeds)
        //                            .ThenInclude(pn => pn.Need)
        //                         .ToListAsync();
        //}
        public async Task<(List<ProductResponse> Products, int TotalData, int RemainingData)> GetActiveProductsAsync(
            int? needId = null,
            int? pricingValue = null,
            string? sortOrder = null,
            string? category = null,
            string? name = null,
            int limit = 25,
            int offset = 0)
        {
            var query = _context.Products
                                .Include(p => p.Category)
                                .Where(p => !p.IsDeleted.HasValue || !p.IsDeleted.Value)
                                .AsQueryable();

            // Lọc theo categorySlug
            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(p => p.Category != null && p.Category.Slug == category);
            }

            // Lọc theo tên
            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(p => p.Name.Contains(name));
            }

            // Bộ lọc theo nhu cầu
            if (needId.HasValue)
            {
                query = query.Where(p => p.ProductNeeds.Any(pn => pn.NeedId == needId.Value));
            }

            // Bộ lọc theo mức giá
            if (pricingValue.HasValue)
            {
                switch (pricingValue.Value)
                {
                    case 1:
                        query = query.Where(p => p.ProductVariants.Any(v => v.Price < 10000000));
                        break;
                    case 2:
                        query = query.Where(p => p.ProductVariants.Any(v => v.Price >= 10000000 && v.Price <= 15000000));
                        break;
                    case 3:
                        query = query.Where(p => p.ProductVariants.Any(v => v.Price >= 15000000 && v.Price <= 30000000));
                        break;
                    case 4:
                        query = query.Where(p => p.ProductVariants.Any(v => v.Price >= 30000000 && v.Price <= 40000000));
                        break;
                    case 5:
                        query = query.Where(p => p.ProductVariants.Any(v => v.Price >= 40000000 && v.Price <= 50000000));
                        break;
                    case 6:
                        query = query.Where(p => p.ProductVariants.Any(v => v.Price > 50000000));
                        break;
                }
            }

            // Sắp xếp
            switch (sortOrder)
            {
                case "moi-nhat":
                    query = query.OrderByDescending(p => p.CreatedAt);
                    break;
                case "gia-tang-dan":
                    query = query.OrderBy(p => p.ProductVariants.Min(v => v.Price));
                    break;
                case "gia-giam-dan":
                    query = query.OrderByDescending(p => p.ProductVariants.Max(v => v.Price));
                    break;
                case "khuyen-mai":
                    query = query.OrderByDescending(p => p.ProductVariants.Max(v => v.PriceSale > 0));
                    break;
                default:
                    query = query.OrderBy(p => p.Name);
                    break;
            }

            // Tổng số sản phẩm
            int totalData = await query.CountAsync();

            // Lấy dữ liệu với phân trang
            var products = await query
            .Skip(offset)
            .Take(limit)
            .Select(p => new ProductResponse
            {
                Id = p.Id,
                Slug = p.Slug,
                Name = p.Name,
                CreatedAt = p.CreatedAt,
                Price = p.ProductVariants.FirstOrDefault() != null ? p.ProductVariants.FirstOrDefault().Price : 0, // Lấy giá trị đầu tiên hoặc 0 nếu null
                PriceSale = p.ProductVariants.FirstOrDefault() != null ? p.ProductVariants.FirstOrDefault().PriceSale : 0,
                Image = p.Thumbnail,
                Category = p.Category != null ? new CategoryResponse
                {
                    Id = p.Category.Id,
                    Name = p.Category.Name,
                    Slug = p.Category.Slug
                } : null
            })
            .ToListAsync();

            // Số sản phẩm còn lại
            int remainingData = Math.Max(0, totalData - offset - limit);

            return (products, totalData, remainingData);
        }


        public async Task<List<ProductResponse>> GetTopDiscountedProductsAsync()
        {
            return await _context.Products
                                 .Where(p => p.ProductVariants.Any(v => v.Price > 0 && v.PriceSale > 0))
                                 .OrderByDescending(p => p.ProductVariants.Max(v => (v.Price - v.PriceSale) / v.Price)) // Tính giảm giá %
                                 .Take(10) // Lấy 10 sản phẩm đầu tiên
                                 .Select(p => new ProductResponse
                                 {
                                     Id = p.Id,
                                     Slug = p.Slug,
                                     Name = p.Name,
                                     CreatedAt = p.CreatedAt,
                                     Price = p.ProductVariants.FirstOrDefault() != null ? p.ProductVariants.FirstOrDefault().Price : 0,
                                     PriceSale = p.ProductVariants.FirstOrDefault() != null ? p.ProductVariants.FirstOrDefault().PriceSale : 0,
                                     Image = p.Thumbnail,
                                     Category = p.Category != null ? new CategoryResponse
                                     {
                                         Id = p.Category.Id,
                                         Name = p.Category.Name,
                                         Slug = p.Category.Slug
                                     } : null
                                 })
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

        public async Task<List<ProductResponse>> SearchProductsByNameAsync(string keyword)
        {
            return await _context.Products
                .Where(p => p.Name.ToLower().StartsWith(keyword.ToLower()) && (!p.IsDeleted.HasValue || !p.IsDeleted.Value))
                .Include(p => p.Category)
                .Include(p => p.ProductVariants)
                .Select(p => new ProductResponse
                {
                    Id = p.Id,
                    Slug = p.Slug,
                    Name = p.Name,
                    CreatedAt = p.CreatedAt,
                    Price = p.ProductVariants.FirstOrDefault() != null ? p.ProductVariants.FirstOrDefault().Price : 0,
                    PriceSale = p.ProductVariants.FirstOrDefault() != null ? p.ProductVariants.FirstOrDefault().PriceSale : 0,
                    Image = p.Thumbnail, // Hoặc p.ProductImages.FirstOrDefault()?.Url nếu lấy từ ảnh sản phẩm
                    Category = p.Category != null ? new CategoryResponse
                    {
                        Id = p.Category.Id,
                        Name = p.Category.Name,
                        Slug = p.Category.Slug
                    } : null
                })
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

        //Function handle bussiness
        public async Task UpdateThumbnailAsync(Product existingProduct, IFormFile? newThumbnail)
        {
            if (newThumbnail != null)
            {
                var newThumbnailUrl = await _firebaseStorageHelper.UploadImageAsync(newThumbnail, "products/thumbnails");
                existingProduct.Thumbnail = newThumbnailUrl;
            }
        }

        public void UpdateProductDetails(Product existingProduct, UpdateProductDTO productDto)
        {
            if (!string.IsNullOrEmpty(productDto.Name)) existingProduct.Name = productDto.Name;
            if (!string.IsNullOrEmpty(productDto.Slug)) existingProduct.Slug = productDto.Slug;
            if (!string.IsNullOrEmpty(productDto.Description)) existingProduct.Description = productDto.Description;
            if (productDto.CategoryId.HasValue) existingProduct.CategoryId = productDto.CategoryId.Value;

            existingProduct.UpdatedAt = DateTime.Now;
        }
    }
}
