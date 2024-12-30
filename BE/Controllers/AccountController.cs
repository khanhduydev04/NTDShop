using BE.Auth;
using BE.Models;
using Microsoft.AspNetCore.Authorization;
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


		/// <summary> MÔI TRƯỜNG TEST
		private readonly string _secretKey = "supersecretkey1234500000000000000000000000000000000000000000000000000000000"; // Đảm bảo đây là SecretKey của bạn
		private readonly string _issuer = "yourIssuer";  // Cấu hình của Issuer
		private readonly string _audience = "yourAudience";  // Cấu hình của Audience
		/// </summary>


		public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration, RoleManager<IdentityRole> roleManager)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_configuration = configuration;
			_roleManager = roleManager;
		}


		//kiểm tra thông tin của token - TRONG MÔI TRƯỜNG TEST
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
					var result = await _signInManager.PasswordSignInAsync(
						user, 
						model.Password, 
						true, //Quyết định liệu cookie xác thực (authentication cookie) có được duy trì sau khi trình duyệt bị đóng hay không.
						false //lock sau so lan nhat dinh
						);
					if (result.Succeeded)
					{
						// Lấy danh sách roles
						var roles = await _userManager.GetRolesAsync(user);

						var token = GenerateJwtTokenAsync(user);

						return Ok(new { Token = token });
					}
				}
				return Unauthorized(new { Message = "Đăng nhập thất bại" });
			}

			return BadRequest(ModelState);
		}

		//thay đổi mật khẩu
		//quen mat khau
		//dat lai mat khau
		//cap nhat thong tin 
		//update dia chi giao hang
		//dang xuất

		//lay thong tin cua user hien tai
		[Authorize] // phai dang nhap moi co the xem thong tin cua minh
		[HttpGet("me")]
		public async Task<IActionResult> GetUserCurrently()
		{
			// Lấy UserId từ claims trong JWT Token
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

			// Kiểm tra nếu không có UserId
			if (string.IsNullOrEmpty(userId))
			{
				return Unauthorized("Không có người dùng nào đang đăng nhập.");
			}

			// Lấy thông tin người dùng từ UserManager
			var user = await _userManager.FindByIdAsync(userId);

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


		// Tạo JWT Token
		private async Task<string> GenerateJwtTokenAsync(User user)
		{
			//lay role cua user
			var roles = await _userManager.GetRolesAsync(user);

			var claims = new List<Claim>
			{
			new Claim(JwtRegisteredClaimNames.Sub, user.Id), //lay id khong lay username
			new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
			new Claim(ClaimTypes.NameIdentifier, user.Id),
			new Claim(ClaimTypes.Name, user.UserName),
						
		};
			// Thêm từng vai trò vào claim
			foreach (var role in roles)
			{
				claims.Add(new Claim(ClaimTypes.Role, role));
			}

			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var token = new JwtSecurityToken(
				issuer: _configuration["Jwt:Issuer"],
				audience: _configuration["Jwt:Audience"],
				claims: claims,
				expires: DateTime.Now.AddHours(2), // thoi gian cua token la 2 giờ
				signingCredentials: creds
			);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}


	}




}
