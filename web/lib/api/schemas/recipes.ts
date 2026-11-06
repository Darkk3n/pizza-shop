import { z } from "zod";
import { hasMaxDecimals } from "@/lib/api/schemas/numbers";

// The admin recipe editor. Recipes are read with recipeSchema (lib/api/schemas/menu.ts).

const recipeItemFormSchema = z.object({
  ingredientId: z.uuid({ error: "El ingrediente es obligatorio." }),
  // Per Small, in the ingredient's unit; larger sizes scale it by their priceMultiplier.
  amount: z
    .number({ error: "La cantidad es obligatoria." })
    .positive("Debe ser mayor que cero.")
    .max(999_999.9999, "La cantidad es demasiado grande.")
    .refine(hasMaxDecimals(4), "Máximo cuatro decimales."),
});

// POST /api/recipes takes name, basePrice and items; PUT also takes isActive (a full replacement,
// so the edit form always sends the current value).
export const recipeFormSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio.").max(50, "Máximo 50 caracteres."),
  basePrice: z
    .number({ error: "El precio es obligatorio." })
    .min(0, "El precio no puede ser negativo.")
    .max(99_999_999.99, "El precio es demasiado alto.")
    .refine(hasMaxDecimals(2), "Máximo dos decimales."),
  isActive: z.boolean(),
  items: z
    .array(recipeItemFormSchema)
    .min(1, "Se necesita al menos un ingrediente.")
    // The API allows each ingredient once; flag the repeat on its own row.
    .superRefine((items, ctx) => {
      const seen = new Set<string>();
      items.forEach((item, index) => {
        if (seen.has(item.ingredientId)) {
          ctx.addIssue({ code: "custom", path: [index, "ingredientId"], message: "Ya está en esta receta." });
        }
        seen.add(item.ingredientId);
      });
    }),
});

export type RecipeForm = z.infer<typeof recipeFormSchema>;
