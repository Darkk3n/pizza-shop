using PizzaShop.Api.Statistics;

namespace PizzaShop.Api.Tests
{
    // Unit tests: StatisticsCalculator is pure, so these need no database or API host.
    public class StatisticsCalculatorTests
    {
        // UTC-6 all year (no DST since 2022): the configured restaurant zone.
        private static readonly TimeZoneInfo MexicoCity = TimeZoneInfo.FindSystemTimeZoneById("America/Mexico_City");

        // Has DST, to show nothing assumes a fixed offset.
        private static readonly TimeZoneInfo Chicago = TimeZoneInfo.FindSystemTimeZoneById("America/Chicago");

        // 2026-10-26 15:00 in Mexico City.
        private static readonly DateTimeOffset Now = new(2026, 10, 26, 21, 0, 0, TimeSpan.Zero);

        private static StatisticsRange Resolve(DateOnly? from, DateOnly? to, TimeZoneInfo? zone = null) =>
            StatisticsCalculator.ResolveRange(from, to, zone ?? MexicoCity, Now).Range
                ?? throw new InvalidOperationException("Expected a valid range.");

        private static OrderSnapshot Order(DateTimeOffset createdAt, decimal total, bool cancelled = false) =>
            new(createdAt, cancelled, SubTotal: total - 1m, Tax: 1m, Total: total);

        [Fact]
        public void NoDates_DefaultsToTheLastSevenLocalDays()
        {
            var range = Resolve(null, null);

            Assert.Equal(new DateOnly(2026, 10, 20), range.From);
            Assert.Equal(new DateOnly(2026, 10, 26), range.To);
            Assert.Equal(7, range.Days);
            // Local midnights as UTC instants (offset 0, as Npgsql needs).
            Assert.Equal(new DateTimeOffset(2026, 10, 20, 6, 0, 0, TimeSpan.Zero), range.StartUtc);
            Assert.Equal(new DateTimeOffset(2026, 10, 27, 6, 0, 0, TimeSpan.Zero), range.EndUtc);
            Assert.Equal(TimeSpan.Zero, range.StartUtc.Offset);
        }

        [Fact]
        public void TodayIsTheLocalDate_NotTheUtcOne()
        {
            // 2026-10-27 02:00 UTC is still the 26th (20:00) in Mexico City.
            var lateEvening = new DateTimeOffset(2026, 10, 27, 2, 0, 0, TimeSpan.Zero);

            var range = StatisticsCalculator.ResolveRange(null, null, MexicoCity, lateEvening).Range!;

            Assert.Equal(new DateOnly(2026, 10, 26), range.To);
        }

        [Fact]
        public void OnlyTo_CountsBackSevenDays_OnlyFrom_RunsToToday()
        {
            var to = Resolve(null, new DateOnly(2026, 10, 10));
            Assert.Equal(new DateOnly(2026, 10, 4), to.From);

            var from = Resolve(new DateOnly(2026, 10, 1), null);
            Assert.Equal(new DateOnly(2026, 10, 26), from.To);
        }

        [Fact]
        public void Days_CountBackFromToday_AndAreIgnoredWhenFromIsGiven()
        {
            var lastThirty = StatisticsCalculator.ResolveRange(null, null, MexicoCity, Now, days: 30).Range!;
            Assert.Equal((new DateOnly(2026, 9, 27), new DateOnly(2026, 10, 26), 30), (lastThirty.From, lastThirty.To, lastThirty.Days));

            var today = StatisticsCalculator.ResolveRange(null, null, MexicoCity, Now, days: 1).Range!;
            Assert.Equal(today.To, today.From);

            var explicitFrom = StatisticsCalculator.ResolveRange(new DateOnly(2026, 10, 25), null, MexicoCity, Now, days: 30).Range!;
            Assert.Equal(2, explicitFrom.Days);
        }

        [Fact]
        public void FromAfterTo_IsRejected()
        {
            var result = StatisticsCalculator.ResolveRange(new DateOnly(2026, 10, 5), new DateOnly(2026, 10, 4), MexicoCity, Now);

            Assert.Null(result.Range);
            Assert.Equal("From", result.ErrorField);
        }

