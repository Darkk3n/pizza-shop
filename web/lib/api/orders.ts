import "server-only";
import { notFound } from "next/navigation";
import { z } from "zod";
import { apiJson } from "@/lib/api/client";
import { ApiError } from "@/lib/api/problem";
import { orderSchema, orderSummaryPageSchema, type OrderStatus } from "@/lib/api/schemas/orders";

export const ORDERS_PAGE_SIZE = 10;

// GET /api/orders: newest first. Staff see every order; customers only their own (the API decides).
export const listOrders = async ({ status, page }: { status?: OrderStatus; page: number }) => {
  const query = new URLSearchParams({ page: String(page), pageSize: String(ORDERS_PAGE_SIZE) });
  if (status) query.set("status", status);
  return apiJson(`/api/orders?${query}`, orderSummaryPageSchema);
};

// GET /api/orders/{id}: 404 (missing, or another customer's order) renders the not-found page.
export const getOrder = async (id: string) => {
  try {
    return await apiJson(`/api/orders/${encodeURIComponent(id)}`, orderSchema);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }
};

// GET /api/orders/active (staff): every Pending, Preparing and Ready order with its items, oldest first.
export const listActiveOrders = async () => apiJson("/api/orders/active", z.array(orderSchema));
