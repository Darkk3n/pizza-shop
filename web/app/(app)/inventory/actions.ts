"use server";

import { refresh } from "next/cache";
import { z } from "zod";
import { apiFailure, invalidInput, type ActionResult } from "@/lib/helpers/actions";
import { apiFetch } from "@/lib/api/client";
import { ApiError } from "@/lib/api/problem";
import { stockAdjustmentSchema } from "@/lib/api/schemas/ingredients";
import { requireStaff } from "@/lib/auth/currentUser";

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
