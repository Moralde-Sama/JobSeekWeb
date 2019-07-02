using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using JobSeekWeb.Extensions;
using JobSeekWeb.Models.MyClass;
using Microsoft.AspNet.Identity;
using System.Web.Mvc;
using JobSeekWeb.Models;
using System.Net;

namespace JobSeekWeb.Controllers
{
    [Authorize(Roles = "Worker")]
    public class WorkerController : Controller
    {
        // GET: Worker
        JobEntities db = new JobEntities();
        public ActionResult Dashboard()
        {
            if (Worker.IsDetailsCompleted(User.Identity.GetUserId<int>()))
            {
                return View("~/Views/Shared/_WorkerLayout.cshtml");
            }
            else
            {
                return RedirectToAction("Details", "Worker");
            }
        }
        [AllowAnonymous]
        public ActionResult DashboardNo()
        {
            return View("~/Views/Shared/_WorkerLayout.cshtml");
        }
        public ActionResult Details()
        {
            if (Worker.IsDetailsCompleted(User.Identity.GetUserId<int>()))
            {
                return RedirectToAction("Dashboard", "Worker");
            }
            else
            {
                return View();
            }
        }
        public ActionResult Messages()
        {
            return View("~/Views/Shared/_WorkerLayout.cshtml");
        }
        public ActionResult Company()
        {
            return View("~/Views/Shared/_WorkerLayout.cshtml");
        }
        public new ActionResult Profile()
        {
            return View("~/Views/Shared/_WorkerLayout.cshtml");
        }
        [HttpGet]
        public JsonResult GetUserInfo()
        {
            int userId = User.Identity.GetUserId<int>();
            var userinfo = db.spWorker_getAllUserInfo(userId).FirstOrDefault();
            var skills = db.spWorker_getWorkerSkills(userinfo.workerId).ToList();
            return Json(new { userInfo = userinfo, skills = skills }, JsonRequestBehavior.AllowGet);
        }
    }
}