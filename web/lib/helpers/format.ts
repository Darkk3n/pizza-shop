import type { OrderStatus, OrderType } from "@/lib/api/schemas/orders";
import type { UserRole } from "@/lib/api/schemas/users";
import { restaurant } from "@/lib/restaurant";

// Every user speaks Spanish (Mexico): es-MX formats, MXN prices, and timestamps in the restaurant's
// zone (America/Mexico_City, the API's Statistics:TimeZone) whatever the server's TZ is.
const LOCALE = "es-MX";

const currency = new Intl.NumberFormat(LOCALE, { style: "currency", currency: "MXN" });

// "$1,250.50"
export const formatMoney = (amount: number) => currency.format(amount);

const quantity = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 2 });

// Stock levels, up to the two decimals CurrentStock keeps ("1,250.5").
export const formatQuantity = (amount: number) => quantity.format(amount);

// es-MX compact currency reads "1.5 k$", so the peso sign goes in front of a compact number instead.
const compactNumber = new Intl.NumberFormat(LOCALE, { notation: "compact", maximumFractionDigits: 1 });

// Axis ticks and chart labels: "$0", "$500", "$1.5 k".
export const formatCompactMoney = (amount: number) =>
  amount < 0 ? `-$${compactNumber.format(-amount)}` : `$${compactNumber.format(amount)}`;

const percent = new Intl.NumberFormat(LOCALE, { style: "percent", maximumFractionDigits: 1 });

// A 0..1 ratio: 0.1389 -> "13.9%".
export const formatPercent = (ratio: number) => percent.format(ratio);

// Statistics dates are local calendar days ("2026-10-21") already in the restaurant's zone, so
// they're formatted as UTC to keep the server's own time zone from shifting them a day.
const day = new Intl.DateTimeFormat(LOCALE, { dateStyle: "medium", timeZone: "UTC" });
const shortDay = new Intl.DateTimeFormat(LOCALE, { month: "short", day: "numeric", timeZone: "UTC" });
const weekday = new Intl.DateTimeFormat(LOCALE, { weekday: "short", timeZone: "UTC" });
const dayDate = (isoDate: string) => new Date(`${isoDate}T00:00:00Z`);

// "21 oct 2026", "21 oct", "mié"
export const formatDay = (isoDate: string) => day.format(dayDate(isoDate));
export const formatShortDay = (isoDate: string) => shortDay.format(dayDate(isoDate));
export const formatWeekday = (isoDate: string) => weekday.format(dayDate(isoDate));

const dateTime = new Intl.DateTimeFormat(LOCALE, {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: restaurant.timeZone,
});

// API timestamps are DateTimeOffset (ISO 8601 with offset), shown in the restaurant's zone:
// "21 oct 2026, 4:05 p.m.".
export const formatDateTime = (iso: string) => dateTime.format(new Date(iso));

// Display labels only: the API values (DineIn, Pending, Whole, Light, ...) never change.
export const ORDER_TYPE_LABELS: Record<OrderType, string> = {
  DineIn: "Para comer aquí",
  Takeout: "Para llevar",
  Delivery: "A domicilio",
};

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  Pending: "Pendiente",
  Preparing: "En preparación",
  Ready: "Listo",
  Completed: "Completado",
  Cancelled: "Cancelado",
};

// The button that moves an order to each status (dashboard and order page).
export const ORDER_STATUS_ACTION_LABELS: Partial<Record<OrderStatus, string>> = {
  Preparing: "Empezar a preparar",
  Ready: "Marcar como listo",
  Completed: "Marcar como completado",
};

// Role names as shown; the API's role values (Admin, Staff, none = Customer) never change.
export const ROLE_LABELS: Record<UserRole, string> = {
  Customer: "Cliente",
  Staff: "Personal",
  Admin: "Administrador",
};

export const COVERAGE_LABELS = { Whole: "Completa", LeftHalf: "Mitad izquierda", RightHalf: "Mitad derecha" } as const;
export const AMOUNT_LABELS = { Light: "Poco", Standard: "Normal", Extra: "Extra" } as const;

// "Aceitunas negras (mitad izquierda, extra)"; whole and standard are the defaults, so they're left out.
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

const time = new Intl.DateTimeFormat(LOCALE, { timeStyle: "short", timeZone: restaurant.timeZone });

// "4:05 p.m.", for today's orders on the dashboard (restaurant time zone, like formatDateTime).
export const formatTime = (iso: string) => time.format(new Date(iso));

// Whole minutes since an order was placed: "Ahora", "12 min", "1 h 5 min".
export const formatElapsed = (minutes: number) => {
  if (minutes < 1) return "Ahora";
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`;
};
