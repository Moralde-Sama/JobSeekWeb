using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using JobSeekWeb.Extensions;
using JobSeekWeb.Models.MyClass;
using Microsoft.AspNet.Identity;
using System.Web.Mvc;
using JobSeekWeb.Models;

namespace JobSeekWeb.Controllers
{
    [Authorize(Roles = "Worker")]
    public class WorkerController : Controller
    {
        // GET: Worker
        JobEntities db = new JobEntities();
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

        [HttpPost]
        public JsonResult svProfDetails(Worker worker, string[] skills)
        {
            worker.workerId = Convert.ToInt32(User.Identity.GetWorkerOrCompanyId());
            worker.asp_user_Id = Convert.ToInt32(User.Identity.GetUserId<int>());
            worker.UpdateProfileDetails();
            return Json(new { worker = worker, skills = skills }, JsonRequestBehavior.AllowGet);
        }
    }
}