using BE.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BE.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize(Roles = "Admin")] //quan ly nguoi dung
	public class UsersController : ControllerBase
	{
		private readonly UserManager<User> _userManager;
		private readonly SignInManager<User> _signInManager;
		private readonly RoleManager<IdentityRole> _roleManager;
		private readonly IConfiguration _configuration;
		public UsersController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration, RoleManager<IdentityRole> roleManager)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_configuration = configuration;
			_roleManager = roleManager;
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

		//them
		//sua 
		//khoa tai khoan
		//xoa nguoi dung
	}
}
