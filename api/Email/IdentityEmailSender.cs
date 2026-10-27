using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using PizzaShop.Api.Models;
using PizzaShop.Api.Options;

namespace PizzaShop.Api.Email
{
    // What MapIdentityApi calls for /register, /resendConfirmationEmail, /forgotPassword and email
    // changes. A delivery failure is logged, not thrown: /forgotPassword and /resendConfirmationEmail
    // must answer the same whether or not an account exists, and a sign-up that's already saved
    // shouldn't turn into a 500. The user can ask for the email again.
    public class IdentityEmailSender(
        IEmailDelivery delivery,
        IOptions<EmailOptions> options,
        ILogger<IdentityEmailSender> logger) : IEmailSender<AppUser>
    {
        public Task SendConfirmationLinkAsync(AppUser user, string email, string confirmationLink)
        {
            var link = AccountEmails.ConfirmEmailLink(options.Value.WebBaseUrl, confirmationLink);
            return SendAsync(AccountEmails.Confirmation(email, link, AccountEmails.IsEmailChange(confirmationLink)), "confirmation");
        }

        public Task SendPasswordResetCodeAsync(AppUser user, string email, string resetCode) =>
            SendAsync(AccountEmails.PasswordReset(email, AccountEmails.ResetPasswordLink(options.Value.WebBaseUrl, email, resetCode)), "password reset");

        // MapIdentityApi only sends codes, never reset links; nothing in this app calls this.
        public Task SendPasswordResetLinkAsync(AppUser user, string email, string resetLink) =>
            SendAsync(AccountEmails.PasswordReset(email, resetLink), "password reset");

        private async Task SendAsync(EmailMessage message, string kind)
        {
            try
            {
                await delivery.SendAsync(message);
            }
            catch (Exception ex)
            {
                // No address in the log: the user id isn't known here and emails are personal data.
                logger.LogError(ex, "Could not send the {Kind} email.", kind);
            }
        }
    }
}
