using JobSeekWeb.Models;
using JobSeekWeb.Models.MyClass;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JobSeekWeb.Controllers
{
    public class HomeController : Controller
    {
        private JobEntities db = new JobEntities();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult FAQ()
        {
            return View();
        }

        public ActionResult Contact()
        {
            return View();
        }
        [Authorize]
        public ActionResult PageByRole()
        {
            int asp_userId = User.Identity.GetUserId<int>();
            bool datails_completed = Worker.IsDetailsCompleted(asp_userId);
            if (Users.IsWorker(asp_userId))
            {
                return datails_completed ? RedirectToAction("Dashboard", "Amad") :
                    RedirectToAction("Profile", "Worker");
                        
            } 
            else
            {
                return RedirectToAction("Index");
            }
        }
        [HttpGet]
        public JsonResult GetCategoriesAndSkills()
        {
            var category = db.spCategories_getAll();
            var skills = db.spSkills_getAll();
            return Json(new { categories= category, skills = skills }, JsonRequestBehavior.AllowGet);
        }
    }
}