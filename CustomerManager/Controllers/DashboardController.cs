using Microsoft.AspNetCore.Mvc;

namespace CustomerManager.Controllers
{
    public class DashboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
