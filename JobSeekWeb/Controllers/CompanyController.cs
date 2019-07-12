using JobSeekWeb.Models;
using JobSeekWeb.Models.MyClass;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JobSeekWeb.Controllers
{
    [Authorize(Roles = "Company")]
    public class CompanyController : Controller
    {
        // GET: Company
        public ActionResult CompanyDetails()
        {
            return View();
        }
        public ActionResult Dashboard()
        {
            return View();
        }
        public ActionResult Job()
        {
            return View("~/Views/Shared/_CompanyLayout.cshtml");
        }
        public new ActionResult Profile()
        {
            return View("~/Views/Shared/_CompanyLayout.cshtml");
        }
        public ActionResult DesignCompanyDetails()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetCategories()
        {
            try
            {
                return Json(Category.GetCategories(), JsonRequestBehavior.AllowGet);
            }
            catch(Exception e)
            {
                return Json(e.Message, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpGet]
        public JsonResult GetCompanyInfo()
        {
            spCompany_getDetails_Result company_details = 
                Company.GetCompanyDetails(User.Identity.GetUserId<int>());
            return Json(company_details, JsonRequestBehavior.AllowGet);
        }
    }
}