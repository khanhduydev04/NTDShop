using BE.Config;
using BE.Helpers;
using BE.Models;
using BE.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

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

// Add DbContext
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

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

app.UseAuthorization();

app.MapControllers();

app.Run();
