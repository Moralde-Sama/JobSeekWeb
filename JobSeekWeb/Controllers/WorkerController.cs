using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using JobSeekWeb.Extensions;
using JobSeekWeb.Models.MyClass;
using Microsoft.AspNet.Identity;
using System.Web.Mvc;

namespace JobSeekWeb.Controllers
{
    [Authorize(Roles = "Worker")]
    public class WorkerController : Controller
    {
        // GET: Worker
        public ActionResult Dashboard()
        {
            if (User.Identity.IsWorker() == "True")
            {
                if (Worker.IsDetailsCompleted(User.Identity.GetUserId<int>()))
                {
                    return View("~/Views/Shared/_WorkerLayout.cshtml");
                }
                else
                {
                    return RedirectToAction("Profile", "Worker");
                }
            }
            else
            {
                return RedirectToAction("Profile");
            }
        }
        public new ActionResult Profile()
        {
            return View("~/Views/Shared/_WorkerLayout.cshtml");
        }
    }
}