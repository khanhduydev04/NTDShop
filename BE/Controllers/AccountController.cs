using BE.Models;
using BE.Models.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NuGet.Packaging;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;

namespace BE.Controllers
{
    [Route("api/")]
	[ApiController]
	public class AccountController : ControllerBase
	{
		private readonly UserManager<User> _userManager;
		private readonly SignInManager<User> _signInManager;
		private readonly RoleManager<IdentityRole> _roleManager;
		private readonly IConfiguration _configuration;

		private readonly string _secretKey = "supersecretkey1234500000000000000000000000000000000000000000000000000000000"; // Đảm bảo đây là SecretKey của bạn
		private readonly string _issuer = "yourIssuer";  // Cấu hình của Issuer
		private readonly string _audience = "yourAudience";  // Cấu hình của Audience

		public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration, RoleManager<IdentityRole> roleManager)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_configuration = configuration;
			_roleManager = roleManager;
		}


		//kiểm tra thông tin của token
		[HttpPost("validate-token")]
		public IActionResult ValidateToken([FromBody] TokenModel model)
		{
			if (string.IsNullOrEmpty(model.Token))
			{
				return BadRequest("Thiếu token");
			}

			try
			{
				var handler = new JwtSecurityTokenHandler();
				var jsonToken = handler.ReadToken(model.Token) as JwtSecurityToken;

				if (jsonToken == null)
				{
					return Unauthorized("Token không đúng mẫu.");
				}

				// Validate token và giải mã claims
				var validationParameters = new TokenValidationParameters
				{
					ValidateIssuer = true,
					ValidateAudience = true,
					ValidateLifetime = true,
					ValidateIssuerSigningKey = true,
					ValidIssuer = _issuer,
					ValidAudience = _audience,
					IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey))
				};

				// Xác thực token và lấy các claims
				var principal = handler.ValidateToken(model.Token, validationParameters, out var validatedToken);

				// Lấy thông tin từ claims
				var userName = principal.Identity?.Name;
				var roles = principal.Claims
									 .Where(c => c.Type == ClaimTypes.Role)
									 .Select(c => c.Value)
									 .ToList();

				// Lấy thời gian hết hạn từ token (claim 'exp' là thời gian hết hạn tính bằng giây kể từ epoch time)
				var expirationTime = jsonToken.ValidTo;
				var timeRemaining = expirationTime - DateTime.UtcNow;


				// Trả về thông tin từ token
				return Ok(new
				{
					IsAuthenticated = true,
					UserName = userName,
					Roles = roles,
					ExpirationTime = expirationTime,
					TimeRemaining = timeRemaining.TotalMinutes
				});
			}
			catch (Exception ex)
			{
				return Unauthorized($"Token bị lỗi, mã lỗi: {ex.Message}");
			}
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
						// Lấy danh sách roles
						var roles = await _userManager.GetRolesAsync(user);

						var token = GenerateJwtToken(user);

						return Ok(new { Token = token });
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
			new Claim(ClaimTypes.NameIdentifier, user.Id),
			new Claim(ClaimTypes.Name, user.UserName),

			new Claim(ClaimTypes.Role, "Customer") // Thêm claim role
		};

			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var token = new JwtSecurityToken(
				issuer: _configuration["Jwt:Issuer"],
				audience: _configuration["Jwt:Audience"],
				claims: claims,
				expires: DateTime.Now.AddMinutes(30),
				signingCredentials: creds
			);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}

	}




}
