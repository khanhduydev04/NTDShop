using BE.Helpers;
using BE.Models;
using BE.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.Text.Json;
using BE.DTOs;
using Microsoft.Identity.Client.Extensions.Msal;

namespace BE.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ProductService _productService;
        private readonly ProductVariantService _variantService;
        private readonly ProductSpecificationService _specificationService;
        private readonly ProductImageService _imageService;
        private readonly FirebaseStorageHelper _firebaseStorageHelper;

        public ProductController(
            ApplicationDbContext context,
            ProductService productService,
            ProductVariantService variantService,
            ProductSpecificationService specificationService,
            ProductImageService imageService,
            FirebaseStorageHelper firebaseStorageHelper)
        {
            _context = context;
            _productService = productService;
            _variantService = variantService;
            _specificationService = specificationService;
            _imageService = imageService;
            _firebaseStorageHelper = firebaseStorageHelper;
        }

        // Lấy tất cả sản phẩm
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productService.GetAllProductsAsync();
            return Ok(products);
        }

        // Lấy tất cả sản phẩm còn đang bán
        [HttpGet("active")]
        public async Task<IActionResult> GetActiveProducts()
        {
            var activeProducts = await _productService.GetActiveProductsAsync();
            return Ok(activeProducts);
        }

        [HttpGet("needs")]
        public async Task<IActionResult> GetProductsByNeeds([FromQuery] List<int> needIds)
        {
            if (needIds == null || !needIds.Any())
            {
                return BadRequest(new { message = "Danh sách nhu cầu không được để trống." });
            }

            var products = await _productService.GetProductsByNeedsAsync(needIds);
            return Ok(products);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchProductsByName([FromQuery] string keyword)
        {
            if (string.IsNullOrWhiteSpace(keyword))
            {
                return BadRequest(new { message = "Từ khóa tìm kiếm không được để trống." });
            }

            var products = await _productService.SearchProductsByNameAsync(keyword);
            return Ok(products);
        }

        [HttpGet("category/{categorySlug}")]
        public async Task<IActionResult> GetProductsByCategory(string categorySlug)
        {
            var products = await _productService.GetProductsByCategorySlugAsync(categorySlug);
            return Ok(products);
        }

        [HttpGet("slug/{slug}")]
        public async Task<IActionResult> GetProductBySlug(string slug)
        {
            var product = await _productService.GetProductBySlugAsync(slug);
            if (product == null)
            {
                return NotFound(new { message = "Sản phẩm không tồn tại." });
            }

            return Ok(product);
        }

        // Lấy sản phẩm theo ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        // Thêm mới sản phẩm
        [HttpPost]
        public async Task<IActionResult> CreateProduct(
            [FromForm] ProductDTO productDto,
            [FromForm] IFormFile thumbnail,
            [FromForm] List<IFormFile> images)
        {
            if (thumbnail == null || images == null || !images.Any())
            {
                return BadRequest("Thumbnail and images are required.");
            }

            try
            {
                var productVariants = JsonSerializer.Deserialize<List<ProductVariant>>(productDto.ProductVariants);
                var productSpecifications = JsonSerializer.Deserialize<List<ProductSpecification>>(productDto.ProductSpecifications);

                if (productVariants == null || productSpecifications == null)
                {
                    return BadRequest("ProductVariants hoặc ProductSpecifications không hợp lệ.");
                }

                // Upload thumbnail
                var thumbnailUrl = await _firebaseStorageHelper.UploadImageAsync(thumbnail, "products/thumbnails");

                // Map từ DTO sang entity Product
                var product = new Product
                {
                    Name = productDto.Name,
                    Slug = productDto.Slug,
                    Description = productDto.Description,
                    Thumbnail = thumbnailUrl,
                    CategoryId = productDto.CategoryId
                };

                // Tạo danh sách các thực thể liên quan
                var productImages = new List<ProductImage>();
                var productVariantsEntities = productVariants.Select(variant => new ProductVariant
                {
                    Color = variant.Color ?? null,
                    Stock = variant.Stock,
                    Storage = variant.Storage ?? null,
                    Price = variant.Price,
                }).ToList();

                var productSpecificationsEntities = productSpecifications.Select(spec => new ProductSpecification
                {
                    Name = spec.Name,
                    Value = spec.Value
                }).ToList();

                // Upload images và tạo danh sách hình ảnh
                var imageUrls = await UploadMultipleImagesAsync(images, "products/images");
                productImages.AddRange(imageUrls.Select(url => new ProductImage { ImageUrl = url }));

                // Lưu sản phẩm và các thực thể liên quan đồng thời
                await _context.Database.BeginTransactionAsync();
                try
                {
                    // Lưu sản phẩm vào database
                    var createdProduct = await _productService.CreateProductAsync(product);

                    // Cập nhật ProductId cho các thực thể liên quan
                    foreach (var img in productImages) img.ProductId = createdProduct.Id;
                    foreach (var variant in productVariantsEntities) variant.ProductId = createdProduct.Id;
                    foreach (var spec in productSpecificationsEntities) spec.ProductId = createdProduct.Id;

                    // Thêm ProductNeeds và gắn kết quả vào createdProduct
                    if (productDto.NeedIds != null && productDto.NeedIds.Any())
                    {
                        var productNeedService = new ProductNeedService(_context);
                        var productNeeds = await productNeedService.AddProductNeedsAsync(product.Id, productDto.NeedIds);
                        createdProduct.ProductNeeds = productNeeds;
                    }

                    // Lưu các thực thể liên quan vào database
                    await _context.ProductImages.AddRangeAsync(productImages);
                    await _context.ProductVariants.AddRangeAsync(productVariantsEntities);
                    await _context.ProductSpecifications.AddRangeAsync(productSpecificationsEntities);

                    // Lưu các thay đổi vào database
                    await _context.SaveChangesAsync();
                    await _context.Database.CommitTransactionAsync();

                    return CreatedAtAction(nameof(GetProductById), new { id = createdProduct.Id }, createdProduct);
                }
                catch
                {
                    await _context.Database.RollbackTransactionAsync();
                    throw;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                return StatusCode(500, "Internal server error");
            }
        }

        // Cập nhật sản phẩm
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(
            int id,
            [FromForm] UpdateProductDTO productDto,
            [FromForm] IFormFile? newThumbnail,
            [FromForm] List<IFormFile>? newImages)
        {
            var existingProduct = await _productService.GetProductByIdAsync(id);
            if (existingProduct == null)
            {
                return NotFound(new { message = "Sản phẩm không tồn tại." });
            }

            try
            {
                var productVariants = JsonSerializer.Deserialize<List<ProductVariant>>(productDto.ProductVariants);
                var productSpecifications = JsonSerializer.Deserialize<List<ProductSpecification>>(productDto.ProductSpecifications);

                if (productVariants == null || productSpecifications == null)
                {
                    return BadRequest("ProductVariants hoặc ProductSpecifications không hợp lệ.");
                }

                await _context.Database.BeginTransactionAsync();

                // Update Thumbnail
                if (newThumbnail != null)
                {
                    var newThumbnailUrl = await _firebaseStorageHelper.UploadImageAsync(newThumbnail, "products/thumbnails");
                    existingProduct.Thumbnail = newThumbnailUrl;
                }

                // Update Images
                if (newImages != null && newImages.Any())
                {
                    var newImageUrls = await UploadMultipleImagesAsync(newImages, "products/images");

                    // Remove old images
                    var oldImages = _context.ProductImages.Where(img => img.ProductId == id).ToList();
                    _context.ProductImages.RemoveRange(oldImages);

                    // Add new images
                    var newProductImages = newImageUrls.Select(url => new ProductImage { ProductId = id, ImageUrl = url }).ToList();
                    await _context.ProductImages.AddRangeAsync(newProductImages);
                }

                // Update Variants
                var existingVariants = _context.ProductVariants.Where(v => v.ProductId == id).ToList();

                if (productVariants != null)
                {
                    foreach (var updatedVariant in productVariants)
                    {
                        // Update existing variant
                        var existingVariant = existingVariants.FirstOrDefault(v => v.Id == updatedVariant.Id);
                        if (existingVariant != null)
                        {
                            existingVariant.Color = updatedVariant.Color;
                            existingVariant.Price = updatedVariant.Price;
                            existingVariant.Stock = updatedVariant.Stock;
                            existingVariant.Storage = updatedVariant.Storage;

                            _context.Entry(existingVariant).State = EntityState.Modified;
                        }
                        else
                        {
                            // Add new variant
                            var newVariant = new ProductVariant
                            {
                                ProductId = id,
                                Color = updatedVariant.Color,
                                Price = updatedVariant.Price,
                                Stock = updatedVariant.Stock,
                                Storage = updatedVariant.Storage
                            };
                            await _context.ProductVariants.AddAsync(newVariant);
                        }
                    }

                    // Remove variants not in the updated list
                    var updatedVariantIds = productVariants.Select(v => v.Id).ToList();
                    var variantsToRemove = existingVariants.Where(v => !updatedVariantIds.Contains(v.Id)).ToList();
                    _context.ProductVariants.RemoveRange(variantsToRemove);
                }

                // Update Specifications
                var oldSpecifications = _context.ProductSpecifications.Where(spec => spec.ProductId == id).ToList();
                _context.ProductSpecifications.RemoveRange(oldSpecifications);

                var newSpecifications = productSpecifications.Select(spec => new ProductSpecification
                {
                    ProductId = id,
                    Name = spec.Name,
                    Value = spec.Value
                }).ToList();

                await _context.ProductSpecifications.AddRangeAsync(newSpecifications);

                // Update ProductNeeds
                if (productDto.NeedIds != null && productDto.NeedIds.Any())
                {
                    var productNeedService = new ProductNeedService(_context);

                    // Remove old ProductNeeds
                    await productNeedService.RemoveProductNeedsAsync(id);

                    // Add new ProductNeeds
                    var newProductNeeds = await productNeedService.AddProductNeedsAsync(id, productDto.NeedIds);
                    existingProduct.ProductNeeds = newProductNeeds;
                }

                // Update Product Details
                existingProduct.Name = productDto.Name;
                existingProduct.Slug = productDto.Slug;
                existingProduct.Description = productDto.Description;
                existingProduct.CategoryId = productDto.CategoryId;
                existingProduct.UpdatedAt = DateTime.Now;

                // Save changes to the database
                await _context.SaveChangesAsync();
                await _context.Database.CommitTransactionAsync();

                return Ok(new { message = "Sản phẩm đã được cập nhật thành công." });
            }
            catch (Exception ex)
            {
                await _context.Database.RollbackTransactionAsync();
                Console.WriteLine("Error: " + ex.Message);
                return StatusCode(500, "Lỗi server.");
            }
        }


        [HttpDelete("soft-delete/{id}")]
        public async Task<IActionResult> SoftDeleteProduct(int id)
        {
            var updatedData = new Product
            {
                IsDeleted = true,
                UpdatedAt = DateTime.Now
            };

            var result = await _productService.UpdateProductAsync(id, updatedData);
            if (result == null) // Kiểm tra nếu sản phẩm không tồn tại
            {
                return NotFound(new { message = "Sản phẩm không tồn tại." });
            }

            return Ok(new { message = "Đã xóa sản phẩm thành công (xóa mềm)." });
        }

        // Xóa sản phẩm
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var success = await _productService.DeleteProductAsync(id);
            if (!success)
            {
                return NotFound();
            }
            return NoContent();
        }

        // Hàm hỗ trợ: Upload nhiều ảnh đồng thời
        private async Task<List<string>> UploadMultipleImagesAsync(List<IFormFile> files, string folderName)
        {
            var uploadTasks = files.Select(file => _firebaseStorageHelper.UploadImageAsync(file, folderName));
            var urls = await Task.WhenAll(uploadTasks);
            return urls.ToList();
        }
    }
}
