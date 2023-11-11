using ContactsApp.Data;
using ContactsApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace ContactsApp.Controllers
{
    public class ContactsController : Controller
    {
        private readonly ILogger<ContactsController> _logger;
        private readonly ApplicationDbContext _context;

        public ContactsController(ILogger<ContactsController> logger, ApplicationDbContext context)
        {
            _context = context;
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View(_context.Contacts.ToList());
        }

        public IActionResult Privacy()
        {
            return View();
        }


        public JsonResult List()
        {
            var contacts = _context.Contacts.ToList();
            return Json(contacts);
        }
    }
}