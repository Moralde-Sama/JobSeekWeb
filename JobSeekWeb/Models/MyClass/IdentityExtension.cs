using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Web;

namespace JobSeekWeb.Extensions
{
    public static class IdentityExtension
    {
        public static string IsWorker(this IIdentity identity)
        {
            var claim = ((ClaimsIdentity)identity).FindFirst("IsWorker");
            return (claim != null) ? claim.Value : string.Empty;
        }
        public static string GetWorkerOrCompanyId(this IIdentity identity)
        {
            var claim = ((ClaimsIdentity)identity).FindFirst("WorkCompanyId");
            return (claim != null) ? claim.Value : string.Empty;
        }
        public static string GetUserFullName(this IIdentity identity)
        {
            var claim = ((ClaimsIdentity)identity).FindFirst("FullName");
            return (claim != null) ? claim.Value : string.Empty;
        }
        public static string GetUserEmail(this IIdentity identity)
        {
            var claim = ((ClaimsIdentity)identity).FindFirst("Email");
            return (claim != null) ? claim.Value : string.Empty;
        }
    }
}