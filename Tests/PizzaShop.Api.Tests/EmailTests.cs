using System.Net;
using System.Net.Http.Json;
using PizzaShop.Api.Tests.Infrastructure;

namespace PizzaShop.Api.Tests
{
    // Account emails through Identity's endpoints. The host records emails instead of sending them,
    // so each test opens the link a user would click and finishes the flow through the public API.
    [Collection(ApiCollection.Name)]
    public class EmailTests(ApiFactory factory)
    {
        private readonly TestApi api = new(factory);

        private Task<HttpResponseMessage> PostAsync(string path, object body) =>
            api.Anonymous().PostAsJsonAsync($"/api/auth/{path}", body, TestApi.Json);

        private Task<HttpResponseMessage> LoginAsync(string email, string password) =>
            PostAsync("login", new { email, password });

        [Fact]
        public async Task Register_EmailsAConfirmationLink_ToTheWebApp()
        {
            var email = await api.RegisterAsync();

            var message = Assert.Single(api.Emails.SentTo(email));
            Assert.Equal("Confirm your Rubencinis & Mate Pizza account", message.Subject);
            var link = RecordingEmailDelivery.LinkIn(message);
            Assert.Equal($"{ApiFactory.WebBaseUrl}/confirm-email", link.GetLeftPart(UriPartial.Path));
            var query = RecordingEmailDelivery.QueryOf(link);
            Assert.False(string.IsNullOrEmpty(query["userId"]));
            Assert.False(string.IsNullOrEmpty(query["code"]));
            // The same link is in the HTML body's button.
            Assert.Contains(System.Net.WebUtility.HtmlEncode(link.ToString()), message.Html);
        }

        [Fact]
        public async Task UnconfirmedAccount_CantSignIn_UntilTheLinkIsOpened()
        {
            var email = await api.RegisterAsync();

            var before = await LoginAsync(email, TestApi.Password);
            var problem = await TestApi.ReadProblemAsync(before, HttpStatusCode.Unauthorized);
            Assert.Equal("NotAllowed", problem.Detail);

            await api.ConfirmEmailAsync(email);

            Assert.Equal(HttpStatusCode.OK, (await LoginAsync(email, TestApi.Password)).StatusCode);
        }

        [Fact]
        public async Task ConfirmEmail_WithAWrongCode_Is401()
        {
            var email = await api.RegisterAsync();
            var query = RecordingEmailDelivery.QueryOf(RecordingEmailDelivery.LinkIn(api.Emails.LatestTo(email)));

            var response = await api.Anonymous().GetAsync($"/api/auth/confirmEmail?userId={query["userId"]}&code=not-the-code");

            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
            Assert.Equal(HttpStatusCode.Unauthorized, (await LoginAsync(email, TestApi.Password)).StatusCode);
        }

        // Identity would throw parsing a non-GUID id (a 500); the API answers like a wrong code.
        [Fact]
        public async Task ConfirmEmail_WithAMalformedUserId_Is401_Not500()
        {
            var response = await api.Anonymous().GetAsync("/api/auth/confirmEmail?userId=not-a-guid&code=abc");

            await TestApi.ReadProblemAsync(response, HttpStatusCode.Unauthorized);
        }

        [Fact]
        public async Task ResendConfirmation_SendsAnotherWorkingLink()
        {
            var email = await api.RegisterAsync();

            (await PostAsync("resendConfirmationEmail", new { email })).EnsureSuccessStatusCode();

            Assert.Equal(2, api.Emails.SentTo(email).Count);
            await api.ConfirmEmailAsync(email);
            Assert.Equal(HttpStatusCode.OK, (await LoginAsync(email, TestApi.Password)).StatusCode);
        }

        [Fact]
        public async Task ForgotPassword_EmailsAResetLink_ThatSetsANewPassword()
        {
            var user = await api.NewUserAsync();

            (await PostAsync("forgotPassword", new { email = user.Email })).EnsureSuccessStatusCode();

            var message = api.Emails.LatestTo(user.Email);
            Assert.Equal("Reset your Rubencinis & Mate Pizza password", message.Subject);
            var link = RecordingEmailDelivery.LinkIn(message);
            Assert.Equal($"{ApiFactory.WebBaseUrl}/reset-password", link.GetLeftPart(UriPartial.Path));
            var query = RecordingEmailDelivery.QueryOf(link);
            Assert.Equal(user.Email, query["email"]);

            const string newPassword = "Tests!Reset2";
            var reset = await PostAsync("resetPassword", new { email = user.Email, resetCode = query["code"], newPassword });
            reset.EnsureSuccessStatusCode();

            Assert.Equal(HttpStatusCode.OK, (await LoginAsync(user.Email, newPassword)).StatusCode);
            Assert.Equal(HttpStatusCode.Unauthorized, (await LoginAsync(user.Email, TestApi.Password)).StatusCode);
        }

        [Fact]
        public async Task ResetPassword_WithAWrongCode_Is400()
        {
            var user = await api.NewUserAsync();

            var reset = await PostAsync("resetPassword", new { email = user.Email, resetCode = "bm90LXRoZS1jb2Rl", newPassword = "Tests!Reset2" });

            var problem = await TestApi.ReadProblemAsync(reset, HttpStatusCode.BadRequest);
            Assert.Contains("InvalidToken", problem.Errors.Keys);
        }

        // Same answer whether or not the account exists, so neither endpoint reveals who has one.
        [Fact]
        public async Task UnknownAddresses_Get200_AndNoEmail()
        {
            var email = $"nobody-{TestApi.Unique()}@tests.local";

            Assert.Equal(HttpStatusCode.OK, (await PostAsync("forgotPassword", new { email })).StatusCode);
            Assert.Equal(HttpStatusCode.OK, (await PostAsync("resendConfirmationEmail", new { email })).StatusCode);

            Assert.Empty(api.Emails.SentTo(email));
        }

        // Identity only sends reset codes to confirmed addresses, so an unconfirmed sign-up with
        // someone else's email can't be used to mail them reset links.
        [Fact]
        public async Task ForgotPassword_ForAnUnconfirmedAccount_SendsNothing()
        {
            var email = await api.RegisterAsync();

            (await PostAsync("forgotPassword", new { email })).EnsureSuccessStatusCode();

            Assert.Single(api.Emails.SentTo(email)); // only the original confirmation
        }
    }
}
