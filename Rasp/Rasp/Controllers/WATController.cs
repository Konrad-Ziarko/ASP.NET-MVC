using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HtmlAgilityPack;
using System.Threading.Tasks;

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
                ViewBag.Message = "Błędny link";
            else
            {
                //validacja linku
            }
            ViewData["result"] = txtUrlInput;
            return View("Index");
        }

        private void getData(string link)
        {
            HtmlWeb web = new HtmlWeb();
            var doc = web.Load(link);
            var nodes = doc.DocumentNode.SelectNodes("//table//tr//td//center");
        }
    }
}