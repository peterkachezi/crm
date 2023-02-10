
using CustomerManager.DTO.ApplicationUsersModule;
using MimeKit;
using System.Net;
using System.Net.Mail;


namespace CustomerManager.Services.EmailModule
{
    public class MailService : IMailService
    {
        private readonly IConfiguration config;

        private readonly IWebHostEnvironment env;

        public MailService(IConfiguration config, IWebHostEnvironment env)
        {
            this.config = config;

            this.env = env;
        }
        public bool AccountEmailNotification(ApplicationUserDTO applicationUserDTO)
        {
            try
            {
                var SMTPEmailToNetwork = config.GetValue<string>("MailSettings:SMTPEmailToNetwork");

                var SMTPMailServer = config.GetValue<string>("MailSettings:SMTPMailServer");

                var SMTPPort = config.GetValue<string>("MailSettings:SMTPPort");

                var SMTPUseSSL = config.GetValue<string>("MailSettings:SMTPUseSSL");

                var SMTPUserName = config.GetValue<string>("MailSettings:SMTPUserName");

                var Password = config.GetValue<string>("MailSettings:Password");

                MailAddressCollection mailAddressesTo = new MailAddressCollection();

                mailAddressesTo.Add(new MailAddress(applicationUserDTO.Email));

                MailAddress mailAddressFrom = new MailAddress(SMTPUserName);

                MailMessage mailMessage = new MailMessage();

                mailMessage.From = mailAddressFrom;

                foreach (var to in mailAddressesTo)
                    mailMessage.To.Add(to);

                mailMessage.Subject = "Account Login Details: ";

                var templatePath = env.WebRootPath
                           + Path.DirectorySeparatorChar.ToString()
                           + "Templates"
                           + Path.DirectorySeparatorChar.ToString()
                           + "EmailTemplate"
                           + Path.DirectorySeparatorChar.ToString()
                           + "UserAccountNotification.html";

                var builder = new BodyBuilder();

                using (StreamReader SourceReader = File.OpenText(templatePath))
                {

                    builder.HtmlBody = SourceReader.ReadToEnd();

                }

                mailMessage.BodyEncoding = System.Text.Encoding.UTF8;

                mailMessage.Body = string.Format(builder.HtmlBody,

                     applicationUserDTO.FullName,

                     applicationUserDTO.Email,

                     applicationUserDTO.Password,

                     applicationUserDTO.RoleName

                    );

                mailMessage.IsBodyHtml = true;

                using (SmtpClient client = new SmtpClient())
                {
                    client.Host = SMTPMailServer;
                    client.Port = int.Parse(SMTPPort);
                    if (SMTPUseSSL != string.Empty)
                    {
                        client.EnableSsl = bool.Parse(SMTPUseSSL);
                    }

                    client.UseDefaultCredentials = false;
                    bool bNetwork = bool.Parse(SMTPEmailToNetwork);
                    if (bNetwork)
                    {
                        client.DeliveryMethod = SmtpDeliveryMethod.Network;
                    }
                    else
                    {
                        client.DeliveryMethod = SmtpDeliveryMethod.SpecifiedPickupDirectory;
                    }

                    client.Credentials = new NetworkCredential(SMTPUserName, Password);

                    client.ServicePoint.MaxIdleTime = 2;

                    client.ServicePoint.ConnectionLimit = 1;

                    client.Send(mailMessage);
                }

                return true;

            }


            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

                return false;
            }
        }

        public bool PasswordResetEmailNotification(ResetPasswordDTO resetPasswordDTO)
        {
            try
            {
                var SMTPEmailToNetwork = config.GetValue<string>("MailSettings:SMTPEmailToNetwork");

                var SMTPMailServer = config.GetValue<string>("MailSettings:SMTPMailServer");

                var SMTPPort = config.GetValue<string>("MailSettings:SMTPPort");

                var SMTPUseSSL = config.GetValue<string>("MailSettings:SMTPUseSSL");

                var SMTPUserName = config.GetValue<string>("MailSettings:SMTPUserName");

                var Password = config.GetValue<string>("MailSettings:Password");

                MailAddressCollection mailAddressesTo = new MailAddressCollection();

                mailAddressesTo.Add(new MailAddress(resetPasswordDTO.Email));

                MailAddress mailAddressFrom = new MailAddress(SMTPUserName);

                MailMessage mailMessage = new MailMessage();

                mailMessage.From = mailAddressFrom;

                foreach (var to in mailAddressesTo)
                    mailMessage.To.Add(to);

                mailMessage.Subject = "MAKL: ";

                var templatePath = env.WebRootPath
                           + Path.DirectorySeparatorChar.ToString()
                           + "Templates"
                           + Path.DirectorySeparatorChar.ToString()
                           + "EmailTemplate"
                           + Path.DirectorySeparatorChar.ToString()
                           + "PaswordResetNotification.html";

                var builder = new BodyBuilder();

                using (StreamReader SourceReader = File.OpenText(templatePath))
                {

                    builder.HtmlBody = SourceReader.ReadToEnd();

                }

                mailMessage.BodyEncoding = System.Text.Encoding.UTF8;

                mailMessage.Body = string.Format(builder.HtmlBody,

                     resetPasswordDTO.FullName,

                     resetPasswordDTO.Email,

                     resetPasswordDTO.Password

                    );

                mailMessage.IsBodyHtml = true;

                using (SmtpClient client = new SmtpClient())
                {
                    client.Host = SMTPMailServer;
                    client.Port = int.Parse(SMTPPort);
                    if (SMTPUseSSL != string.Empty)
                    {
                        client.EnableSsl = bool.Parse(SMTPUseSSL);
                    }

                    client.UseDefaultCredentials = false;
                    bool bNetwork = bool.Parse(SMTPEmailToNetwork);
                    if (bNetwork)
                    {
                        client.DeliveryMethod = SmtpDeliveryMethod.Network;
                    }
                    else
                    {
                        client.DeliveryMethod = SmtpDeliveryMethod.SpecifiedPickupDirectory;
                    }

                    client.Credentials = new NetworkCredential(SMTPUserName, Password);

                    client.ServicePoint.MaxIdleTime = 2;

                    client.ServicePoint.ConnectionLimit = 1;

                    client.Send(mailMessage);
                }

                return true;

            }


            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

                return false;
            }
        }

    }
}
