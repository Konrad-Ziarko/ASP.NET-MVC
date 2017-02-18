using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HtmlAgilityPack;
using System.Threading.Tasks;
using System.Net;
using System.Text.RegularExpressions;

namespace Rasp.Controllers
{
    public class WATController : Controller
    {
        // GET: WAT
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AuthorizedAcces(string txtUrlInput)
        {
            if(txtUrlInput == null || txtUrlInput == "")
            {
                ViewBag.Message = "Błędny link";
            }
            else
            {
                //validacja linku
            }
            return View("Index");
        }

    }
}