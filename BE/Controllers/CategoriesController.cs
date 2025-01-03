using BE.Helpers;
using BE.Models;
using BE.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BE.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly CategoryService _categoryService;
        private readonly FirebaseStorageHelper _firebaseStorageHelper;

        public CategoriesController(CategoryService categoryService, FirebaseStorageHelper firebaseStorageHelper)
        {
            _categoryService = categoryService;
            _firebaseStorageHelper = firebaseStorageHelper;
        }

        // Lấy tất cả danh mục (bao gồm cả những danh mục bị xóa mềm)
        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _categoryService.GetAllCategoriesAsync();
            return Ok(categories);
        }

        // Lấy tất cả danh mục hoạt động (không bị xóa mềm)
        [HttpGet("active")]
        public async Task<IActionResult> GetAllActiveCategories()
        {
            var activeCategories = await _categoryService.GetAllCategoriesActiveAsync();
            return Ok(activeCategories);
        }

        // Lấy danh mục theo ID (bao gồm cả những danh mục bị xóa mềm)
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            var category = await _categoryService.GetCategoryByIdAsync(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        // Lấy danh mục theo ID nhưng chỉ khi danh mục đang hoạt động
        [HttpGet("active/{id}")]
        public async Task<IActionResult> GetActiveCategoryById(int id)
        {
            var category = await _categoryService.GetCategoryActivteByIdAsync(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromForm] Category category, [FromForm] IFormFile? logo)
        {
            if (logo == null)
            {
                return BadRequest("Logo file is required.");
            }

            try
            {
                // Gọi phương thức UploadImageAsync mà không cần truyền contentType
                var logoUrl = await _firebaseStorageHelper.UploadImageAsync(logo, "categories");

                category.Logo = logoUrl;

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var createdCategory = await _categoryService.CreateCategoryAsync(category);
                return CreatedAtAction(nameof(GetCategoryById), new { id = createdCategory.Id }, createdCategory);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, Category updatedCategory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var success = await _categoryService.UpdateCategoryAsync(id, updatedCategory);
            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPatch("soft-delete/{id}")]
        public async Task<IActionResult> SoftDeleteCategory(int id)
        {
            var success = await _categoryService.SoftDeleteCategoryAsync(id);
            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }

        // Xóa hoàn toàn danh mục
        [HttpDelete("{id}")]
        public async Task<IActionResult> HardDeleteCategory(int id)
        {
            var success = await _categoryService.HardDeleteCategoryAsync(id);
            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
