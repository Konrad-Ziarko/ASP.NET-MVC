﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Rasp.Controllers
{
    public class GameController : Controller
    {
        // GET: Game
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SmartRockets()
        {
            return View();
        }

        public ActionResult Matrix()
        {
            return View();
        }

        public ActionResult Repel()
        {
            return View();
        }
    }
}