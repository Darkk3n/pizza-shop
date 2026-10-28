import { z } from "zod";

// GET /api/public/menu (anonymous): active items only, names and prices, no amounts or stock.
export const publicMenuSchema = z.object({
  recipes: z.array(
    z.object({
      recipeId: z.uuid(),
      name: z.string(),
      // The Small price; sizes scale it by their priceMultiplier.
      basePrice: z.number(),
      ingredients: z.array(z.string()),
    }),
  ),
  // Smallest multiplier first.
  sizes: z.array(z.object({ name: z.string(), priceMultiplier: z.number() })),
  // One Small, Whole, Standard serving.
  toppings: z.array(z.object({ name: z.string(), price: z.number() })),
  // Most ordered in the last 30 days, at most 4; empty for a shop with no recent orders.
  popularRecipeIds: z.array(z.uuid()),
});

export type PublicMenu = z.infer<typeof publicMenuSchema>;
