"use server";

import { refresh, updateTag } from "next/cache";
import { z } from "zod";
import { apiFailure, invalidInput, type ActionResult } from "@/lib/helpers/actions";
import { apiFetch, apiJson } from "@/lib/api/client";
import { PUBLIC_MENU_TAG } from "@/lib/api/public";
import { recipeSchema } from "@/lib/api/schemas/menu";
import { recipeFormSchema, type RecipeForm } from "@/lib/api/schemas/recipes";
import { requireAdmin } from "@/lib/auth/currentUser";

const recipeIdSchema = z.uuid();

// Server Actions are public endpoints: check the caller here too, not only on the page.
// A 409 on create/update is a duplicate name; on delete, a recipe that appears in orders.

export const createRecipe = async (input: RecipeForm): Promise<ActionResult<{ recipeId: string }>> => {
  await requireAdmin();
  const parsed = recipeFormSchema.safeParse(input);
  if (!parsed.success) return invalidInput(parsed.error);

  const { name, basePrice, items } = parsed.data;
  try {
    // New recipes start on the menu; POST has no isActive.
    const recipe = await apiJson("/api/recipes", recipeSchema, { method: "POST", body: { name, basePrice, items } });
    updateTag(PUBLIC_MENU_TAG);
    refresh();
    return { ok: true, recipeId: recipe.recipeId };
  } catch (error) {
    return apiFailure(error);
  }
};

export const updateRecipe = async (recipeId: string, input: RecipeForm): Promise<ActionResult> => {
  await requireAdmin();
  const id = recipeIdSchema.safeParse(recipeId);
  const parsed = recipeFormSchema.safeParse(input);
  if (!id.success) return invalidInput(id.error);
  if (!parsed.success) return invalidInput(parsed.error);

  try {
    await apiFetch(`/api/recipes/${id.data}`, { method: "PUT", body: parsed.data });
  } catch (error) {
    return apiFailure(error);
  }
  updateTag(PUBLIC_MENU_TAG);
  refresh();
  return { ok: true };
};

export const deleteRecipe = async (recipeId: string): Promise<ActionResult> => {
  await requireAdmin();
  const id = recipeIdSchema.safeParse(recipeId);
  if (!id.success) return invalidInput(id.error);

  try {
    await apiFetch(`/api/recipes/${id.data}`, { method: "DELETE" });
  } catch (error) {
    return apiFailure(error);
  }
  updateTag(PUBLIC_MENU_TAG);
  refresh();
  return { ok: true };
};
