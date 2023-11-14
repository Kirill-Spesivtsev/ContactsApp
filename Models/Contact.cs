using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ContactsApp.Models
{
    public class Contact
    {
        [Key]
        public Guid Id { get;set; }

        [Required(ErrorMessage = "Mobile Phone is required")]
        public string Name { get;set; }

        [Required(ErrorMessage = "Mobile Phone is required")]
        [DisplayName("Mobile Phone")]
        public string MobilePhone { get;set; }

        [Required(ErrorMessage = "Job Title is required")]
        [DisplayName("Job Title")]
        public string JobTitle { get;set; }

        [Required(ErrorMessage = "Birth Date is required")]
        [DisplayName("Birth Date")]
        public DateTime BirthDate {get;set;}

    }
}