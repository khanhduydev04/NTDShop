using BE.Models;
using Microsoft.EntityFrameworkCore;

namespace BE.Services
{
    public class NeedService
    {
        private readonly ApplicationDbContext _context;

        public NeedService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Lấy tất cả nhu cầu
        public async Task<List<Need>> GetAllNeedsAsync()
        {
            return await _context.Needs.ToListAsync();
        }

        // Lấy nhu cầu theo ID
        public async Task<Need?> GetNeedByIdAsync(int id)
        {
            return await _context.Needs.FindAsync(id);
        }

        // Thêm mới nhu cầu
        public async Task<Need> CreateNeedAsync(Need need)
        {
            _context.Needs.Add(need);
            await _context.SaveChangesAsync();
            return need;
        }

        // Cập nhật nhu cầu
        public async Task<bool> UpdateNeedAsync(int id, Need updatedNeed)
        {
            var existingNeed = await _context.Needs.FindAsync(id);
            if (existingNeed == null)
                return false;

            _context.Entry(existingNeed).CurrentValues.SetValues(updatedNeed);
            await _context.SaveChangesAsync();
            return true;
        }

        // Xóa nhu cầu
        public async Task<bool> DeleteNeedAsync(int id)
        {
            var existingNeed = await _context.Needs.FindAsync(id);
            if (existingNeed == null)
                return false;

            _context.Needs.Remove(existingNeed);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
