using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BE.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestModelsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TestModelsController(ApplicationDbContext context)
        {
            _context = context;
        }

		// GET: api/TestModels
		[HttpGet]
		public IActionResult GetModelSet()
        {
			return Ok(new { Message = "test" });
		}

		// GET: api/TestModels/5
		[Authorize(Roles = "Customer")]
		[HttpGet("{id}")]
        public async Task<ActionResult<TestModel>> GetTestModel(int id)
        {
			// Lấy thông tin user từ token
			var userName = User.Identity?.Name;
			var roles = User.Claims
							.Where(c => c.Type == ClaimTypes.Role)
							.Select(c => c.Value)
							.ToList();

			return Ok(new
			{
				IsAuthenticated = User.Identity?.IsAuthenticated ?? false,
				UserName = userName,
				Roles = roles
			});

			return Ok(new { Message = "You are logged in with customer" });
		}

        // PUT: api/TestModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTestModel(int id, TestModel testModel)
        {
            if (id != testModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(testModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TestModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

		// POST: api/TestModels
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[Authorize(Roles = "Manager")]
		[HttpPost]
        public async Task<ActionResult<TestModel>> PostTestModel(TestModel testModel)
        {
            _context.ModelSet.Add(testModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTestModel", new { id = testModel.Id }, testModel);
        }

        // DELETE: api/TestModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTestModel(int id)
        {
            var testModel = await _context.ModelSet.FindAsync(id);
            if (testModel == null)
            {
                return NotFound();
            }

            _context.ModelSet.Remove(testModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TestModelExists(int id)
        {
            return _context.ModelSet.Any(e => e.Id == id);
        }
    }
}
