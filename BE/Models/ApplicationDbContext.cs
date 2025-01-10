using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BE.Models
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductVariant> ProductVariants { get; set; }
        public DbSet<ProductSpecification> ProductSpecifications { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<Need> Needs { get; set; }
        public DbSet<ProductNeed> ProductNeeds { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Khóa chính kết hợp cho ProductNeed
            modelBuilder.Entity<ProductNeed>()
                .HasKey(pn => new { pn.ProductId, pn.NeedId });

            // Thiết lập quan hệ
            modelBuilder.Entity<ProductNeed>()
                .HasOne(pn => pn.Product)
                .WithMany(p => p.ProductNeeds)
                .HasForeignKey(pn => pn.ProductId);

            modelBuilder.Entity<ProductNeed>()
                .HasOne(pn => pn.Need)
                .WithMany()
                .HasForeignKey(pn => pn.NeedId);

            // Các cấu hình khác...
            modelBuilder.Entity<Category>().Property(c => c.IsDeleted).HasDefaultValue(false);

            modelBuilder.Entity<Product>()
                .HasMany(p => p.ProductSpecifications)
                .WithOne(ps => ps.Product)
                .HasForeignKey(ps => ps.ProductId);

            // Định nghĩa độ chính xác cho giá trị Price
            modelBuilder.Entity<ProductVariant>()
               .Property(pv => pv.Price)
               .HasPrecision(18, 2); 
                }
    }
}
