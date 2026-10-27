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

// GET /api/units-of-measure, by name (Gram, Milliliter, Piece are seeded; admins add more).
export const unitOfMeasureSchema = z.object({
  unitOfMeasureId: z.uuid(),
  name: z.string(),
});

export type UnitOfMeasure = z.infer<typeof unitOfMeasureSchema>;

// POST/PUT /api/units-of-measure (admin).
export const unitOfMeasureFormSchema = z.object({
  name: z.string().trim().min(1, "Enter a name.").max(20, "Keep the name under 20 characters."),
});

export type UnitOfMeasureForm = z.infer<typeof unitOfMeasureFormSchema>;

// CurrentStock is Decimal(10,2) and the API takes deltas up to ±99,999,999.99.
const MAX_STOCK = 99_999_999.99;
const hasTwoDecimals = hasMaxDecimals(2);

// Empty number inputs read as NaN; these fields only matter in some cases (a topping, a new
// ingredient), so NaN is allowed here and checked by the rules below when it counts.
const optionalNumber = z.union([z.number(), z.nan()]);

const ingredientFormShape = {
  name: z.string().trim().min(1, "Enter a name.").max(50, "Keep the name under 50 characters."),
  unitOfMeasureId: z.uuid({ error: "Pick a unit." }),
  isActive: z.boolean(),
  isTopping: z.boolean(),
  // Per Small, Whole, Standard serving; the API scales by size, coverage and amount.
  toppingPrice: optionalNumber,
  toppingPortion: optionalNumber,
  currentStock: optionalNumber,
};

type IngredientFormShape = { [K in keyof typeof ingredientFormShape]: z.infer<(typeof ingredientFormShape)[K]> };

// The API takes ToppingPrice and ToppingPortion together or not at all.
const checkTopping = (value: IngredientFormShape, ctx: z.RefinementCtx) => {
  if (!value.isTopping) return;
  const price = value.toppingPrice;
  const portion = value.toppingPortion;
  const priceError = Number.isNaN(price)
    ? "Enter a price."
    : price < 0
      ? "The price can't be negative."
      : price > MAX_STOCK
        ? "That price is too large."
        : !hasTwoDecimals(price) && "Use at most two decimals.";
  const portionError = Number.isNaN(portion)
    ? "Enter a portion."
    : portion <= 0
      ? "Enter more than zero."
      : portion > 999_999.9999
        ? "That portion is too large."
        : !hasMaxDecimals(4)(portion) && "Use at most four decimals.";
  if (priceError) ctx.addIssue({ code: "custom", path: ["toppingPrice"], message: priceError });
  if (portionError) ctx.addIssue({ code: "custom", path: ["toppingPortion"], message: portionError });
};

// PUT /api/ingredients/{id}: stock isn't editable here (adjustments and orders change it).
export const ingredientFormSchema = z.object(ingredientFormShape).superRefine(checkTopping);

// POST /api/ingredients also takes the starting stock, which can't be negative.
export const newIngredientFormSchema = z.object(ingredientFormShape).superRefine((value, ctx) => {
  checkTopping(value, ctx);
  const stock = value.currentStock;
  const stockError = Number.isNaN(stock)
    ? "Enter the starting stock (0 if none yet)."
    : stock < 0
      ? "Stock can't be negative."
      : stock > MAX_STOCK
        ? "That's more than the stock can hold."
        : !hasTwoDecimals(stock) && "Use at most two decimals.";
  if (stockError) ctx.addIssue({ code: "custom", path: ["currentStock"], message: stockError });
});

export type IngredientForm = z.infer<typeof ingredientFormSchema>;

// Both topping fields or neither, as the API expects.
export const toppingFields = (form: IngredientForm) =>
  form.isTopping
    ? { toppingPrice: form.toppingPrice, toppingPortion: form.toppingPortion }
    : { toppingPrice: null, toppingPortion: null };

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
