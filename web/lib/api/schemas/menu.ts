import { z } from "zod";

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

// GET /api/pizza-sizes, smallest multiplier first.
export const pizzaSizeSchema = z.object({
  pizzaSizeId: z.uuid(),
  name: z.string(),
  priceMultiplier: z.number(),
});

export type PizzaSize = z.infer<typeof pizzaSizeSchema>;

// GET /api/toppings: active ingredients offered as toppings, by name.
export const toppingSchema = z.object({
  ingredientId: z.uuid(),
  name: z.string(),
  unitOfMeasureName: z.string(),
  // One Small, Whole, Standard serving; the quote applies size, coverage and amount.
  toppingPrice: z.number(),
});

export type Topping = z.infer<typeof toppingSchema>;
