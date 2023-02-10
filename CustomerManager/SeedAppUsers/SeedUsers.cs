﻿using CustomerManager.DAL.Models;
using Microsoft.AspNetCore.Identity;
namespace CustomerManager.SeedAppUsers
{
    public static class SeedUsers
    {
        public static void Seed(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            SeedRoles(roleManager);

            SeedSystemUsers(userManager);
        }
        private static void SeedRoles(RoleManager<IdentityRole> roleManager)
        {
            try
            {
                if (!roleManager.RoleExistsAsync("Admin").Result)
                {
                    var role = new IdentityRole();

                    role.Name = "Admin";

                    roleManager.CreateAsync(role).Wait();
                }
           
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        private static void SeedSystemUsers(UserManager<AppUser> userManager)
        {
            try
            {
                #region Admin
                var admin = userManager.FindByEmailAsync("admin@gmail.com");

                if (admin.Result == null)
                {
                    var user = new AppUser();

                    user.UserName = "admin@gmail.com";

                    user.Email = "admin@gmail.com";

                    user.PhoneNumber = "0704509484";

                    user.FirstName = "Alex";

                    user.LastName = "Jobs";

                    user.EmailConfirmed = true;

                    user.IsActive = true;

                    user.CreateDate = DateTime.Now;

                    string userPWD = "Admin@2022";

                    var chkUser = userManager.CreateAsync(user, userPWD);

                    //Add default User to Role Admin    
                    if (chkUser.Result.Succeeded)
                    {
                        userManager.AddToRoleAsync(user, "Admin").Wait();

                    }
                }
                #endregion
           

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

            }
        }

    }
}
