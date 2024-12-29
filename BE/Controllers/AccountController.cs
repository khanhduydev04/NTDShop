using BE.Models;
using BE.Models.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;

namespace BE.Controllers
{
    [Route("api/[controller]")]
	[ApiController]
	public class AccountController : ControllerBase
	{
		private readonly UserManager<User> _userManager;
		private readonly SignInManager<User> _signInManager;
		private readonly RoleManager<IdentityRole> _roleManager;
		private readonly IConfiguration _configuration;

		public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration, RoleManager<IdentityRole> roleManager)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_configuration = configuration;
			_roleManager = roleManager;
		}

		// Đăng ký người dùng
		[HttpPost("register")]
		public async Task<IActionResult> Register([FromBody] RegisterModel model)
		{

			if (ModelState.IsValid)
			{
				//kiem tra email co bi trung hay khong
				if(await _userManager.Users.AnyAsync(u => u.Email == model.Email))
				{
					return StatusCode(StatusCodes.Status409Conflict, new { message = "Email đã được sử dụng" });
				}
				//kiem tra số điện thoại co bi trung hay khong
				if (await _userManager.Users.AnyAsync(u => u.PhoneNumber == model.PhoneNumber))
				{
					return StatusCode(StatusCodes.Status409Conflict, new { message = "Số điện thoại đã được sử dụng" });
				}

				//kiểm tra username có tồn tại
				if (await _userManager.Users.AnyAsync(u => u.UserName == model.Username))
				{
					return StatusCode(StatusCodes.Status409Conflict, new { message = "Tên tài khoản đã tồn tại." });
				}
				//kiem tra role dung hay khong
				if(!await _roleManager.RoleExistsAsync(model.Role))
				{
					return StatusCode(StatusCodes.Status409Conflict, new { message = "Vai trò bạn cung cấp bị sai." });
				}

				//tao doi tuong user
				var user = new User { 

					UserName = model.Username,
					FullName = model.FullName,
					PhoneNumber = model.PhoneNumber,
					Address = model.Address,
					Email = model.Email,
					Gender = model.Gender,
					DateOfBirth = model.DateOfBirth

				};
				var result = await _userManager.CreateAsync(user, model.Password);
				if (result.Succeeded)
				{
					//them role
					var roleResult = await _userManager.AddToRoleAsync(user, model.Role);
					if (roleResult.Succeeded)
					{
						return Ok(new { Message = $"Tạo tài khoản thành công. Tài khoản {user.UserName} với vai trò {model.Role}!" });
					}
					return BadRequest(result.Errors);

				}
				return BadRequest(result.Errors);
			}

			return BadRequest(ModelState);
		}

		// Đăng nhập và lấy JWT token
		[HttpPost("login")]
		public async Task<IActionResult> Login([FromBody] LoginModel model)
		{
			if (ModelState.IsValid)
			{
				var user = await _userManager.FindByNameAsync(model.Username); //tìm kiem theo ten
				if (user != null)
				{
					//kiem tra tai khoan co khoa hay khong
					if (user.IsActive == false)
					{
						return StatusCode(StatusCodes.Status403Forbidden, new { message = "Tài khoản đã bị khóa" });
					}
					
					//dang nhap
					var result = await _signInManager.PasswordSignInAsync(user, model.Password, false, false);
					if (result.Succeeded)
					{
						var token = GenerateJwtToken(user);
						return Ok(new { Token = token });
					}
					else
					{
						return Unauthorized(new
						{
							Message = "Đăng nhập thất bại. Tài khoản hoặc mật khẩu không đúng"
						});
					}
				}
				return Unauthorized(new { Message = "Đăng nhập thất bại" });
			}

			return BadRequest(ModelState);
		}

		// Tạo JWT Token
		private string GenerateJwtToken(IdentityUser user)
		{
			var claims = new[]
			{
			new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
			new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
			new Claim(ClaimTypes.NameIdentifier, user.Id)
		};

			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var token = new JwtSecurityToken(
				_configuration["Jwt:Issuer"],
				_configuration["Jwt:Audience"],
				claims,
				expires: DateTime.Now.AddHours(1),
				signingCredentials: creds
			);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}

	}




}
