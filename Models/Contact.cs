using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ContactsApp.Models
{
    public class Contact
    {
        [Key]
        public Guid Id { get;set; }

        [Required]
        public string Name { get;set; }

        [Required]
        [DisplayName("Mobile Phone")]
        public string MobilePhone { get;set; }

        [Required]
        [DisplayName("Job Title")]
        public string JobTitle { get;set; }

        [Required]
        [DisplayName("Birth Date")]
        public DateOnly BirthDate { get;set; }

    }
}