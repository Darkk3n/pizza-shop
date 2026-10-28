"use server";

import { refresh, updateTag } from "next/cache";
import { z } from "zod";
import { apiFailure, invalidInput, type ActionResult } from "@/lib/helpers/actions";
import { apiFetch } from "@/lib/api/client";
import { PUBLIC_MENU_TAG } from "@/lib/api/public";
import { ApiError } from "@/lib/api/problem";
import {
  ingredientFormSchema,
  newIngredientFormSchema,
  stockAdjustmentSchema,
  toppingFields,
  type IngredientForm,
} from "@/lib/api/schemas/ingredients";
import { requireAdmin, requireStaff } from "@/lib/auth/currentUser";

const ingredientIdSchema = z.uuid();

// Server Actions are public endpoints: check the caller here too, not only on the page.
// 409 = the change would take stock below zero (an order may have used some meanwhile), so
// refresh to show the current stock alongside the error.
export const adjustStock = async (ingredientId: string, delta: number): Promise<ActionResult> => {
  await requireStaff();
  const id = ingredientIdSchema.safeParse(ingredientId);
  const parsed = stockAdjustmentSchema.safeParse({ delta });
  if (!id.success) return invalidInput(id.error);
  if (!parsed.success) return invalidInput(parsed.error);

  try {
    await apiFetch(`/api/ingredients/${id.data}/stock-adjustments`, { method: "POST", body: parsed.data });
  } catch (error) {
    if (error instanceof ApiError && error.status === 409) refresh();
    return apiFailure(error);
  }
  refresh();
  return { ok: true };
};

// Catalog changes are admin-only (staff only adjust stock). A 409 on create/update is a
// duplicate name; on delete, an ingredient used by recipes or orders (retire it instead).

export const createIngredient = async (input: IngredientForm): Promise<ActionResult> => {
  await requireAdmin();
  const parsed = newIngredientFormSchema.safeParse(input);
  if (!parsed.success) return invalidInput(parsed.error);

  const { name, unitOfMeasureId, currentStock } = parsed.data;
  try {
    // New ingredients start active; POST has no isActive.
    await apiFetch("/api/ingredients", {
      method: "POST",
      body: { name, unitOfMeasureId, currentStock, ...toppingFields(parsed.data) },
    });
  } catch (error) {
    return apiFailure(error);
  }
  updateTag(PUBLIC_MENU_TAG);
  refresh();
  return { ok: true };
};

export const updateIngredient = async (ingredientId: string, input: IngredientForm): Promise<ActionResult> => {
  await requireAdmin();
  const id = ingredientIdSchema.safeParse(ingredientId);
  const parsed = ingredientFormSchema.safeParse(input);
  if (!id.success) return invalidInput(id.error);
  if (!parsed.success) return invalidInput(parsed.error);

  const { name, unitOfMeasureId, isActive } = parsed.data;
  try {
    await apiFetch(`/api/ingredients/${id.data}`, {
      method: "PUT",
      body: { name, unitOfMeasureId, isActive, ...toppingFields(parsed.data) },
    });
  } catch (error) {
    return apiFailure(error);
  }
  updateTag(PUBLIC_MENU_TAG);
  refresh();
  return { ok: true };
};

export const deleteIngredient = async (ingredientId: string): Promise<ActionResult> => {
  await requireAdmin();
  const id = ingredientIdSchema.safeParse(ingredientId);
  if (!id.success) return invalidInput(id.error);

  try {
    await apiFetch(`/api/ingredients/${id.data}`, { method: "DELETE" });
  } catch (error) {
    return apiFailure(error);
  }
  updateTag(PUBLIC_MENU_TAG);
  refresh();
  return { ok: true };
};
