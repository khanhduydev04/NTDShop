using System.ComponentModel.DataAnnotations;

namespace BE.Models
{
    public class Need
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Tên nhu cầu là bắt buộc.")]
        [StringLength(100, ErrorMessage = "Tên nhu cầu không được vượt quá 100 ký tự.")]
        public string Name { get; set; }

        //public List<ProductNeed>? ProductNeeds { get; set; }
    }
}
