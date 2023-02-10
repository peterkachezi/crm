
using CustomerManager.DTO.ApplicationUsersModule;

namespace CustomerManager.Services.EmailModule
{
    public interface IMailService
    {
        bool AccountEmailNotification(ApplicationUserDTO applicationUserDTO);
        bool PasswordResetEmailNotification(ResetPasswordDTO resetPasswordDTO);
    }
}