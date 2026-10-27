import type { OrderStatus, OrderType } from "@/lib/api/schemas/orders";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export const formatMoney = (amount: number) => currency.format(amount);

const quantity = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });

// Stock levels, up to the two decimals CurrentStock keeps ("1,250.5").
export const formatQuantity = (amount: number) => quantity.format(amount);

const compactMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

// Axis ticks and chart labels: "$0", "$500", "$1.5K".
export const formatCompactMoney = (amount: number) => compactMoney.format(amount);

const percent = new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 1 });

// A 0..1 ratio: 0.1389 -> "13.9%".
export const formatPercent = (ratio: number) => percent.format(ratio);

// Statistics dates are local calendar days ("2026-10-21") already in the restaurant's zone, so
// they're formatted as UTC to keep the server's own time zone from shifting them a day.
const day = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" });
const shortDay = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
const weekday = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "UTC" });
const dayDate = (isoDate: string) => new Date(`${isoDate}T00:00:00Z`);

export const formatDay = (isoDate: string) => day.format(dayDate(isoDate));
export const formatShortDay = (isoDate: string) => shortDay.format(dayDate(isoDate));
export const formatWeekday = (isoDate: string) => weekday.format(dayDate(isoDate));

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

// "Black Olives (left half, extra)"; whole and standard are the defaults, so they're left out.
export const describeTopping = (topping: {
  ingredientName: string;
  coverage: keyof typeof COVERAGE_LABELS;
  extraAmount: keyof typeof AMOUNT_LABELS;
}) => {
  const notes = [
    topping.coverage !== "Whole" && COVERAGE_LABELS[topping.coverage].toLowerCase(),
    topping.extraAmount !== "Standard" && AMOUNT_LABELS[topping.extraAmount].toLowerCase(),
  ].filter(Boolean);
  return notes.length > 0 ? `${topping.ingredientName} (${notes.join(", ")})` : topping.ingredientName;
};

const time = new Intl.DateTimeFormat("en-US", { timeStyle: "short" });

// "4:05 PM", for today's orders on the dashboard (server time zone, like formatDateTime).
export const formatTime = (iso: string) => time.format(new Date(iso));

// Whole minutes since an order was placed: "Just now", "12 min", "1 h 5 min".
export const formatElapsed = (minutes: number) => {
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`;
};
