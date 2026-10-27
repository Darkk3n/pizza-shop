using System.Collections.Concurrent;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.WebUtilities;
using PizzaShop.Api.Email;

namespace PizzaShop.Api.Tests.Infrastructure
{
    // Stands in for SMTP in the test host: keeps every email so a test can read the link Identity's
    // email asked the user to open, and finish the flow through the public API.
    public partial class RecordingEmailDelivery : IEmailDelivery
    {
        private readonly ConcurrentQueue<EmailMessage> sent = new();

        public Task SendAsync(EmailMessage message, CancellationToken ct = default)
        {
            sent.Enqueue(message);
            return Task.CompletedTask;
        }

        public IReadOnlyList<EmailMessage> SentTo(string email) =>
            [.. sent.Where(m => string.Equals(m.To, email, StringComparison.OrdinalIgnoreCase))];

        public EmailMessage LatestTo(string email) =>
            SentTo(email).LastOrDefault() ?? throw new InvalidOperationException($"No email was sent to {email}.");

        // The link the email's button opens, and its query (userId/code, or email/code).
        public static Uri LinkIn(EmailMessage message) =>
            new(LinkPattern().Match(message.Text).Groups[1].Value);

        public static Dictionary<string, string> QueryOf(Uri link) =>
            QueryHelpers.ParseQuery(link.Query).ToDictionary(p => p.Key, p => p.Value.ToString());

        [GeneratedRegex(@": (https?://\S+)")]
        private static partial Regex LinkPattern();
    }
}
