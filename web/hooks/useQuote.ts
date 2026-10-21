"use client";

import { useEffect, useRef, useState } from "react";
import { describeApiError, readApiError } from "@/lib/api/problem";
import { orderQuoteSchema, type OrderItemRequest, type OrderQuote } from "@/lib/api/schemas/orders";

// Wait for the user to pause before asking for a price; each change cancels the previous request.
const QUOTE_DELAY_MS = 250;

export const quoteKey = (items: OrderItemRequest[]) => JSON.stringify(items);

// Live server-side price for a set of order items, via the BFF route (app/api/orders/quote).
// Prices are never computed in the browser. Quotes are remembered per configuration, so going
// back to an earlier choice shows its price without a request, and the last good price stays
// available (displayQuote) while a newer one loads.
export const useQuote = (items: OrderItemRequest[], initial?: { items: OrderItemRequest[]; quote: OrderQuote | null }) => {
  const key = quoteKey(items);

  const [quotes, setQuotes] = useState<Map<string, OrderQuote>>(() =>
    initial?.quote ? new Map([[quoteKey(initial.items), initial.quote]]) : new Map(),
  );
  const quotesRef = useRef(quotes);
  const [lastQuote, setLastQuote] = useState<OrderQuote | null>(initial?.quote ?? null);
  const [failure, setFailure] = useState<{ key: string; message: string } | null>(null);
  const [retries, setRetries] = useState(0);
  const isEmpty = items.length === 0;

  useEffect(() => {
    if (isEmpty || quotesRef.current.has(key)) return;

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const response = await fetch("/api/orders/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: JSON.parse(key) }),
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
  }, [key, isEmpty, retries]);

  const quote = isEmpty ? null : (quotes.get(key) ?? null);
  const error = !quote && failure?.key === key ? failure.message : null;

  return {
    // The price for exactly these items, or null while it loads (or failed, or there are no items).
    quote,
    // What to show meanwhile: the latest price we have, marked as updating.
    displayQuote: isEmpty ? null : (quote ?? lastQuote),
    isQuoting: !isEmpty && !quote && !error,
    quoteError: error,
    retryQuote: () => {
      setFailure(null);
      setRetries((n) => n + 1);
    },
  };
};
