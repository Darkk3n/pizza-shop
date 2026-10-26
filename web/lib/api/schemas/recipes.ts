import { z } from "zod";
import { hasMaxDecimals } from "@/lib/api/schemas/numbers";

// The admin recipe editor. Recipes are read with recipeSchema (lib/api/schemas/menu.ts).

const recipeItemFormSchema = z.object({
  ingredientId: z.uuid({ error: "Pick an ingredient." }),
  // Per Small, in the ingredient's unit; larger sizes scale it by their priceMultiplier.
  amount: z
    .number({ error: "Enter an amount." })
    .positive("Enter more than zero.")
    .max(999_999.9999, "That amount is too large.")
    .refine(hasMaxDecimals(4), "Use at most four decimals."),
});

// POST /api/recipes takes name, basePrice and items; PUT also takes isActive (a full replacement,
// so the edit form always sends the current value).
export const recipeFormSchema = z.object({
  name: z.string().trim().min(1, "Enter a name.").max(50, "Keep the name under 50 characters."),
  basePrice: z
    .number({ error: "Enter a price." })
    .min(0, "The price can't be negative.")
    .max(99_999_999.99, "That price is too large.")
    .refine(hasMaxDecimals(2), "Use at most two decimals."),
  isActive: z.boolean(),
  items: z
    .array(recipeItemFormSchema)
    .min(1, "Add at least one ingredient.")
    // The API allows each ingredient once; flag the repeat on its own row.
    .superRefine((items, ctx) => {
      const seen = new Set<string>();
      items.forEach((item, index) => {
        if (seen.has(item.ingredientId)) {
          ctx.addIssue({ code: "custom", path: [index, "ingredientId"], message: "Already in this recipe." });
        }
        seen.add(item.ingredientId);
      });
    }),
});

export type RecipeForm = z.infer<typeof recipeFormSchema>;
