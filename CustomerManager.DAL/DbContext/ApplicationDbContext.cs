
using CustomerManager.DAL.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace CustomerManager.DAL.DbContext
{
    public partial class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }
        public virtual DbSet<Designation> Designations { get; set; } = null!;
        public virtual DbSet<Customer> Customers { get; set; } = null!;  
        public virtual DbSet<AppUser> AppUsers { get; set; } = null!;  

    }
}
