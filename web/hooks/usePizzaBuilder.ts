"use client";

import { useMemo, useReducer } from "react";
import type { OrderItemRequest, OrderQuote, ToppingAmount, ToppingCoverage } from "@/lib/api/schemas/orders";
import { useQuote } from "./useQuote";

export type ToppingChoice = { ingredientId: string; coverage: ToppingCoverage; extraAmount: ToppingAmount };

type BuilderState = {
  sizeId: string | null;
  quantity: number;
  // In the order they were added, so the price breakdown reads naturally.
  toppings: ToppingChoice[];
};

type BuilderAction =
  | { type: "setSize"; sizeId: string }
  | { type: "setQuantity"; quantity: number }
  | { type: "toggleTopping"; ingredientId: string }
  | { type: "updateTopping"; ingredientId: string; changes: Partial<Omit<ToppingChoice, "ingredientId">> }
  | { type: "reset"; sizeId: string | null };

// The API's per-line limit (OrderItemRequest.Quantity is [Range(1, 100)]).
export const MAX_QUANTITY = 100;

export const clampQuantity = (quantity: number) => Math.min(MAX_QUANTITY, Math.max(1, Math.round(quantity)));

const reducer = (state: BuilderState, action: BuilderAction): BuilderState => {
  switch (action.type) {
    case "setSize":
      return { ...state, sizeId: action.sizeId };
    case "setQuantity":
      return { ...state, quantity: clampQuantity(action.quantity) };
    case "toggleTopping":
      return state.toppings.some((t) => t.ingredientId === action.ingredientId)
        ? { ...state, toppings: state.toppings.filter((t) => t.ingredientId !== action.ingredientId) }
        : {
            ...state,
            toppings: [...state.toppings, { ingredientId: action.ingredientId, coverage: "Whole", extraAmount: "Standard" }],
          };
    case "updateTopping":
      return {
        ...state,
        toppings: state.toppings.map((t) => (t.ingredientId === action.ingredientId ? { ...t, ...action.changes } : t)),
      };
    case "reset":
      return { sizeId: action.sizeId, quantity: 1, toppings: [] };
  }
};

type UsePizzaBuilderOptions = {
  recipeId: string;
  defaultSizeId: string | null;
  // Server-rendered price for the default pizza, so the first paint already has one.
  initialQuote: OrderQuote | null;
};

// Builder state stays local and instant; prices come from the server through useQuote.
export const usePizzaBuilder = ({ recipeId, defaultSizeId, initialQuote }: UsePizzaBuilderOptions) => {
  const [state, dispatch] = useReducer(reducer, { sizeId: defaultSizeId, quantity: 1, toppings: [] });

  const item = useMemo<OrderItemRequest>(
    () => ({ recipeId, pizzaSizeId: state.sizeId, quantity: state.quantity, toppings: state.toppings }),
    [recipeId, state],
  );
  const items = useMemo(() => [item], [item]);
  const pricing = useQuote(items, {
    items: [{ recipeId, pizzaSizeId: defaultSizeId, quantity: 1, toppings: [] }],
    quote: initialQuote,
  });

  return {
    ...state,
    item,
    ...pricing,
    setSize: (sizeId: string) => dispatch({ type: "setSize", sizeId }),
    setQuantity: (quantity: number) => dispatch({ type: "setQuantity", quantity }),
    toggleTopping: (ingredientId: string) => dispatch({ type: "toggleTopping", ingredientId }),
    setToppingCoverage: (ingredientId: string, coverage: ToppingCoverage) =>
      dispatch({ type: "updateTopping", ingredientId, changes: { coverage } }),
    setToppingAmount: (ingredientId: string, extraAmount: ToppingAmount) =>
      dispatch({ type: "updateTopping", ingredientId, changes: { extraAmount } }),
    // Back to the default pizza, e.g. after adding it to the cart.
    reset: () => dispatch({ type: "reset", sizeId: defaultSizeId }),
  };
};
