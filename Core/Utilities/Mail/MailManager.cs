using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Utilities.Mail
{
    public class MailManager : IMailService
    {
        private IConfiguration _configuration;

        public MailManager(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void Send(EmailMessage emailMessage)
        {
            var message = new MimeMessage();
            message.To.AddRange(emailMessage.ToAddresses.Select(i => new MailboxAddress(i.Name, i.Address)));
            message.From.AddRange(emailMessage.FromAddresses.Select(i => new MailboxAddress(i.Name, i.Address)));

            List<EmailAddress> from = new List<EmailAddress>() { new EmailAddress() { Address = _configuration.GetSection("EmailConfiguration").GetSection("SenderEmail").Value, Name = _configuration.GetSection("EmailConfiguration").GetSection("SenderName").Value } };
            message.From.AddRange(from.Select(i => new MailboxAddress(i.Name, i.Address)));

            message.Subject = emailMessage.Subject;

            message.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = emailMessage.Content
            };

            using (var emailClient = new SmtpClient())
            {
                emailClient.ServerCertificateValidationCallback = (s, c, h, e) => true;

                emailClient.Connect(
                _configuration.GetSection("EmailConfiguration").GetSection("SmtpServer").Value,
                Convert.ToInt32(_configuration.GetSection("EmailConfiguration").GetSection("SmtpPort").Value),
                MailKit.Security.SecureSocketOptions.Auto);

                emailClient.Authenticate(_configuration.GetSection("EmailConfiguration").GetSection("UserName").Value, _configuration.GetSection("EmailConfiguration").GetSection("Password").Value);

                emailClient.Send(message);
                emailClient.Disconnect(true);
            }
        }
    }
}
