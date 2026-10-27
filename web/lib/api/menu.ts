import "server-only";
import { notFound } from "next/navigation";
import { z } from "zod";
import { apiJson } from "@/lib/api/client";
import { ApiError } from "@/lib/api/problem";
import { pizzaSizeSchema, recipeSchema, toppingSchema } from "@/lib/api/schemas/menu";
import { orderQuoteSchema, type OrderItemRequest } from "@/lib/api/schemas/orders";

// Customers only get active recipes; staff and admins also get retired ones, so callers that
// build a customer menu filter on isActive too.
export const listRecipes = async () => apiJson("/api/recipes", z.array(recipeSchema));

// 404 (missing, or retired for a customer) renders the not-found page.
export const getRecipe = async (id: string) => {
  try {
    return await apiJson(`/api/recipes/${encodeURIComponent(id)}`, recipeSchema);
  } catch (error) {
    if (error instanceof ApiError && (error.status === 404 || error.status === 400)) notFound();
    throw error;
  }
};

export const listPizzaSizes = async () => apiJson("/api/pizza-sizes", z.array(pizzaSizeSchema));

export const listToppings = async () => apiJson("/api/toppings", z.array(toppingSchema));

export const quoteItems = async (items: OrderItemRequest[]) =>
  apiJson("/api/orders/quote", orderQuoteSchema, { method: "POST", body: { items } });

// GET /api/recipes/popular: active recipes ordered most in the last 30 days (only ones ordered at all).
export const listPopularRecipes = async (limit = 4) =>
  apiJson(`/api/recipes/popular?limit=${limit}`, z.array(recipeSchema));
