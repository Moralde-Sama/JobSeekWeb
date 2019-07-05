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
            project.ownerId = User.Identity.GetUserId<int>();
            var projDetails = project.AddPersonalProject();
            int[] newSkillIds = project.AddMultipleNewSkillProj();
            project.AddMultipleSkillsProj(projDetails.perprojectId);
            project.addSkills = newSkillIds;
            project.AddMultipleSkillsProj(projDetails.perprojectId);
            int count = 0;
            foreach(HttpPostedFileBase file in project.files)
            {
                DateTime date = DateTime.Now;
                var img = file;
                string extension = Path.GetExtension(img.FileName);
                string location = "/Uploads/Screenshots/" + User.Identity.GetUserId<int>() + count + date.Month + date.Day + date.Year + date.Hour + date.Minute + date.Second + extension;
                file.SaveAs(Server.MapPath(location));
                tbl_proj_screenshots ss = new tbl_proj_screenshots();
                ss.isPersonalProj = 1;
                ss.path = location;
                ss.projectId = projDetails.perprojectId;
                db.tbl_proj_screenshots.Add(ss);
                db.SaveChanges();
                count++;
            }
            return Json("Success", JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult UpdatePersonalProj(Project project)
        {
            //try
            //{
                int[] newSkillIds = project.AddMultipleNewSkillProj();
                project.AddMultipleSkillsProj(project.perprojectId);
                project.addSkills = newSkillIds;
                project.AddMultipleSkillsProj(project.perprojectId);
                project.UpdatePProjectDetails();
                project.RemovePProjectSkills();
                List<string> ssPaths = project.RemoveScreenShots();
                int count = 0;
                foreach (string path in ssPaths)
                {
                    System.IO.File.Delete(Server.MapPath("~" + path));
                }
                if(project.files?.Length > 0)
                {
                    foreach (HttpPostedFileBase file in project.files)
                    {
                        DateTime date = DateTime.Now;
                        var img = file;
                        string extension = Path.GetExtension(img.FileName);
                        string location = "/Uploads/Screenshots/" + User.Identity.GetUserId<int>() + count + date.Month + date.Day + date.Year + date.Hour + date.Minute + date.Second + extension;
                        file.SaveAs(Server.MapPath(location));
                        tbl_proj_screenshots ss = new tbl_proj_screenshots();
                        ss.isPersonalProj = 1;
                        ss.path = location;
                        ss.projectId = project.perprojectId;
                        db.tbl_proj_screenshots.Add(ss);
                        db.SaveChanges();
                        count++;
                    }
            }
                return Json("Success", JsonRequestBehavior.AllowGet);
            //}
            //catch(Exception e)
            //{
            //    return Json(e.Message, JsonRequestBehavior.AllowGet);
            //}
            
        }
        [HttpGet]
        public JsonResult GetWorkerPersonalProj()
        {
            var personalProjs = db.spProject_getAllPersonalProj(User.Identity.GetUserId<int>()).ToList();
            List<int> projIds = new List<int>();
            foreach(spProject_getAllPersonalProj_Result item in personalProjs)
            {
                projIds.Add(item.perprojectId);
            }
            var screenshots = db.tbl_proj_screenshots.Where(w => projIds.Contains(w.projectId)).ToList();
            var projSkills = db.tbl_pproject_skill.Where(w => projIds.Contains(w.perprojectId)).ToList();
            return Json(new { personalProj = personalProjs, screenshots = screenshots,
            projSkills = projSkills}, JsonRequestBehavior.AllowGet);
        }
    }
}