using BE.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.Services
{
    public class CategoryService
    {
        private readonly ApplicationDbContext _context;

        public CategoryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Category>> GetAllCategoriesAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<List<Category>> GetAllCategoriesActiveAsync()
        {
            return await _context.Categories
                                 .Where(c => c.IsDeleted == false)
                                 .ToListAsync();
        }

        public async Task<Category?> GetCategoryByIdAsync(int id)
        {
            return await _context.Categories
                                 .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Category?> GetCategoryActivteByIdAsync(int id)
        {
            return await _context.Categories
                                 .FirstOrDefaultAsync(c => c.Id == id && c.IsDeleted == false);
        }

        public async Task<Category> CreateCategoryAsync(Category category)
        {
            category.IsDeleted = false;
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<bool> UpdateCategoryAsync(int id, Category updatedCategory)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null || category.IsDeleted == true)
            {
                return false;
            }

            category.Name = updatedCategory.Name;
            category.Slug = updatedCategory.Slug;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> SoftDeleteCategoryAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null || category.IsDeleted == true)
            {
                return false;
            }

            category.IsDeleted = true;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> HardDeleteCategoryAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return false;
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
