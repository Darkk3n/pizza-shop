import "server-only";
import { z } from "zod";
import { apiJson } from "@/lib/api/client";
import { ingredientSchema, unitOfMeasureSchema } from "@/lib/api/schemas/ingredients";

// GET /api/ingredients (staff): every ingredient, retired ones included, by name.
export const listIngredients = async () => apiJson("/api/ingredients", z.array(ingredientSchema));

// GET /api/units-of-measure: the units an ingredient can be measured in.
export const listUnitsOfMeasure = async () => apiJson("/api/units-of-measure", z.array(unitOfMeasureSchema));
