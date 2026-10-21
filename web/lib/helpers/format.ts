import type { OrderStatus, OrderType } from "@/lib/api/schemas/orders";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export const formatMoney = (amount: number) => currency.format(amount);

const dateTime = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" });

// API timestamps are DateTimeOffset (ISO 8601 with offset). Server-rendered, so this uses the
// server's time zone; set TZ for the restaurant (e.g. TZ=America/Chicago) in production.
export const formatDateTime = (iso: string) => dateTime.format(new Date(iso));

export const ORDER_TYPE_LABELS: Record<OrderType, string> = {
  DineIn: "Dine-in",
  Takeout: "Takeout",
  Delivery: "Delivery",
};

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  Pending: "Pending",
  Preparing: "Preparing",
  Ready: "Ready",
  Completed: "Completed",
  Cancelled: "Cancelled",
};

export const COVERAGE_LABELS = { Whole: "Whole", LeftHalf: "Left half", RightHalf: "Right half" } as const;
export const AMOUNT_LABELS = { Light: "Light", Standard: "Standard", Extra: "Extra" } as const;
