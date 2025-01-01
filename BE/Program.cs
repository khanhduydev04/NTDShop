using BE.Helpers;
﻿using BE.Config;
using BE.Models;
using BE.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


//Cấu hình database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
	options.UseSqlServer(connectionString));


///////////////////////////////////////////////////////////////
//cấu hình identity
builder.Services.AddIdentity<User, IdentityRole>(options =>
{
	//mat khau mac dinh
	options.Password.RequireDigit = false;  // khong yeu cau so
	options.Password.RequireLowercase = false;  // khong yeu cau chu viet thuong
	options.Password.RequireUppercase = false;  // // hoa
	options.Password.RequireNonAlphanumeric = false;  // k yc ky tu dac biet
	options.Password.RequiredLength = 6;  // max 6
	options.Password.RequiredUniqueChars = 1;  // 
	options.SignIn.RequireConfirmedEmail = false; // k yc xac thuc email
})
	.AddEntityFrameworkStores<ApplicationDbContext>()
	.AddDefaultTokenProviders();


builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
//cấu hình jwt
builder.Services.AddAuthentication(options =>
{
	options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
	options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
	.AddJwtBearer(options =>
	{
		options.RequireHttpsMetadata = false;
		options.SaveToken = true;
		options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
		{
			ValidateIssuer = true,
			ValidateAudience = false,
			ValidateLifetime = true,
			ValidateIssuerSigningKey = true,
			ValidIssuer = builder.Configuration["Jwt:Issuer"],
			ValidAudience = builder.Configuration["Jwt:Audience"],
			IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(
				Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"]))
		};
	});
// Thêm Authorization
//Cấu hình Authorize
builder.Services.AddAuthorization(options =>
{
	// Policy cho Customer
	options.AddPolicy("CustomerOnly", policy =>
		policy.RequireRole("Customer"));

	// Policy cho Manager
	options.AddPolicy("ManagerOnly", policy =>
		policy.RequireRole("Manager"));

	// Policy cho Admin và Customer (nếu cần)
	options.AddPolicy("ManagerOrCustomer", policy =>
		policy.RequireRole("Manager", "Customer"));
});

//////////////////////////////////////////////////



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    // Cấu hình Swagger để hỗ trợ kiểu IFormFile
    options.MapType<IFormFile>(() => new OpenApiSchema { Type = "string", Format = "binary" });

    // Cấu hình Swagger cho các kiểu dữ liệu khác nếu cần
    // Ví dụ: options.MapType<YourModelType>(() => new OpenApiSchema { ... });
});



// Configure Firebase
FirebaseConfig.InitializeFirebase();

// Register Service
builder.Services.AddScoped<CategoryService>();

// Register FirebaseStorageHelper to container DI
builder.Services.AddSingleton<FirebaseStorageHelper>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//////////////////////////////////////////////////
// Kích hoạt Authentication và Authorization
app.UseAuthentication();
app.UseAuthorization();
///////////////////////////////////////////////////

app.MapControllers();


///////////////////////////////////////////////////
//cac dich vu su dung
using (var scope = app.Services.CreateScope())
{
	var services = scope.ServiceProvider;
	await SeedRoleData.Initialize(services); //tao cac role ke thua user
}
///////////////////////////////////////////////////
app.Run();
