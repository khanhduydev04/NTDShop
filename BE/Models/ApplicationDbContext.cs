using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BE.Models
{
	public class ApplicationDbContext: IdentityDbContext<User>
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
	   : base(options)
		{
		}
		public DbSet<TestModel> ModelSet { get; set; }
	}
}
