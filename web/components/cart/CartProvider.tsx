"use client";

import { createContext, use, useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { clampQuantity } from "@/hooks/usePizzaBuilder";
import type { OrderItemRequest } from "@/lib/api/schemas/orders";

export type CartLine = {
  lineId: string;
  item: OrderItemRequest;
  // From the builder's quote when added, so the cart can name lines before its own quote loads.
  name: string;
  details: string[];
};

type CartState = {
  lines: CartLine[];
  count: number;
  addItem: (item: OrderItemRequest, label: { name: string; details: string[] }) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  removeLine: (lineId: string) => void;
  clear: () => void;
  // The Idempotency-Key for this exact checkout: reused for the same order body (retries,
  // double clicks, coming back to the cart) and replaced as soon as the body changes.
  checkoutKeyFor: (body: string) => string;
};

const CartContext = createContext<CartState | null>(null);

// Same pizza = same recipe, size and toppings, whatever order the toppings were picked in.
const sameConfiguration = (a: OrderItemRequest, b: OrderItemRequest) => {
  const toppings = (item: OrderItemRequest) =>
    JSON.stringify([...item.toppings].sort((x, y) => x.ingredientId.localeCompare(y.ingredientId)));
  return a.recipeId === b.recipeId && a.pizzaSizeId === b.pizzaSizeId && toppings(a) === toppings(b);
};

// In memory only (user decision): survives navigation inside the signed-in app, not a reload.
// Signing out leaves app/(app), which unmounts this provider and empties the cart.
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [lines, setLines] = useState<CartLine[]>([]);
  const checkout = useRef<{ key: string; body: string } | null>(null);

  const addItem = useCallback<CartState["addItem"]>((item, label) => {
    setLines((current) => {
      const existing = current.find((line) => sameConfiguration(line.item, item));
      if (existing) {
        return current.map((line) =>
          line === existing
            ? { ...line, item: { ...line.item, quantity: clampQuantity(line.item.quantity + item.quantity) } }
            : line,
        );
      }
      return [...current, { lineId: crypto.randomUUID(), item, ...label }];
    });
  }, []);

  const setQuantity = useCallback<CartState["setQuantity"]>((lineId, quantity) => {
    setLines((current) =>
      current.map((line) =>
        line.lineId === lineId ? { ...line, item: { ...line.item, quantity: clampQuantity(quantity) } } : line,
      ),
    );
  }, []);

  const removeLine = useCallback((lineId: string) => {
    setLines((current) => current.filter((line) => line.lineId !== lineId));
  }, []);

  const clear = useCallback(() => {
    setLines([]);
    checkout.current = null;
  }, []);

  const checkoutKeyFor = useCallback((body: string) => {
    if (checkout.current?.body !== body) checkout.current = { key: crypto.randomUUID(), body };
    return checkout.current.key;
  }, []);

  const value = useMemo<CartState>(
    () => ({
      lines,
      count: lines.reduce((sum, line) => sum + line.item.quantity, 0),
      addItem,
      setQuantity,
      removeLine,
      clear,
      checkoutKeyFor,
    }),
    [lines, addItem, setQuantity, removeLine, clear, checkoutKeyFor],
  );

  return <CartContext value={value}>{children}</CartContext>;
};

export const useCart = () => {
  const cart = use(CartContext);
  if (!cart) throw new Error("useCart must be used inside CartProvider.");
  return cart;
};
