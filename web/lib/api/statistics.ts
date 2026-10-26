import "server-only";
import { apiJson } from "@/lib/api/client";
import {
  cancellationStatisticsSchema,
  ingredientUsageStatisticsSchema,
  itemStatisticsSchema,
  salesStatisticsSchema,
  type StatisticsQuery,
} from "@/lib/api/schemas/statistics";

// The same range goes to every section, so they all cover the same orders. A custom from/to wins
// over `days` (the API ignores `days` when `from` is given); nothing at all = the last 7 days.
const query = (range: StatisticsQuery, extra: Record<string, string> = {}) => {
  const params = new URLSearchParams(extra);
  if (range.from) params.set("from", range.from);
  if (range.to) params.set("to", range.to);
  if (!range.from && range.days) params.set("days", String(range.days));
  return params.toString();
};

export const getSalesStatistics = async (range: StatisticsQuery) =>
  apiJson(`/api/statistics/sales?${query(range)}`, salesStatisticsSchema);

export const getItemStatistics = async (range: StatisticsQuery, limit = 10) =>
  apiJson(`/api/statistics/items?${query(range, { limit: String(limit) })}`, itemStatisticsSchema);

export const getCancellationStatistics = async (range: StatisticsQuery, limit = 10) =>
  apiJson(`/api/statistics/cancellations?${query(range, { limit: String(limit) })}`, cancellationStatisticsSchema);

export const getIngredientUsage = async (range: StatisticsQuery) =>
  apiJson(`/api/statistics/ingredient-usage?${query(range)}`, ingredientUsageStatisticsSchema);
