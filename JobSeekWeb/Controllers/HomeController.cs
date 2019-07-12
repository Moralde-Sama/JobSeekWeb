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
            if (Users.IsWorker(asp_userId))
            {
                return Worker.IsDetailsCompleted(asp_userId) ? RedirectToAction("Dashboard", "Worker") :
                    RedirectToAction("Details", "Worker");
                        
            }
            else if(Users.IsCompany(asp_userId)) {
                return Company.IsDetailsCompleted(User.Identity.GetUserId<int>()) ?
                    RedirectToAction("Dashboard", "Company") : 
                    RedirectToAction("DesignCompanyDetails", "Company");
            }
            else
            {
                return RedirectToAction("Index");
            }
        }
        [HttpGet]
        [Authorize]
        public JsonResult GetCategoriesAndSkills()
        {
            var category = db.spCategories_getAll();
            var skills = db.spSkills_getAll();
            return Json(new { categories= category, skills = skills }, JsonRequestBehavior.AllowGet);
        }
    }
}