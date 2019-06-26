using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JobSeekWeb.Controllers
{
    public class PartialViewsController : Controller
    {
        #region Worker Partial Views
        // GET: PartialViews
        public ActionResult WCompanies()
        {
            return View();
        }
        public ActionResult WWorkerProfile()
        {
            return View();
        }
        public ActionResult WWorkerDashboard()
        {
            return View();
        }
        #endregion
    }
}