using System.ComponentModel.DataAnnotations;

namespace PizzaShop.Api.Options
{
    // Bound from the "Orders" section of appsettings.json and validated at startup.
    public class OrderOptions
    {
        public const string SectionName = "Orders";

        // Fraction of the subtotal, e.g. 0.0825 for 8.25%.
        [Range(typeof(decimal), "0", "1")]
        public decimal TaxRate { get; set; }
    }
}
