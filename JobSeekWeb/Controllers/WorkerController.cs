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
        [AllowAnonymous]
        public ActionResult DashboardNo()
        {
            return View("~/Views/Shared/_WorkerLayout.cshtml");
        }
        public new ActionResult Profile()
        {
            return View("~/Views/Shared/_WorkerLayout.cshtml");
        }

        [HttpPost]
        public JsonResult svProfDetails(Worker worker, int[] skillIds, string[] newskills)
        {
            //try
            //{
                worker.workerId = Convert.ToInt32(User.Identity.GetWorkerOrCompanyId());
                worker.asp_user_Id = Convert.ToInt32(User.Identity.GetUserId<int>());
                //worker.UpdateProfileDetails();
                if(skillIds != null)
                {
                    foreach (int skillId in skillIds)
                    {
                        worker.skillId = skillId;
                        worker.AddSkill(worker.workerId);
                    }
                }
                if(newskills != null)
                {
                    foreach (string title in newskills)
                    {
                        worker.AddNewSkill(title);
                    }
                }
                return Json("Success", JsonRequestBehavior.AllowGet);
            //}
            //catch (Exception e)
            //{
            //    return Json("Error: " + e.Message, JsonRequestBehavior.AllowGet);
            //}
        }
    }
}