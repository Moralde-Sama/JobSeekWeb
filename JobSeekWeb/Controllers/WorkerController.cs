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
using Newtonsoft.Json;
using System.IO;

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
        public ActionResult Projects()
        {
            return View("~/Views/Shared/_WorkerLayout.cshtml");
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
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult AddNewPersonalProj(Project project)
        {
            var projDetails = project.AddPersonalProject();
            int[] newSkillIds = project.AddMultipleNewSkillProj();
            project.AddMultipleSkillsProj(projDetails.perprojectId);
            project.addSkills = newSkillIds;
            project.AddMultipleSkillsProj(projDetails.perprojectId); 
            DateTime date = DateTime.Now;
            foreach(HttpPostedFileBase file in project.files)
            {
                var img = file;
                string extension = Path.GetExtension(img.FileName);
                string location = "/Uploads/Screenshots/" + User.Identity.GetUserId<int>() + date.Month + date.Day + date.Year + date.Hour + date.Minute + date.Second + extension;
                file.SaveAs(Server.MapPath(location));
                tbl_proj_screenshots ss = new tbl_proj_screenshots();
                ss.isPersonalProj = 1;
                ss.path = location;
                ss.projectId = projDetails.perprojectId;
                db.tbl_proj_screenshots.Add(ss);
                db.SaveChanges();
            }
            return Json("Success", JsonRequestBehavior.AllowGet);
        }
    }
}