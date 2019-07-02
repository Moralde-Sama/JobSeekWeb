using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JobSeekWeb.Controllers
{
    [Authorize]
    public class PartialViewsController : Controller
    {
        #region Worker Partial Views
        // GET: PartialViews
        [Authorize(Roles = "Worker")]
        public ActionResult WCompany()
        {
            return View();
        }
        [Authorize(Roles = "Worker")]
        public ActionResult WProfile()
        {
            return View();
        }
        [Authorize(Roles = "Worker")]
        public ActionResult WDashboard()
        {
            return View();
        }
        [Authorize(Roles = "Worker")]
        public ActionResult WMessages()
        {
            return View();
        }
        #endregion
    }
}