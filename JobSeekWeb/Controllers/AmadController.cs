using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using JobSeekWeb.Extensions;
using JobSeekWeb.Models.MyClass;

namespace JobSeekWeb.Controllers
{
    public class AmadController : Controller
    {
        // GET: Amad
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Register()
        {
            return View();
        }
        public ActionResult Login()
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
        [Authorize (Roles = "Worker")]
        public ActionResult Dashboard()
        {
            return View();
        }
    }
}