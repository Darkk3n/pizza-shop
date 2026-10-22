"use server";

import { refresh } from "next/cache";
import { z } from "zod";
import { apiFailure, invalidInput, type ActionResult } from "@/lib/helpers/actions";
import { apiFetch } from "@/lib/api/client";
import { ApiError } from "@/lib/api/problem";
import { cancelOrderSchema, orderStatusSchema, type CancelOrderInput, type OrderStatus } from "@/lib/api/schemas/orders";
import { requireStaff, requireUser } from "@/lib/auth/currentUser";

const orderIdSchema = z.uuid();

// 409 = someone else changed the order first: refresh so the page shows its current state.
const orderFailure = (error: unknown) => {
  if (error instanceof ApiError && error.status === 409) refresh();
  return apiFailure(error);
};

// Server Actions are public endpoints: check the caller here too, not only on the page.

export const advanceStatus = async (orderId: string, status: OrderStatus): Promise<ActionResult> => {
  await requireStaff();
  const id = orderIdSchema.safeParse(orderId);
  const next = orderStatusSchema.safeParse(status);
  if (!id.success) return invalidInput(id.error);
  if (!next.success) return invalidInput(next.error);

  try {
    await apiFetch(`/api/orders/${id.data}/status`, { method: "PATCH", body: { status: next.data } });
  } catch (error) {
    return orderFailure(error);
  }
  refresh();
  return { ok: true };
};

// Staff and customers both cancel through here. The API decides who may: customers only their own
// orders while Pending (409 "ask the staff" otherwise), staff anything not yet Completed.
export const cancelOrder = async (orderId: string, input: CancelOrderInput): Promise<ActionResult> => {
  await requireUser();
  const id = orderIdSchema.safeParse(orderId);
  const parsed = cancelOrderSchema.safeParse(input);
  if (!id.success) return invalidInput(id.error);
  if (!parsed.success) return invalidInput(parsed.error);

  try {
    await apiFetch(`/api/orders/${id.data}/cancel`, {
      method: "POST",
      body: { reason: parsed.data.reason || null },
    });
  } catch (error) {
    return orderFailure(error);
  }
  refresh();
  return { ok: true };
};
