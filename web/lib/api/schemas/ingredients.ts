import { z } from "zod";
import { hasMaxDecimals } from "@/lib/api/schemas/numbers";

// GET /api/ingredients (staff), by name. Orders may push currentStock negative; manual
// adjustments may not.
export const ingredientSchema = z.object({
  ingredientId: z.uuid(),
  name: z.string(),
  unitOfMeasureId: z.uuid(),
  unitOfMeasureName: z.string(),
  currentStock: z.number(),
  isActive: z.boolean(),
  // Both set = offered as a topping; both null = not.
  toppingPrice: z.number().nullable(),
  toppingPortion: z.number().nullable(),
});

export type Ingredient = z.infer<typeof ingredientSchema>;

// CurrentStock is Decimal(10,2) and the API takes deltas up to ±99,999,999.99.
const MAX_STOCK = 99_999_999.99;
const hasTwoDecimals = hasMaxDecimals(2);

const quantity = z
  .number({ error: "Enter a quantity." })
  .max(MAX_STOCK, "That's more than the stock can hold.")
  .refine(hasTwoDecimals, "Use at most two decimals.");

// Restock adds, waste removes, recount sets the counted stock (the delta is worked out from it).
export const STOCK_ADJUSTMENT_MODES = ["Restock", "Waste", "Recount"] as const;
export type StockAdjustmentMode = (typeof STOCK_ADJUSTMENT_MODES)[number];

export const stockAdjustmentFormSchema = z.discriminatedUnion("mode", [
  z.object({ mode: z.literal("Restock"), quantity: quantity.positive("Enter more than zero.") }),
  z.object({ mode: z.literal("Waste"), quantity: quantity.positive("Enter more than zero.") }),
  z.object({ mode: z.literal("Recount"), quantity: quantity.min(0, "Stock can't be counted below zero.") }),
]);

export type StockAdjustmentForm = z.infer<typeof stockAdjustmentFormSchema>;

// POST /api/ingredients/{id}/stock-adjustments body: positive adds stock, negative removes it.
export const stockAdjustmentSchema = z.object({
  delta: z
    .number()
    .min(-MAX_STOCK)
    .max(MAX_STOCK)
    .refine((delta) => delta !== 0, "Nothing to change.")
    .refine(hasTwoDecimals, "Use at most two decimals."),
});

export const stockDelta = (form: StockAdjustmentForm, currentStock: number) => {
  const delta = form.mode === "Restock" ? form.quantity : form.mode === "Waste" ? -form.quantity : form.quantity - currentStock;
  // Both sides have two decimals; rounding drops float noise like 0.30000000000000004.
  return Math.round(delta * 100) / 100;
};
