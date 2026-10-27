namespace PizzaShop.Api.Email
{
    // One outgoing email, already rendered. Text is the plain-text alternative for clients that
    // don't show HTML (and for spam filters, which distrust HTML-only mail).
    public record EmailMessage(string To, string Subject, string Html, string Text);

    // Hands a message to whatever delivers it: SMTP in the app, a recorder in the tests.
    public interface IEmailDelivery
    {
        Task SendAsync(EmailMessage message, CancellationToken ct = default);
    }
}
