using BE.Models;
using BE.Services;
using Microsoft.AspNetCore.Mvc;

namespace BE.Controllers
{
    [Route("api/needs")]
    [ApiController]
    public class NeedController : ControllerBase
    {
        private readonly NeedService _needService;

        public NeedController(NeedService needService)
        {
            _needService = needService;
        }

        // Lấy tất cả nhu cầu
        [HttpGet]
        public async Task<IActionResult> GetAllNeeds()
        {
            var needs = await _needService.GetAllNeedsAsync();
            return Ok(needs);
        }

        // Lấy nhu cầu theo ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetNeedById(int id)
        {
            var need = await _needService.GetNeedByIdAsync(id);
            if (need == null)
                return NotFound(new { message = "Nhu cầu không tồn tại." });

            return Ok(need);
        }

        // Thêm mới nhu cầu
        [HttpPost]
        public async Task<IActionResult> CreateNeed([FromBody] Need need)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdNeed = await _needService.CreateNeedAsync(need);
            return CreatedAtAction(nameof(GetNeedById), new { id = createdNeed.Id }, createdNeed);
        }

        // Cập nhật nhu cầu
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNeed(int id, [FromBody] Need updatedNeed)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _needService.UpdateNeedAsync(id, updatedNeed);
            if (!result)
                return NotFound(new { message = "Nhu cầu không tồn tại." });

            return NoContent();
        }

        // Xóa nhu cầu
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNeed(int id)
        {
            var result = await _needService.DeleteNeedAsync(id);
            if (!result)
                return NotFound(new { message = "Nhu cầu không tồn tại." });

            return NoContent();
        }
    }
}
