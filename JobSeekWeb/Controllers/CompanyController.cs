using JobSeekWeb.Models;
using JobSeekWeb.Models.MyClass;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JobSeekWeb.Controllers
{
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
        

    }
}