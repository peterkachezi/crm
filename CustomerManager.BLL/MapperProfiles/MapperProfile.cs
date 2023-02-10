

using AutoMapper;
using CustomerManager.DAL.Models;
using CustomerManager.DTO.CustomerModule;

namespace CustomerManager.BLL.MapperProfiles
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Customer, CustomerDTO>().ReverseMap();      
        }
    }
}
