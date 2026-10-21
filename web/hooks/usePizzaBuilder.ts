"use client";

import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { describeApiError, readApiError } from "@/lib/api/problem";
import {
  orderQuoteSchema,
  type OrderItemRequest,
  type OrderQuote,
  type ToppingAmount,
  type ToppingCoverage,
} from "@/lib/api/schemas/orders";

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
  | { type: "updateTopping"; ingredientId: string; changes: Partial<Omit<ToppingChoice, "ingredientId">> };

export const MAX_QUANTITY = 100;

const reducer = (state: BuilderState, action: BuilderAction): BuilderState => {
  switch (action.type) {
    case "setSize":
      return { ...state, sizeId: action.sizeId };
    case "setQuantity":
      return { ...state, quantity: Math.min(MAX_QUANTITY, Math.max(1, Math.round(action.quantity))) };
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
  }
};

// Wait for the user to pause before asking for a price; each change cancels the previous request.
const QUOTE_DELAY_MS = 250;

const quoteKey = (item: OrderItemRequest) => JSON.stringify(item);

type UsePizzaBuilderOptions = {
  recipeId: string;
  defaultSizeId: string | null;
  // Server-rendered price for the default pizza, so the first paint already has one.
  initialQuote: OrderQuote | null;
};

// Builder state stays local and instant; prices come from POST /api/orders/quote (server-side
// math, never computed here). The last good price stays visible while a new one loads.
export const usePizzaBuilder = ({ recipeId, defaultSizeId, initialQuote }: UsePizzaBuilderOptions) => {
  const [state, dispatch] = useReducer(reducer, { sizeId: defaultSizeId, quantity: 1, toppings: [] });

  const item = useMemo<OrderItemRequest>(
    () => ({ recipeId, pizzaSizeId: state.sizeId, quantity: state.quantity, toppings: state.toppings }),
    [recipeId, state],
  );
  const key = quoteKey(item);

  // Quotes by configuration: going back to an earlier choice shows its price without a request.
  const [quotes, setQuotes] = useState<Map<string, OrderQuote>>(() => {
    const initial = new Map<string, OrderQuote>();
    if (initialQuote) {
      initial.set(quoteKey({ recipeId, pizzaSizeId: defaultSizeId, quantity: 1, toppings: [] }), initialQuote);
    }
    return initial;
  });
  const quotesRef = useRef(quotes);
  const [lastQuote, setLastQuote] = useState<OrderQuote | null>(initialQuote);
  const [failure, setFailure] = useState<{ key: string; message: string } | null>(null);
  const [retries, setRetries] = useState(0);

  useEffect(() => {
    if (quotesRef.current.has(key)) return;

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const response = await fetch("/api/orders/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: [JSON.parse(key)] }),
          signal: controller.signal,
        });
        if (!response.ok) {
          setFailure({ key, message: describeApiError(await readApiError(response)) });
          return;
        }
        const quote = orderQuoteSchema.parse(await response.json());
        quotesRef.current = new Map(quotesRef.current).set(key, quote);
        setQuotes(quotesRef.current);
        setLastQuote(quote);
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error(error);
        setFailure({ key, message: "Couldn't update the price. Check your connection and try again." });
      }
    }, QUOTE_DELAY_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [key, retries]);

  const quote = quotes.get(key) ?? null;
  const error = !quote && failure?.key === key ? failure.message : null;

  return {
    ...state,
    item,
    // The price for exactly this configuration, or null while it loads (or failed).
    quote,
    // What to show meanwhile: the latest price we have, marked as updating.
    displayQuote: quote ?? lastQuote,
    isQuoting: !quote && !error,
    quoteError: error,
    retryQuote: () => {
      setFailure(null);
      setRetries((n) => n + 1);
    },
    setSize: (sizeId: string) => dispatch({ type: "setSize", sizeId }),
    setQuantity: (quantity: number) => dispatch({ type: "setQuantity", quantity }),
    toggleTopping: (ingredientId: string) => dispatch({ type: "toggleTopping", ingredientId }),
    setToppingCoverage: (ingredientId: string, coverage: ToppingCoverage) =>
      dispatch({ type: "updateTopping", ingredientId, changes: { coverage } }),
    setToppingAmount: (ingredientId: string, extraAmount: ToppingAmount) =>
      dispatch({ type: "updateTopping", ingredientId, changes: { extraAmount } }),
  };
};
