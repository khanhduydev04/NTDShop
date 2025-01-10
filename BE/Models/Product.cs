﻿using System.ComponentModel.DataAnnotations;

namespace BE.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Tên sản phẩm là bắt buộc.")]
        [StringLength(150, ErrorMessage = "Tên sản phẩm không được vượt quá 150 ký tự.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Slug là bắt buộc.")]
        public string Slug { get; set; }

        public string? Description { get; set; }
        public string? Thumbnail { get; set; }
        public int CategoryId { get; set; }
        public Category? Category { get; set; }

        public List<ProductVariant>? ProductVariants { get; set; }
        public List<ProductImage>? ProductImages { get; set; }
        public ICollection<ProductNeed> ProductNeeds { get; set; } = new List<ProductNeed>();
        public List<ProductSpecification>? ProductSpecifications { get; set; }

        public bool? IsDeleted { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
    }
}
