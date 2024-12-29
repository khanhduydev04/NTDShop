using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BE.Models;
using Microsoft.AspNetCore.Authorization;

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
        public async Task<ActionResult<IEnumerable<TestModel>>> GetModelSet()
        {
            return await _context.ModelSet.ToListAsync();
        }

		// GET: api/TestModels/5
		[Authorize(Roles = "Customer")]
		[HttpGet("{id}")]
		public IActionResult CustomerEndpoint()
		{

			return Ok($"Hi");
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
