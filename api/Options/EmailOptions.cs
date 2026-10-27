using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.Options;

namespace PizzaShop.Api.Options
{
    // Bound from the "Email" section of appsettings.json and validated at startup. appsettings.json
    // points at the local Mailpit container; Azure overrides Smtp and WebBaseUrl with environment
    // variables (Email__Smtp__Host, ...), so any SMTP provider is a configuration change.
    public class EmailOptions
    {
        public const string SectionName = "Email";

        [Required, EmailAddress]
        public string FromAddress { get; set; } = string.Empty;

        [Required]
        public string FromName { get; set; } = string.Empty;

        // The web app's public URL. Email links open its pages (/confirm-email, /reset-password),
        // never the API, because the browser only talks to the BFF.
        [Required, Url]
        public string WebBaseUrl { get; set; } = string.Empty;

        [Required, ValidateObjectMembers]
        public SmtpOptions Smtp { get; set; } = new();
    }

    public class SmtpOptions
    {
        [Required]
        public string Host { get; set; } = string.Empty;

        [Range(1, 65535)]
        public int Port { get; set; } = 587;

        public SmtpSecurity Security { get; set; } = SmtpSecurity.StartTls;

        // Both empty = no authentication (Mailpit).
        public string? UserName { get; set; }

        public string? Password { get; set; }
    }

    public enum SmtpSecurity
    {
        // Plain connection: only for a local catcher like Mailpit.
        None,
        // Upgrade to TLS after connecting (port 587, what most providers use).
        StartTls,
        // TLS from the first byte (port 465).
        SslOnConnect,
    }
}
