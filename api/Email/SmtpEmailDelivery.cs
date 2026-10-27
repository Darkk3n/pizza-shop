using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using PizzaShop.Api.Options;

namespace PizzaShop.Api.Email
{
    // Sends through any SMTP server: Mailpit locally; Azure Communication Services, SendGrid or
    // Postmark later, by configuration only. One connection per message is plenty for account
    // emails (a handful per sign-up or reset).
    public class SmtpEmailDelivery(IOptions<EmailOptions> options) : IEmailDelivery
    {
        public async Task SendAsync(EmailMessage message, CancellationToken ct = default)
        {
            var settings = options.Value;
            var mime = new MimeMessage
            {
                Subject = message.Subject,
                Body = new BodyBuilder { HtmlBody = message.Html, TextBody = message.Text }.ToMessageBody(),
            };
            mime.From.Add(new MailboxAddress(settings.FromName, settings.FromAddress));
            mime.To.Add(MailboxAddress.Parse(message.To));

            using var client = new SmtpClient();
            await client.ConnectAsync(settings.Smtp.Host, settings.Smtp.Port, SecurityFor(settings.Smtp.Security), ct);
            if (!string.IsNullOrEmpty(settings.Smtp.UserName))
            {
                await client.AuthenticateAsync(settings.Smtp.UserName, settings.Smtp.Password ?? string.Empty, ct);
            }
            await client.SendAsync(mime, ct);
            await client.DisconnectAsync(quit: true, ct);
        }

        private static SecureSocketOptions SecurityFor(SmtpSecurity security) => security switch
        {
            SmtpSecurity.None => SecureSocketOptions.None,
            SmtpSecurity.SslOnConnect => SecureSocketOptions.SslOnConnect,
            _ => SecureSocketOptions.StartTls,
        };
    }
}
