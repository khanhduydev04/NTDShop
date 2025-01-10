﻿using BE.Models;
using System.ComponentModel.DataAnnotations;

namespace BE.DTOs
{
    public class ProductDTO
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
        public bool? IsDeleted { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        public List<int> NeedIds { get; set; } = new List<int>();

        [Required(ErrorMessage = "ProductVariants là bắt buộc.")]
        public required string ProductVariants { get; set; }

        [Required(ErrorMessage = "ProductSpecifications là bắt buộc.")]
        public required string ProductSpecifications { get; set; }
    }
}