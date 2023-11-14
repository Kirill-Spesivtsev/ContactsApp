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
            return View();
        }


        public JsonResult List()
        {
            var contacts = _context.Contacts.ToList();
            return Json(contacts);
        }

        public JsonResult GetById(Guid id)
        {
            var result = _context.Contacts.Find(id);
            return Json(result);
        }

        [HttpPost]
        public JsonResult Add(Contact model)
        {
            model.Id = Guid.NewGuid();
            ModelState.Clear();
            TryValidateModel(model);

            if (ModelState.IsValid)
            {
                _context.Contacts.Add(model);
                _context.SaveChanges();
                return Json("New Contact added");
            }
            else
            {
                return Json(string.Empty);
            }
        }

        [HttpPost]
        public JsonResult Update(Contact model)
        {

            if (ModelState.IsValid)
            {
                _context.Contacts.Update(model);
                _context.SaveChanges();
                return Json("Contact updated");
            }
            else
            {
                return Json(string.Empty);
            }
        }

        [HttpPost]
        public JsonResult Delete(string id)
        {
            var model = _context.Contacts.Find(Guid.Parse(id));
            if (model != null)
            {
                _context.Contacts.Remove(model);
                _context.SaveChanges();
                return Json("Contact removed");
            }
            else
            {
                return Json(string.Empty);
            }
        }
    }
}