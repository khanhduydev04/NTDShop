using BE.DTOs;
using BE.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BE.Controllers
{
	[Route("api/customers")]
	[ApiController]
	[Authorize(Roles = "Manager")] //quan ly nguoi dung
	public class CustomersController : ControllerBase
	{
		private readonly UserManager<User> _userManager;
		private readonly SignInManager<User> _signInManager;
		private readonly RoleManager<IdentityRole> _roleManager;
		private readonly IConfiguration _configuration;
		private readonly ApplicationDbContext _context;

		public CustomersController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration, RoleManager<IdentityRole> roleManager, ApplicationDbContext context)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_configuration = configuration;
			_roleManager = roleManager;
			_context = context;
		}

		//tim kiem
		////tim kiem theo cu the
		[HttpGet("get-user/{id}")]
		public async Task<IActionResult> GetUser(string id)
		{
			// Kiểm tra nếu không có 
			if (string.IsNullOrEmpty(id))
			{
				return Unauthorized("Thông tin bị thiếu.");
			}

			// Lấy thông tin người dùng từ UserManager
			var user = await _userManager.FindByIdAsync(id);

			if (user == null)
			{
				return NotFound("Người dùng không tồn tại.");
			}

			// Trả về thông tin người dùng dưới dạng JSON
			return Ok(new
			{
				UserId = user.Id,
				UserName = user.UserName,
				Email = user.Email,
				FullName = user.FullName, // Giả sử bạn có trường FullName trong ApplicationUser
				PhoneNumber = user.PhoneNumber,
				Adress = user.Address,
				Gender = user.Gender,
				DateOfBirth = user.DateOfBirth,
				IsActive = user.IsActive,
			});
		}

		//// tim kiem tat ca
		[HttpGet]
		public async Task<IActionResult> GetAllCustomers()
		{

			var users = await _userManager.GetUsersInRoleAsync("Customer"); // lay tat ca user voi vai tro Customer
			return Ok(users);
		}
		//them

		//sua 
		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateUser(string id, [FromBody] UpdateUser updateUserDto)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			// Tìm người dùng theo ID
			var user = await _userManager.FindByIdAsync(id);
			if (user == null)
				return NotFound("không tìm thấy người dùng.");

			// Cập nhật thông tin người dùng			
			user.FullName = updateUserDto.FullName ?? user.FullName;
			user.PhoneNumber = updateUserDto.PhoneNumber ?? user.PhoneNumber;
			user.Address = updateUserDto.Address ?? user.Address;
			user.Gender = updateUserDto.Gender ?? user.Gender;
			user.DateOfBirth = updateUserDto.DateOfBirth ?? user.DateOfBirth;
			user.Email = updateUserDto.Email ?? user.Email;

			// Lưu các thay đổi
			var result = await _userManager.UpdateAsync(user);
			if (!result.Succeeded)
				return BadRequest(result.Errors);

			return Ok(new { message = "Cập nhật thông tin người dùng thành công!" });
		}
		//khoa tai khoan
		[HttpPatch("soft-delete/{id}")]
		public async Task<IActionResult> SoftDeleteUser(string id)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			var user =  await _userManager.FindByIdAsync(id);

			if (user == null)
				return NotFound("không tìm thấy người dùng.");


			user.IsActive = false; //chỉ khóa tài khoản của người dùng
			return Ok(new { message = $"Người dùng {user.UserName} đã ngừng hoạt động" });
		}

		//xoa nguoi dung
		[HttpDelete("{id}")]
		public async Task<IActionResult> HardDeleteUser(string id)
		{
			// Tìm người dùng theo ID
			var user = await _userManager.FindByIdAsync(id);
			if (user == null)
				return NotFound(new { message = "Không tìm thấy người dùng." });

			// Xóa người dùng
			var result = await _userManager.DeleteAsync(user);
			if (!result.Succeeded)
				return BadRequest(result.Errors);

			return Ok(new { message = "Xóa người dùng thành công!" });
		}
	}
}
