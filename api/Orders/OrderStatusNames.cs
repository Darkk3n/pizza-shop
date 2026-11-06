using PizzaShop.Api.Models;

namespace PizzaShop.Api.Orders
{
    // Spanish (es-MX) wording for order statuses inside Problem Details text. Display only: the API
    // and the database keep the enum names (Pending, Preparing, ...). Matches the web app's
    // ORDER_STATUS_LABELS (lib/helpers/format.ts), lowercased to sit inside a sentence.
    public static class OrderStatusNames
    {
        public static string InSentence(OrderStatus status) => status switch
        {
            OrderStatus.Pending => "pendiente",
            OrderStatus.Preparing => "en preparación",
            OrderStatus.Ready => "listo",
            OrderStatus.Completed => "completado",
            OrderStatus.Cancelled => "cancelado",
            _ => status.ToString(),
        };
    }
}
