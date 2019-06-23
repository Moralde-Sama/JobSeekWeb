using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JobSeekWeb.Controllers
{
    public class WorkerController : Controller
    {
        // GET: Worker
        public ActionResult Dashboard()
        {
            return View("~/Views/Shared/_WorkerLayout.cshtml");
        }
        public ActionResult WorkerProfile()
        {
            return View("~/Views/Shared/_WorkerLayout.cshtml");
        }
    }
}