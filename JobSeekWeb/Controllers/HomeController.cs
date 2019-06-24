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
                return (Worker.IsDetailsCompleted(asp_userId)) ? RedirectToAction("Profile", "Worker") :
                        RedirectToAction("Dashboard", "Worker");
            } 
            else
            {
                return RedirectToAction("Index");
            }
        }
    }
}