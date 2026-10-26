using PizzaShop.Api.Dtos;

namespace PizzaShop.Api.Statistics
{
    // A resolved date range: local dates (both inclusive) and the UTC instants that bound them,
    // [StartUtc, EndUtc), for filtering Orders.CreatedAt.
    public record StatisticsRange(DateOnly From, DateOnly To, DateTimeOffset StartUtc, DateTimeOffset EndUtc)
    {
        public int Days => To.DayNumber - From.DayNumber + 1;
    }

    // Either a range or the request field that made it invalid and why.
    public record RangeResult(StatisticsRange? Range, string? ErrorField = null, string? Error = null);

    // The columns /sales needs from each order in the range.
    public record OrderSnapshot(DateTimeOffset CreatedAt, bool IsCancelled, decimal SubTotal, decimal Tax, decimal Total);

    // Pure date and sales math for the statistics endpoints: no database, no HTTP.
    public static class StatisticsCalculator
    {
        public const int DefaultDays = 7;
        public const int MaxDays = 366;

        // Missing dates default to the last DefaultDays days ending today (local): `to` alone
        // counts back from it, `from` alone runs up to today.
        public static RangeResult ResolveRange(DateOnly? from, DateOnly? to, TimeZoneInfo zone, DateTimeOffset now)
        {
            var today = LocalDate(now, zone);
            var end = to ?? (from is null ? today : Max(from.Value, today));
            var start = from ?? end.AddDays(-(DefaultDays - 1));

            if (start > end)
            {
                return new RangeResult(null, "From", "'from' must be on or before 'to'.");
            }
            if (end.DayNumber - start.DayNumber + 1 > MaxDays)
            {
                return new RangeResult(null, "To", $"The range can be at most {MaxDays} days.");
            }

            return new RangeResult(new StatisticsRange(start, end, StartOfDayUtc(start, zone), StartOfDayUtc(end.AddDays(1), zone)));
        }

        public static DateOnly LocalDate(DateTimeOffset instant, TimeZoneInfo zone) =>
            DateOnly.FromDateTime(TimeZoneInfo.ConvertTime(instant, zone).DateTime);

        // Local midnight as a UTC instant (offset 0, which Npgsql requires for timestamptz).
        // Where a DST change skips midnight, the day starts at the first local time that exists.
        public static DateTimeOffset StartOfDayUtc(DateOnly date, TimeZoneInfo zone)
        {
            var local = date.ToDateTime(TimeOnly.MinValue);
            while (zone.IsInvalidTime(local))
            {
                local = local.AddMinutes(15);
            }
            return new DateTimeOffset(local, zone.GetUtcOffset(local)).ToUniversalTime();
        }

        public static SalesStatisticsDto Sales(IReadOnlyCollection<OrderSnapshot> orders, StatisticsRange range, TimeZoneInfo zone)
        {
            var sold = orders.Where(o => !o.IsCancelled).ToList();
            var cancelled = orders.Where(o => o.IsCancelled).ToList();
            var total = sold.Sum(o => o.Total);

            var totals = new SalesTotalsDto(
                sold.Count,
                sold.Sum(o => o.SubTotal),
                sold.Sum(o => o.Tax),
                total,
                sold.Count == 0 ? 0m : RoundMoney(total / sold.Count));

            // Every day in the range, including the ones without orders, so a chart has no gaps.
            var byDay = orders.ToLookup(o => LocalDate(o.CreatedAt, zone));
            var days = Enumerable.Range(0, range.Days)
                .Select(offset => range.From.AddDays(offset))
                .Select(date =>
                {
                    var dayOrders = byDay[date];
                    return new SalesDayDto(
                        date,
                        dayOrders.Count(o => !o.IsCancelled),
                        dayOrders.Where(o => !o.IsCancelled).Sum(o => o.Total),
                        dayOrders.Count(o => o.IsCancelled),
                        dayOrders.Where(o => o.IsCancelled).Sum(o => o.Total));
                })
                .ToList();

            return new SalesStatisticsDto(
                range.From,
                range.To,
                zone.Id,
                totals,
                CancelledSummary(cancelled.Count, cancelled.Sum(o => o.Total), orders.Count),
                days);
        }

        public static CancelledSummaryDto CancelledSummary(int cancelledCount, decimal cancelledTotal, int allOrders) =>
            new(cancelledCount, cancelledTotal, allOrders == 0 ? 0m : Math.Round((decimal)cancelledCount / allOrders, 4, MidpointRounding.AwayFromZero));

        private static DateOnly Max(DateOnly a, DateOnly b) => a > b ? a : b;

        private static decimal RoundMoney(decimal value) => Math.Round(value, 2, MidpointRounding.AwayFromZero);
    }
}
