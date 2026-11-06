using System.Net;
using Microsoft.AspNetCore.WebUtilities;

namespace PizzaShop.Api.Email
{
    // Pure rendering of the account emails Identity asks for: no SMTP, no database. Links point at
    // the web app (Email:WebBaseUrl), which calls the API on the user's behalf.
    public static class AccountEmails
    {
        // Identity builds its confirmation link to its own API endpoint
        // (/api/auth/confirmEmail?userId=...&code=...[&changedEmail=...]) and HTML-encodes it before
        // handing it over (so "&" arrives as "&amp;"). The same query moves to the web app's
        // /confirm-email page, which forwards it to that endpoint.
        public static string ConfirmEmailLink(string webBaseUrl, string identityLink)
        {
            var query = IdentityQuery(identityLink);
            var parameters = new Dictionary<string, string?>
            {
                ["userId"] = query["userId"].ToString(),
                ["code"] = query["code"].ToString(),
            };
            if (query.TryGetValue("changedEmail", out var changedEmail))
            {
                parameters["changedEmail"] = changedEmail.ToString();
            }
            return QueryHelpers.AddQueryString(WebUrl(webBaseUrl, "/confirm-email"), parameters);
        }

        // Identity adds changedEmail when the link confirms a new address for an existing account.
        public static bool IsEmailChange(string identityLink) => IdentityQuery(identityLink).ContainsKey("changedEmail");

        private static Dictionary<string, Microsoft.Extensions.Primitives.StringValues> IdentityQuery(string identityLink) =>
            QueryHelpers.ParseQuery(new Uri(WebUtility.HtmlDecode(identityLink)).Query);

        // Identity hands over a reset code (already URL-safe); the web page posts it back with the
        // email and the new password to /api/auth/resetPassword.
        public static string ResetPasswordLink(string webBaseUrl, string email, string resetCode) =>
            QueryHelpers.AddQueryString(WebUrl(webBaseUrl, "/reset-password"), new Dictionary<string, string?>
            {
                ["email"] = email,
                ["code"] = resetCode,
            });

        public static EmailMessage Confirmation(string to, string link, bool isEmailChange) =>
            Render(
                to,
                isEmailChange ? "Confirma tu nuevo correo electrónico" : "Confirma tu cuenta de Rubencinis & Mate Pizza",
                isEmailChange
                    ? "Confirma este correo para empezar a usarlo en tu cuenta de Rubencinis & Mate Pizza."
                    : "¡Bienvenido! Confirma tu correo electrónico para terminar de crear tu cuenta de Rubencinis & Mate Pizza.",
                "Confirmar correo",
                link,
                "Si no lo pediste, puedes ignorar este correo.");

        public static EmailMessage PasswordReset(string to, string link) =>
            Render(
                to,
                "Restablece tu contraseña de Rubencinis & Mate Pizza",
                "Alguien pidió restablecer la contraseña de esta cuenta de Rubencinis & Mate Pizza. El enlace funciona una sola vez y vence en un día.",
                "Elegir nueva contraseña",
                link,
                "Si no fuiste tú, ignora este correo: tu contraseña sigue igual.");

        private static string WebUrl(string webBaseUrl, string path) => webBaseUrl.TrimEnd('/') + path;

        // Inline styles and a table-free single column: what email clients render consistently.
        private static EmailMessage Render(string to, string subject, string intro, string action, string link, string footer)
        {
            var href = WebUtility.HtmlEncode(link);
            var html = $"""
                <!doctype html>
                <html lang="es">
                  <body style="margin:0;padding:24px;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;color:#171717">
                    <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:12px;padding:32px">
                      <p style="margin:0 0 16px;font-size:20px;font-weight:bold">Rubencinis &amp; Mate Pizza</p>
                      <p style="margin:0 0 24px;font-size:15px;line-height:1.5">{WebUtility.HtmlEncode(intro)}</p>
                      <p style="margin:0 0 24px">
                        <a href="{href}" style="display:inline-block;background:#d32f2f;color:#ffffff;text-decoration:none;font-weight:bold;padding:12px 20px;border-radius:8px">{WebUtility.HtmlEncode(action)}</a>
                      </p>
                      <p style="margin:0 0 8px;font-size:13px;color:#525252">O copia este enlace en tu navegador:</p>
                      <p style="margin:0 0 24px;font-size:13px;word-break:break-all"><a href="{href}" style="color:#525252">{href}</a></p>
                      <p style="margin:0;font-size:13px;color:#737373">{WebUtility.HtmlEncode(footer)}</p>
                    </div>
                  </body>
                </html>
                """;
            var text = $"{intro}\n\n{action}: {link}\n\n{footer}\n";
            return new EmailMessage(to, subject, html, text);
        }
    }
}
