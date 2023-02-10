using AutoMapper;
using CustomerManager.DAL.DbContext;
using CustomerManager.DAL.Models;
using CustomerManager.DTO.CustomerModule;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace CustomerManager.BLL.Repositories.CustomerModule
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly ApplicationDbContext context;

        private readonly IMapper mapper;
        public CustomerRepository(IMapper mapper, ApplicationDbContext context)
        {
            this.context = context;

            this.mapper = mapper;
        }

        public async Task<int> AddCustomer(CustomerDTO customerDTO)
        {
            var parameter = new List<SqlParameter>
            {
                new SqlParameter("@FirstName", customerDTO.FirstName),

                new SqlParameter("@LastName", customerDTO.LastName),

                new SqlParameter("@EmailAddress", customerDTO.EmailAddress),

                new SqlParameter("@PhoneNumber", customerDTO.PhoneNumber),

                new SqlParameter("@Designation", customerDTO.Designation),

                new SqlParameter("@Company", customerDTO.Company),

                new SqlParameter("@City", customerDTO.City),

                new SqlParameter("@CollegeName", customerDTO.CollegeName),

                new SqlParameter("@State", customerDTO.State),

                new SqlParameter("@CreatedDate", customerDTO.CreatedDate),

                new SqlParameter("@ModifiedDate", customerDTO.ModifiedDate),

                new SqlParameter("@ModifidBy", customerDTO.ModifidBy),

                new SqlParameter("@IsActive", customerDTO.IsActive),
            };

            var result = await Task.Run(() => context.Database

           .ExecuteSqlRawAsync(@"exec AddNewProduct @FirstName, @LastName, @EmailAddress, @PhoneNumber,@Designation,@Company,@City,@CollegeName,@State,@CreatedDate,@ModifiedDate,@ModifidBy,@IsActive", parameter.ToArray()));

            return result;
        }
        public async Task<CustomerDTO> Create(CustomerDTO customerDTO)
        {

            try
            {
                customerDTO.CreatedDate = DateTime.Now;

                var data = mapper.Map<Customer>(customerDTO);

                context.Customers.Add(data);

                await context.SaveChangesAsync();

                return customerDTO;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

                return null;
            }
        }
        public async Task<List<CustomerDTO>> GetAll()
        {
            try
            {
                var data = await context.Customers.FromSqlRaw("GetAllCustomers").ToListAsync();

                var customer = mapper.Map<List<CustomerDTO>>(data);

                return customer;
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);

                return null;
            }

        }
        public async Task<Customer> GetById(int CustomerId)
        {
            try
            {
                var param = new SqlParameter("@CustomerID", CustomerId);

                var data = await Task.Run(() => context.Customers.FromSqlRaw(@"exec GetByCustomerID @CustomerID", param).ToListAsync());

                var customer = data.FirstOrDefault();

                return customer;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

                return null;
            }
        }
        public async Task<bool> DeleteCustomer1(int CustomerId)
        {
            try
            {
                bool result = false;

                var customer = await context.Customers.FindAsync(CustomerId);

                if (customer != null)
                {
                    context.Customers.Remove(customer);

                    await context.SaveChangesAsync();

                    return true;
                }
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

                return false;
            }
        }
        public async Task<bool> DeleteCustomer(int CustomerId)
        {
            try
            {
                var param = new SqlParameter("@CustomerID", CustomerId);

                var data = await Task.Run(() => context.Database.ExecuteSqlRaw("EXEC DeleteCustomerByID @CustomerID", param));

                return true;
            }

            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

                return false;
            }
        }
        public async Task<CustomerDTO> Update(CustomerDTO customerDTO)
        {
            try
            {
                var data = await context.Customers.FindAsync(customerDTO.CustomerID);

                if (data != null)
                {
                    using (var transaction = context.Database.BeginTransaction())
                    {
                        data.FirstName = customerDTO.FirstName;

                        data.LastName = customerDTO.LastName;

                        data.IsActive = customerDTO.IsActive;

                        data.PhoneNumber = customerDTO.PhoneNumber;

                        data.EmailAddress = customerDTO.EmailAddress;

                        data.ModifiedDate = DateTime.Now;

                        data.ModifidBy = customerDTO.ModifidBy;

                        data.Designation = customerDTO.Designation;

                        data.Company = customerDTO.Company;

                        data.City = customerDTO.City;

                        transaction.Commit();
                    }
                    await context.SaveChangesAsync();

                    return customerDTO;
                }

                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

                return null;
            }
        }
    }
}
