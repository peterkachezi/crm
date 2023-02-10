using CustomerManager.DAL.Models;
using CustomerManager.DTO.CustomerModule;

namespace CustomerManager.BLL.Repositories.CustomerModule
{
    public interface ICustomerRepository
    {
        Task<CustomerDTO> Create(CustomerDTO customerDTO);
        Task<bool> DeleteCustomer(int CustomerId);
        Task<List<CustomerDTO>> GetAll();
        Task<Customer> GetById(int CustomerId);
        Task<CustomerDTO> Update(CustomerDTO customerDTO);
    }
}