using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JobSeekWeb.Controllers
{
    public class AdministratorController : Controller
    {
        // GET: Administrator
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Changepassword()
        {
            return View();
        }
        public ActionResult RemoveWC()
        {
            return View();
        }
        public ActionResult RemovePost()
        {
            return View();
        }
        public ActionResult Display()
        {
            return View();
        }
    }
}