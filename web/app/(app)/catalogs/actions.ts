"use server";

import { refresh, updateTag } from "next/cache";
import { z } from "zod";
import { apiFailure, invalidInput, type ActionResult } from "@/lib/helpers/actions";
import { apiFetch } from "@/lib/api/client";
import { PUBLIC_MENU_TAG } from "@/lib/api/public";
import { unitOfMeasureFormSchema, type UnitOfMeasureForm } from "@/lib/api/schemas/ingredients";
import { pizzaSizeFormSchema, type PizzaSizeForm } from "@/lib/api/schemas/menu";
import { requireAdmin } from "@/lib/auth/currentUser";

const idSchema = z.uuid();

// Server Actions are public endpoints: check the caller here too, not only on the page.
// A 409 on create/update is a duplicate name; on delete, a size used in orders or a unit
// used by ingredients.

const send = async (path: string, init: Parameters<typeof apiFetch>[1]): Promise<ActionResult> => {
  try {
    await apiFetch(path, init);
  } catch (error) {
    return apiFailure(error);
  }
  updateTag(PUBLIC_MENU_TAG);
  refresh();
  return { ok: true };
};

export const createPizzaSize = async (input: PizzaSizeForm): Promise<ActionResult> => {
  await requireAdmin();
  const parsed = pizzaSizeFormSchema.safeParse(input);
  if (!parsed.success) return invalidInput(parsed.error);

  // New sizes start on the menu; POST has no isActive.
  const { name, priceMultiplier } = parsed.data;
  return send("/api/pizza-sizes", { method: "POST", body: { name, priceMultiplier } });
};

export const updatePizzaSize = async (pizzaSizeId: string, input: PizzaSizeForm): Promise<ActionResult> => {
  await requireAdmin();
  const id = idSchema.safeParse(pizzaSizeId);
  const parsed = pizzaSizeFormSchema.safeParse(input);
  if (!id.success) return invalidInput(id.error);
  if (!parsed.success) return invalidInput(parsed.error);

  return send(`/api/pizza-sizes/${id.data}`, { method: "PUT", body: parsed.data });
};

export const deletePizzaSize = async (pizzaSizeId: string): Promise<ActionResult> => {
  await requireAdmin();
  const id = idSchema.safeParse(pizzaSizeId);
  if (!id.success) return invalidInput(id.error);

  return send(`/api/pizza-sizes/${id.data}`, { method: "DELETE" });
};

export const createUnitOfMeasure = async (input: UnitOfMeasureForm): Promise<ActionResult> => {
  await requireAdmin();
  const parsed = unitOfMeasureFormSchema.safeParse(input);
  if (!parsed.success) return invalidInput(parsed.error);

  return send("/api/units-of-measure", { method: "POST", body: parsed.data });
};

export const updateUnitOfMeasure = async (unitOfMeasureId: string, input: UnitOfMeasureForm): Promise<ActionResult> => {
  await requireAdmin();
  const id = idSchema.safeParse(unitOfMeasureId);
  const parsed = unitOfMeasureFormSchema.safeParse(input);
  if (!id.success) return invalidInput(id.error);
  if (!parsed.success) return invalidInput(parsed.error);

  return send(`/api/units-of-measure/${id.data}`, { method: "PUT", body: parsed.data });
};

export const deleteUnitOfMeasure = async (unitOfMeasureId: string): Promise<ActionResult> => {
  await requireAdmin();
  const id = idSchema.safeParse(unitOfMeasureId);
  if (!id.success) return invalidInput(id.error);

  return send(`/api/units-of-measure/${id.data}`, { method: "DELETE" });
};
