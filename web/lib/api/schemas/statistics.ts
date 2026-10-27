import { z } from "zod";

// GET /api/statistics/* (admin). Every response echoes the resolved range: local dates
// (yyyy-MM-dd, both inclusive) in the restaurant's time zone.
const rangeFields = {
  from: z.string(),
  to: z.string(),
  timeZone: z.string(),
};

const cancelledSummarySchema = z.object({
  orderCount: z.number().int(),
  total: z.number(),
  // 0..1: cancelled / all orders placed in the range.
  rate: z.number(),
});

export const salesStatisticsSchema = z.object({
  ...rangeFields,
  // Non-cancelled orders: a sale counts when the order is placed.
  totals: z.object({
    orderCount: z.number().int(),
    subTotal: z.number(),
    tax: z.number(),
    total: z.number(),
    averageOrderValue: z.number(),
  }),
  cancelled: cancelledSummarySchema,
  // Every day in the range, zero-filled.
  days: z.array(
    z.object({
      date: z.string(),
      orderCount: z.number().int(),
      total: z.number(),
      cancelledCount: z.number().int(),
      cancelledTotal: z.number(),
    }),
  ),
});

export type SalesStatistics = z.infer<typeof salesStatisticsSchema>;
export type SalesDay = SalesStatistics["days"][number];

export const itemStatisticsSchema = z.object({
  ...rangeFields,
  // Revenue is the line totals, so a pizza's includes its toppings.
  recipes: z.array(z.object({ recipeId: z.uuid(), name: z.string(), quantity: z.number().int(), revenue: z.number() })),
  toppings: z.array(
    z.object({ ingredientId: z.uuid(), name: z.string(), timesPicked: z.number().int(), revenue: z.number() }),
  ),
});

export const cancellationStatisticsSchema = z.object({
  ...rangeFields,
  summary: cancelledSummarySchema,
  byRole: z.object({ customer: z.number().int(), staff: z.number().int() }),
  recent: z.array(
    z.object({
      orderId: z.uuid(),
      orderNumber: z.number().int(),
      cancelledAt: z.string().nullable(),
      cancelledByEmail: z.string().nullable(),
      reason: z.string().nullable(),
      total: z.number(),
    }),
  ),
});

export const ingredientUsageStatisticsSchema = z.object({
  ...rangeFields,
  ingredients: z.array(
    z.object({
      ingredientId: z.uuid(),
      name: z.string(),
      unitOfMeasureName: z.string(),
      used: z.number(),
      currentStock: z.number(),
    }),
  ),
});

// The API's limit (Statistics MaxDays) and the presets the page offers.
export const MAX_RANGE_DAYS = 366;
export const RANGE_PRESETS = [1, 7, 30, 90] as const;

const isoDate = z.iso.date();

// What /analytics reads from the URL: a preset (`days`) or a custom `from`/`to`. Malformed values
// fall back to the default instead of erroring; an out-of-order or too-long custom range is reported.
export const statisticsQuerySchema = z.object({
  days: z.coerce.number().int().min(1).max(MAX_RANGE_DAYS).optional().catch(undefined),
  from: isoDate.optional().catch(undefined),
  to: isoDate.optional().catch(undefined),
});

export type StatisticsQuery = z.infer<typeof statisticsQuerySchema>;

// Day count of an inclusive yyyy-MM-dd range (UTC math, so no time zone or DST shifts).
const dayNumber = (date: string) => Date.parse(`${date}T00:00:00Z`) / 86_400_000;

export const customRangeError = ({ from, to }: StatisticsQuery) => {
  if (!from || !to) return null;
  if (from > to) return "The start date must be on or before the end date.";
  if (dayNumber(to) - dayNumber(from) + 1 > MAX_RANGE_DAYS) return `Pick at most ${MAX_RANGE_DAYS} days.`;
  return null;
};

// GET /api/statistics/restock: not tied to the page's range; always the last complete week.
export const restockProjectionSchema = z.object({
  ...rangeFields,
  lookbackDays: z.number().int(),
  coverDays: z.number().int(),
  ingredients: z.array(
    z.object({
      ingredientId: z.uuid(),
      name: z.string(),
      unitOfMeasureName: z.string(),
      isActive: z.boolean(),
      used: z.number(),
      averageDailyUse: z.number(),
      currentStock: z.number(),
      // Null when it wasn't used in the lookback (no pace to project from).
      // Whole days, rounded down (0 = less than a day).
      daysOfStockLeft: z.number().int().nullable(),
      suggestedRestock: z.number(),
    }),
  ),
});
