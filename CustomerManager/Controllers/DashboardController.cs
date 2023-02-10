using CustomerManager.BLL.Repositories.CustomerModule;
using CustomerManager.DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CustomerManager.Controllers
{
	public class DashboardController : Controller
	{

		private readonly ICustomerRepository customerRepository;
        private readonly UserManager<AppUser> userManager;

        public DashboardController(UserManager<AppUser> userManager,ICustomerRepository customerRepository)
		{
			this.customerRepository = customerRepository;

			this.userManager = userManager;
		}

		public async Task<IActionResult> Index()
		{
			try
			{
                var user = await userManager.FindByEmailAsync(User.Identity.Name);

                if (user.Email == null || user.Email == "")
                {
                    return RedirectToAction("Login", "Account", new { area = "" });

                }
                var customers = await customerRepository.GetAll();

				ViewBag.ActiveCustomers = customers.Where(x => x.IsActive == 1).Count();

				ViewBag.InactiveCustomers = customers.Where(x => x.IsActive == 0).Count();

				ViewBag.TotalCustomers = customers.Count();

				return View();
			}
			catch (Exception ex)
			{
                Console.WriteLine(ex.Message);

                TempData["Error"] = "Something went wrong ,please contact system admin for assistance";

                return RedirectToAction("Login", "Account", new { area = "" });
            }
		}
	}
}
