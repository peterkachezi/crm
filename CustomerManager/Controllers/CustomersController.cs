using CustomerManager.BLL.Repositories.CustomerModule;
using CustomerManager.DAL.Models;
using CustomerManager.DTO.CustomerModule;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CustomerManager.Controllers
{
    public class CustomersController : Controller
    {
        private readonly ICustomerRepository customerRepository;

        private readonly UserManager<AppUser> userManager;
        public CustomersController(UserManager<AppUser> userManager, ICustomerRepository customerRepository)
        {
            this.customerRepository = customerRepository;

            this.userManager = userManager;
        }
        public async Task<IActionResult> Index()
        {
            var customers = await customerRepository.GetAll();

            return View(customers);
        }
        public async Task<IActionResult> Create(CustomerDTO customerDTO)
        {
            try
            {
                var firstName = customerDTO.FirstName.Substring(0, 1).ToUpper() + customerDTO.FirstName.Substring(1).ToLower().Trim();

                var lastName = customerDTO.LastName.Substring(0, 1).ToUpper() + customerDTO.LastName.Substring(1).ToLower().Trim();

                var user = await userManager.FindByEmailAsync(User.Identity.Name);

                customerDTO.CreatedBy = user.Id;

                var result = await customerRepository.AddCustomer(customerDTO);

                if (result != null)
                {
                    return Json(new { success = true, responseText = "Customer has been successfully created" });
                }
                else
                {
                    return Json(new { success = false, responseText = "Failed to create record" });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

                return Json(new { success = false, responseText = "Something went wrong" });
            }
        }

        public async Task<IActionResult> Update(CustomerDTO customerDTO)
        {
            try
            {
                var firstName = customerDTO.FirstName.Substring(0, 1).ToUpper() + customerDTO.FirstName.Substring(1).ToLower().Trim();

                var lastName = customerDTO.LastName.Substring(0, 1).ToUpper() + customerDTO.LastName.Substring(1).ToLower().Trim();

                var user = await userManager.FindByEmailAsync(User.Identity.Name);

                customerDTO.ModifidBy = user.Id;

                var result = await customerRepository.Update(customerDTO);

                if (result != null)
                {
                    return Json(new { success = true, responseText = "Customer record has been successfully updated" });
                }
                else
                {
                    return Json(new { success = false, responseText = "Failed to updated record" });
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

                return Json(new { success = false, responseText = "Something went wrong" });
            }
        }


        public async Task<IActionResult> GetById(int CustomerID)
        {
            try
            {
                var customer = await customerRepository.GetById(CustomerID);

                if (customer != null)
                {
                    return Json(new { data = customer });
                }
                return Json(new { data = false });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

                return null;
            }
        }
        public async Task<IActionResult> Delete(int CustomerID)
        {
            try
            {
                var user = await userManager.FindByEmailAsync(User.Identity.Name);

                //approveMemberDTO.CreatedBy = user.Id;

                var results =await customerRepository.DeleteCustomer(CustomerID);

                if (results == true)
                {
                    return Json(new { success = true, responseText = "Customer has been successfully deleted" });
                }
                else
                {
                    return Json(new { success = false, responseText = "Failed to  delete!" });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

                return Json(new { success = false, responseText = "Something went wrong" });
            }
        }

    }
}
