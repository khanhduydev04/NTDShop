//using BE.Helpers;
//﻿using BE.Config;
//using BE.Models;
//using BE.Services;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.IdentityModel.Tokens;
//using System.Text;
//using Microsoft.OpenApi.Models;


//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.


////Cấu hình database
//var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
//builder.Services.AddDbContext<ApplicationDbContext>(options =>
//	options.UseSqlServer(connectionString));


/////////////////////////////////////////////////////////////////
////cấu hình identity
//builder.Services.AddIdentity<User, IdentityRole>(options =>
//{
//	//mat khau mac dinh
//	options.Password.RequireDigit = false;  // khong yeu cau so
//	options.Password.RequireLowercase = false;  // khong yeu cau chu viet thuong
//	options.Password.RequireUppercase = false;  // // hoa
//	options.Password.RequireNonAlphanumeric = false;  // k yc ky tu dac biet
//	options.Password.RequiredLength = 6;  // max 6
//	options.Password.RequiredUniqueChars = 1;  // 
//	options.SignIn.RequireConfirmedEmail = false; // k yc xac thuc email
//})
//	.AddEntityFrameworkStores<ApplicationDbContext>()
//	.AddDefaultTokenProviders();


//builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
////cấu hình jwt
//builder.Services.AddAuthentication(options =>
//{
//	options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//	options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//	options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
//})
//	.AddJwtBearer(options =>
//	{
//		options.RequireHttpsMetadata = false;
//		options.SaveToken = true;
//		options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
//		{
//			ValidateIssuer = true,
//			ValidateAudience = false,
//			ValidateLifetime = true,
//			ValidateIssuerSigningKey = true,
//			ValidIssuer = builder.Configuration["Jwt:Issuer"],
//			ValidAudience = builder.Configuration["Jwt:Audience"],
//			IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(
//				Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"]))
//		};
//	});
//// Thêm Authorization
////Cấu hình Authorize
//builder.Services.AddAuthorization(options =>
//{
//	// Policy cho Customer
//	options.AddPolicy("CustomerOnly", policy =>
//		policy.RequireRole("Customer"));

//	// Policy cho Manager
//	options.AddPolicy("ManagerOnly", policy =>
//		policy.RequireRole("Manager"));

//	// Policy cho Admin và Customer (nếu cần)
//	options.AddPolicy("ManagerOrCustomer", policy =>
//		policy.RequireRole("Manager", "Customer"));
//});

////////////////////////////////////////////////////



//builder.Services.AddControllers();
//// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen(options =>
//{
//    // Cấu hình Swagger để hỗ trợ kiểu IFormFile
//    options.MapType<IFormFile>(() => new OpenApiSchema { Type = "string", Format = "binary" });

//    // Cấu hình Swagger cho các kiểu dữ liệu khác nếu cần
//    // Ví dụ: options.MapType<YourModelType>(() => new OpenApiSchema { ... });
//});



//// Configure Firebase
//FirebaseConfig.InitializeFirebase();

//// Register Service
//builder.Services.AddScoped<CategoryService>();

//// Register FirebaseStorageHelper to container DI
//builder.Services.AddSingleton<FirebaseStorageHelper>();


//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//app.UseHttpsRedirection();

////////////////////////////////////////////////////
//// Kích hoạt Authentication và Authorization
//app.UseAuthentication();
//app.UseAuthorization();
/////////////////////////////////////////////////////

//app.MapControllers();


/////////////////////////////////////////////////////
////cac dich vu su dung
//using (var scope = app.Services.CreateScope())
//{
//	var services = scope.ServiceProvider;
//	await SeedRoleData.Initialize(services); //tao cac role ke thua user
//}
/////////////////////////////////////////////////////
//app.Run();

using BE.Config;
using BE.Helpers;
using BE.Models;
using BE.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// ConfigureServices: cấu hình các dịch vụ cho ứng dụng
var services = builder.Services;
var configuration = builder.Configuration;

// Cấu hình DbContext với SQL Server
services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

// Cấu hình Controllers
services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
    });

// Đăng ký các dịch vụ (Dependency Injection)
services.AddScoped<CategoryService>();
services.AddScoped<ProductService>();
services.AddScoped<ProductVariantService>();
services.AddScoped<ProductSpecificationService>();
services.AddScoped<ProductImageService>();
services.AddScoped<NeedService>();
services.AddScoped<ProductNeedService>();

// Đăng ký FirebaseStorageHelper
services.AddSingleton<FirebaseStorageHelper>();

// Cấu hình Identity
services.AddIdentity<User, IdentityRole>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 6;
    options.Password.RequiredUniqueChars = 1;
    options.SignIn.RequireConfirmedEmail = false;
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

// Cấu hình JWT Authentication
services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = configuration["Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:SecretKey"]))
    };
});

// Cấu hình Authorization
services.AddAuthorization(options =>
{
    options.AddPolicy("CustomerOnly", policy => policy.RequireRole("Customer"));
    options.AddPolicy("ManagerOnly", policy => policy.RequireRole("Manager"));
    options.AddPolicy("ManagerOrCustomer", policy => policy.RequireRole("Manager", "Customer"));
});

// Cấu hình Swagger
services.AddEndpointsApiExplorer();
services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
    options.MapType<IFormFile>(() => new OpenApiSchema { Type = "string", Format = "binary" });
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter 'Bearer' [space] and then your token in the text input below."
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// Configure Firebase
FirebaseConfig.InitializeFirebase();

var app = builder.Build();

// Middleware pipeline configuration
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Seed roles on startup
using (var scope = app.Services.CreateScope())
{
    var scopedServices = scope.ServiceProvider;
    await SeedRoleData.Initialize(scopedServices);
}

app.Run();
