using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;

namespace BE.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Slug { get; set; }
        public int Price { get; set; }
        public string Cpu { get; set; }
        public int Ram { get; set; }
        public double Weight { get; set; }
        public double Screen { get; set; }
        public string Card { get; set; }
        public int Rom { get; set; }
        public string Color { get; set; }
        public string Material { get; set; }
        public int Stock { get; set; }
        public bool IsActive { get; set; }

        [ForeignKey(nameof(Category.Id))] // khoa ngoai voi category
        public int? CategoryId { get; set; }
        public Category? Category { get; set; } // mot product chi co 1 category

    }
}
