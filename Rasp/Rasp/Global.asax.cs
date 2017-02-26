using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Rasp
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
        protected void Application_Error(object sender, EventArgs e)
        {
            var strError = Server.GetLastError().Message;
            if (string.IsNullOrWhiteSpace(strError)) return;
            Response.RedirectToRoute("ErrorHandler", new { controller = "ErrorHandler", action = "Index", errMsg = strError });
            this.Context.ClearError();
        }
    }
}
