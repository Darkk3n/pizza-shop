using Microsoft.Extensions.Logging.Abstractions;
using PizzaShop.Api.Email;
using PizzaShop.Api.Models;
using PizzaShop.Api.Options;

namespace PizzaShop.Api.Tests
{
    // Unit tests: link building and rendering are pure, and the sender only needs a delivery.
    public class AccountEmailsTests
    {
        private const string Web = "https://pizza.example";

        // Identity HTML-encodes the link it hands over, so "&" arrives as "&amp;".
        [Fact]
        public void ConfirmLink_MovesIdentitysQuery_ToTheWebApp()
        {
            var link = AccountEmails.ConfirmEmailLink(Web + "/", "http://api.internal:8080/api/auth/confirmEmail?userId=abc&amp;code=Q2-_x");

            Assert.Equal("https://pizza.example/confirm-email?userId=abc&code=Q2-_x", link);
            Assert.False(AccountEmails.IsEmailChange("http://api/api/auth/confirmEmail?userId=abc&amp;code=Q2-_x"));
        }

        [Fact]
        public void ConfirmLink_KeepsChangedEmail_ForAddressChanges()
        {
            const string identityLink = "http://api/api/auth/confirmEmail?userId=abc&amp;code=xyz&amp;changedEmail=new%40example.com";

            // "@" is allowed unescaped in a query string.
            Assert.Equal("https://pizza.example/confirm-email?userId=abc&code=xyz&changedEmail=new@example.com", AccountEmails.ConfirmEmailLink(Web, identityLink));
            Assert.True(AccountEmails.IsEmailChange(identityLink));
        }

        [Fact]
        public void ResetLink_EscapesTheEmail()
        {
            var link = AccountEmails.ResetPasswordLink(Web, "a+b@example.com", "Q29kZQ");

            // "+" must be escaped (it would read back as a space); "@" is fine as is.
            Assert.Equal("https://pizza.example/reset-password?email=a%2Bb@example.com&code=Q29kZQ", link);
        }

        [Fact]
        public void Rendering_HtmlEncodesTheLink_AndKeepsATextAlternative()
        {
            var message = AccountEmails.PasswordReset("a@example.com", "https://pizza.example/reset-password?email=a&code=1");

            Assert.Contains("href=\"https://pizza.example/reset-password?email=a&amp;code=1\"", message.Html);
            Assert.Contains("https://pizza.example/reset-password?email=a&code=1", message.Text);
            Assert.Equal("a@example.com", message.To);
        }

        private sealed class FailingDelivery : IEmailDelivery
        {
            public Task SendAsync(EmailMessage message, CancellationToken ct = default) =>
                throw new InvalidOperationException("SMTP is down.");
        }

        // A down mail server must not turn /register or /forgotPassword into a 500.
        [Fact]
        public async Task DeliveryFailure_IsLogged_NotThrown()
        {
            var options = Microsoft.Extensions.Options.Options.Create(new EmailOptions { WebBaseUrl = Web });
            var sender = new IdentityEmailSender(new FailingDelivery(), options, NullLogger<IdentityEmailSender>.Instance);
            var user = new AppUser { Email = "a@example.com" };

            await sender.SendConfirmationLinkAsync(user, "a@example.com", "http://api/api/auth/confirmEmail?userId=1&amp;code=2");
            await sender.SendPasswordResetCodeAsync(user, "a@example.com", "code");
        }
    }
}
