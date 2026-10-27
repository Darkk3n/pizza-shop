import { z } from "zod";
import { hasMaxDecimals } from "@/lib/api/schemas/numbers";

// GET /api/recipes (customers only get active recipes; staff/admin also see retired ones).
export const recipeSchema = z.object({
  recipeId: z.uuid(),
  name: z.string(),
  // The Small price; sizes scale it by their priceMultiplier.
  basePrice: z.number(),
  isActive: z.boolean(),
  items: z.array(
    z.object({
      recipeItemId: z.uuid(),
      ingredientId: z.uuid(),
      ingredientName: z.string(),
      unitOfMeasureName: z.string(),
      amount: z.number(),
    }),
  ),
});

export type Recipe = z.infer<typeof recipeSchema>;

// GET /api/pizza-sizes, smallest multiplier first (customers only get active sizes; staff/admin
// also see retired ones).
export const pizzaSizeSchema = z.object({
  pizzaSizeId: z.uuid(),
  name: z.string(),
  priceMultiplier: z.number(),
  isActive: z.boolean(),
});

export type PizzaSize = z.infer<typeof pizzaSizeSchema>;

// POST/PUT /api/pizza-sizes (admin). PriceMultiplier is Decimal(3,2), so 9.99 is the most it holds.
// POST ignores isActive: new sizes start on the menu.
export const pizzaSizeFormSchema = z.object({
  name: z.string().trim().min(1, "Enter a name.").max(20, "Keep the name under 20 characters."),
  priceMultiplier: z
    .number({ error: "Enter a multiplier." })
    .min(0.01, "Enter more than zero.")
    .max(9.99, "The multiplier can be at most 9.99.")
    .refine(hasMaxDecimals(2), "Use at most two decimals."),
  isActive: z.boolean(),
});

export type PizzaSizeForm = z.infer<typeof pizzaSizeFormSchema>;

// GET /api/toppings: active ingredients offered as toppings, by name.
export const toppingSchema = z.object({
  ingredientId: z.uuid(),
  name: z.string(),
  unitOfMeasureName: z.string(),
  // One Small, Whole, Standard serving; the quote applies size, coverage and amount.
  toppingPrice: z.number(),
});

export type Topping = z.infer<typeof toppingSchema>;
