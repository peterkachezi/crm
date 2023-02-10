using CustomerManager.BLL.Repositories.CustomerModule;
using Microsoft.AspNetCore.Mvc;

namespace CustomerManager.Controllers
{
	public class DashboardController : Controller
	{

		private readonly ICustomerRepository customerRepository;

		public DashboardController(ICustomerRepository customerRepository)
		{
			this.customerRepository = customerRepository;
		}
		public async Task<IActionResult> Index()
		{
			try
			{
				var customers = await customerRepository.GetAll();

				ViewBag.ActiveCustomers = customers.Where(x => x.IsActive == 1).Count();

				ViewBag.InactiveCustomers = customers.Where(x => x.IsActive == 0).Count();

				ViewBag.TotalCustomers = customers.Count();

				return View();
			}
			catch (Exception ex)
			{
				Console.WriteLine();

				return null;
			}
		}
	}
}