        [Fact]
        public void RangesUpTo366Days_AreAllowed_LongerOnesRejected()
        {
            Assert.Equal(366, Resolve(new DateOnly(2024, 1, 1), new DateOnly(2024, 12, 31)).Days);

            var tooLong = StatisticsCalculator.ResolveRange(new DateOnly(2024, 1, 1), new DateOnly(2025, 1, 1), MexicoCity, Now);
            Assert.Null(tooLong.Range);
            Assert.Equal("To", tooLong.ErrorField);
        }

        [Fact]
        public void DstZone_DaysStartAtLocalMidnight_OnBothSidesOfTheChange()
        {
            // Chicago leaves DST on 2026-11-01: midnight is UTC-5 that day, UTC-6 the next.
            var range = Resolve(new DateOnly(2026, 11, 1), new DateOnly(2026, 11, 1), Chicago);

            Assert.Equal(new DateTimeOffset(2026, 11, 1, 5, 0, 0, TimeSpan.Zero), range.StartUtc);
            Assert.Equal(new DateTimeOffset(2026, 11, 2, 6, 0, 0, TimeSpan.Zero), range.EndUtc);
            // That day is 25 hours long.
            Assert.Equal(TimeSpan.FromHours(25), range.EndUtc - range.StartUtc);
        }

        [Fact]
        public void Sales_ExcludeCancelledOrders_AndReportThemSeparately()
        {
            var range = Resolve(new DateOnly(2026, 10, 26), new DateOnly(2026, 10, 26));
            var noon = new DateTimeOffset(2026, 10, 26, 18, 0, 0, TimeSpan.Zero);

            var sales = StatisticsCalculator.Sales(
                [Order(noon, 10.00m), Order(noon, 20.01m), Order(noon, 15.00m, cancelled: true)],
                range,
                MexicoCity);

            Assert.Equal(2, sales.Totals.OrderCount);
            Assert.Equal(30.01m, sales.Totals.Total);
            Assert.Equal(28.01m, sales.Totals.SubTotal);
            Assert.Equal(2.00m, sales.Totals.Tax);
            // 30.01 / 2 = 15.005, rounded half away from zero.
            Assert.Equal(15.01m, sales.Totals.AverageOrderValue);
            Assert.Equal(1, sales.Cancelled.OrderCount);
            Assert.Equal(15.00m, sales.Cancelled.Total);
            Assert.Equal(0.3333m, sales.Cancelled.Rate);
            Assert.Equal("America/Mexico_City", sales.TimeZone);
        }

        [Fact]
        public void Sales_BucketByLocalDate_AndFillEmptyDays()
        {
            var range = Resolve(new DateOnly(2026, 10, 24), new DateOnly(2026, 10, 26));
            // 23:30 local on the 24th is already the 25th in UTC; it belongs to the 24th.
            var lateOn24th = new DateTimeOffset(2026, 10, 25, 5, 30, 0, TimeSpan.Zero);
            var on26th = new DateTimeOffset(2026, 10, 26, 18, 0, 0, TimeSpan.Zero);

            var days = StatisticsCalculator.Sales(
                [Order(lateOn24th, 12.00m), Order(on26th, 8.00m), Order(on26th, 5.00m, cancelled: true)],
                range,
                MexicoCity).Days;

            Assert.Collection(days,
                d => Assert.Equal((new DateOnly(2026, 10, 24), 1, 12.00m, 0, 0m), (d.Date, d.OrderCount, d.Total, d.CancelledCount, d.CancelledTotal)),
                d => Assert.Equal((new DateOnly(2026, 10, 25), 0, 0m, 0, 0m), (d.Date, d.OrderCount, d.Total, d.CancelledCount, d.CancelledTotal)),
                d => Assert.Equal((new DateOnly(2026, 10, 26), 1, 8.00m, 1, 5.00m), (d.Date, d.OrderCount, d.Total, d.CancelledCount, d.CancelledTotal)));
        }

        [Fact]
        public void Sales_WithNoOrders_AreZero_NotDivisionErrors()
        {
            var range = Resolve(new DateOnly(2026, 10, 26), new DateOnly(2026, 10, 26));

            var sales = StatisticsCalculator.Sales([], range, MexicoCity);

            Assert.Equal(0, sales.Totals.OrderCount);
            Assert.Equal(0m, sales.Totals.AverageOrderValue);
            Assert.Equal(0m, sales.Cancelled.Rate);
            Assert.Single(sales.Days);
        }
    }
}
