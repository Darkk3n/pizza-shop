import "server-only";
import { z } from "zod";
import { apiJson } from "@/lib/api/client";
import { ingredientSchema } from "@/lib/api/schemas/ingredients";

// GET /api/ingredients (staff): every ingredient, retired ones included, by name.
export const listIngredients = async () => apiJson("/api/ingredients", z.array(ingredientSchema));
