import "server-only";
import { notFound } from "next/navigation";
import { z } from "zod";
import { apiJson } from "@/lib/api/client";
import { ApiError } from "@/lib/api/problem";
import {
  orderFeedSchema,
  orderSchema,
  orderSummaryPageSchema,
  type OrderFeedQuery,
  type OrderStatus,
} from "@/lib/api/schemas/orders";

export const ORDERS_PAGE_SIZE = 10;

// GET /api/orders: newest first. Staff see every order; customers only their own (the API decides).
export const listOrders = async ({ status, page }: { status?: OrderStatus; page: number }) => {
  const query = new URLSearchParams({ page: String(page), pageSize: String(ORDERS_PAGE_SIZE) });
  if (status) query.set("status", status);
  return apiJson(`/api/orders?${query}`, orderSummaryPageSchema);
};

// GET /api/orders/{id}: null when missing, or another customer's order (both 404).
export const findOrder = async (id: string) => {
  try {
    return await apiJson(`/api/orders/${encodeURIComponent(id)}`, orderSchema);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
};

// For pages: a missing order renders the not-found page.
export const getOrder = async (id: string) => (await findOrder(id)) ?? notFound();

// GET /api/orders/active: Pending, Preparing and Ready orders with items, oldest first. Staff get the
// whole kitchen queue, customers their own orders in progress.
export const listActiveOrders = async () => apiJson("/api/orders/active", z.array(orderSchema));

// GET /api/orders/feed (staff): new customer orders and cancellations since the cursors, plus the
// active queue's version.
export const getOrderFeed = async ({ after, cancelledAfter }: OrderFeedQuery) => {
  const query = new URLSearchParams();
  if (after !== undefined) query.set("after", String(after));
  if (cancelledAfter) query.set("cancelledAfter", cancelledAfter);
  return apiJson(`/api/orders/feed?${query}`, orderFeedSchema);
};
