using System.ComponentModel.DataAnnotations;

namespace PizzaShop.Api.Options
{
    // Bound from the "Statistics" section of appsettings.json and validated at startup
    // (Program.cs also checks that the time zone exists).
    public class StatisticsOptions
    {
        public const string SectionName = "Statistics";

        // IANA id of the restaurant's time zone, e.g. "America/Mexico_City". Statistics group
        // orders by local date, so a late-evening order counts for that day, not the next UTC one.
        [Required]
        public string TimeZone { get; set; } = string.Empty;
    }
}
