"use server";

import { z } from "zod";
import { apiFailure, invalidInput, type ActionResult } from "@/lib/helpers/actions";
import { apiJson } from "@/lib/api/client";
import { createOrderSchema, orderSchema, type CreateOrderInput } from "@/lib/api/schemas/orders";
import { requireUser } from "@/lib/auth/currentUser";

const idempotencyKeySchema = z.uuid();

// POST /api/orders. The key comes from the cart (one per checkout body), so a retry after a lost
// response gets the original order back instead of placing a second one.
export const placeOrder = async (
  input: CreateOrderInput,
  idempotencyKey: string,
): Promise<ActionResult<{ orderId: string; orderNumber: number }>> => {
  await requireUser();
  const parsed = createOrderSchema.safeParse(input);
  const key = idempotencyKeySchema.safeParse(idempotencyKey);
  if (!parsed.success) return invalidInput(parsed.error);
  if (!key.success) return invalidInput(key.error);

  try {
    const order = await apiJson("/api/orders", orderSchema, {
      method: "POST",
      body: parsed.data,
      headers: { "Idempotency-Key": key.data },
    });
    return { ok: true, orderId: order.orderId, orderNumber: order.orderNumber };
  } catch (error) {
    return apiFailure(error);
  }
};
