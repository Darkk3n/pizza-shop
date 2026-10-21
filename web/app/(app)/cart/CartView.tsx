"use client";

import { MinusIcon, PlusIcon, RotateCwIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { useCart } from "@/components/cart/CartProvider";
import { ChoiceGroup } from "@/components/forms/ChoiceGroup";
import { FormAlert } from "@/components/forms/FormAlert";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MAX_QUANTITY } from "@/hooks/usePizzaBuilder";
import { useQuote } from "@/hooks/useQuote";
import type { OrderType } from "@/lib/api/schemas/orders";
import { describeTopping, formatMoney, ORDER_TYPE_LABELS } from "@/lib/helpers/format";
import { cn } from "@/lib/utils";
import { placeOrder } from "./actions";

// Delivery stays hidden until orders have an address (product decision).
const ORDER_TYPE_CHOICES = (["Takeout", "DineIn"] as const).map((value) => ({ value, label: ORDER_TYPE_LABELS[value] }));

export const CartView = () => {
  const cart = useCart();
  const router = useRouter();
  const [orderType, setOrderType] = useState<OrderType>("Takeout");
  const [pending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  // API validation errors by line index ("items.0.recipeId" → line 0), e.g. a pizza retired meanwhile.
  const [lineErrors, setLineErrors] = useState<Record<number, string>>({});

  const items = useMemo(() => cart.lines.map((line) => line.item), [cart.lines]);
  const pricing = useQuote(items);
  const quote = pricing.displayQuote;

  if (cart.lines.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed px-4 py-16 text-center">
        <p className="text-muted-foreground">Your cart is empty.</p>
        <Link href="/menu" className={buttonVariants()}>
          Browse the menu
        </Link>
      </div>
    );
  }

  const checkout = () => {
    setFormError(null);
    setLineErrors({});
    const body = { orderType, items };
    // Same body → same key, so a retry (or a second click) can't place the order twice.
    const key = cart.checkoutKeyFor(JSON.stringify(body));

    startTransition(async () => {
      const result = await placeOrder(body, key);
      if (result.ok) {
        cart.clear();
        toast.success(`Order #${result.orderNumber} placed`);
        router.push(`/my-orders/${result.orderId}`);
        return;
      }

      const byLine: Record<number, string> = {};
      const other: string[] = [];
      for (const [path, message] of Object.entries(result.fieldErrors ?? {})) {
        const match = /^items\.(\d+)\./.exec(path);
        if (match) byLine[Number(match[1])] ??= message;
        else other.push(message);
      }
      setLineErrors(byLine);
      setFormError(
        [result.message, ...other].filter(Boolean).join(" ") ||
          (Object.keys(byLine).length > 0 ? "Some items can't be ordered. Remove them and try again." : null),
      );
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-start">
      <Card>
        <CardHeader>
          <CardTitle>Items</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col divide-y">
            {cart.lines.map((line, index) => {
              // A stale quote may be for a different list (a line was just removed): only use its
              // entry while it's for the same pizza.
              const stale = quote?.items[index];
              const priced =
                pricing.quote?.items[index] ??
                (stale?.recipeId === line.item.recipeId && stale.pizzaSizeId === line.item.pizzaSizeId ? stale : undefined);
              const details = priced ? priced.toppings.map((t) => `+ ${describeTopping(t)}`) : line.details;
              return (
                <li key={line.lineId} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-medium">{priced?.itemNameSnapshot ?? line.name}</p>
                      {details.length > 0 && (
                        <ul className="mt-1 text-sm text-muted-foreground">
                          {details.map((detail) => (
                            <li key={detail}>{detail}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <span
                      className={cn(
                        "font-mono tabular-nums transition-opacity",
                        pricing.isQuoting && "opacity-50",
                      )}
                    >
                      {priced ? formatMoney(priced.lineTotal) : "—"}
                    </span>
                  </div>
                  {lineErrors[index] && <p className="text-sm text-destructive">{lineErrors[index]}</p>}
                  <div className="flex items-center justify-between gap-4">
                    <div
                      className="flex items-center gap-2"
                      role="group"
                      aria-label={`Quantity of ${priced?.itemNameSnapshot ?? line.name}`}
                    >
                      <Button
                        variant="outline"
                        size="icon-sm"
                        aria-label="Decrease quantity"
                        disabled={line.item.quantity <= 1 || pending}
                        onClick={() => cart.setQuantity(line.lineId, line.item.quantity - 1)}
                      >
                        <MinusIcon />
                      </Button>
                      <output aria-live="polite" className="w-8 text-center font-mono text-sm tabular-nums">
                        {line.item.quantity}
                      </output>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        aria-label="Increase quantity"
                        disabled={line.item.quantity >= MAX_QUANTITY || pending}
                        onClick={() => cart.setQuantity(line.lineId, line.item.quantity + 1)}
                      >
                        <PlusIcon />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={pending}
                      onClick={() => {
                        cart.removeLine(line.lineId);
                        setLineErrors({});
                      }}
                    >
                      <Trash2Icon />
                      Remove
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </CardContent>
        <CardFooter>
          <Link href="/menu" className={buttonVariants({ variant: "outline", size: "sm" })}>
            <PlusIcon />
            Add another pizza
          </Link>
        </CardFooter>
      </Card>

      <Card className="lg:sticky lg:top-22">
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <ChoiceGroup legend="Order type" value={orderType} onChange={setOrderType} choices={ORDER_TYPE_CHOICES} />

          <FormAlert message={pricing.quoteError} />
          {pricing.quoteError && (
            <Button variant="outline" size="sm" className="w-fit" onClick={pricing.retryQuote}>
              <RotateCwIcon />
              Try again
            </Button>
          )}

          {/* Server-computed prices; the placed order's own prices are what's charged. */}
          <dl
            aria-busy={pricing.isQuoting}
            className={cn("grid gap-2 text-sm transition-opacity", pricing.isQuoting && "opacity-50")}
          >
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-mono tabular-nums">{quote ? formatMoney(quote.subTotal) : "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Tax</dt>
              <dd className="font-mono tabular-nums">{quote ? formatMoney(quote.tax) : "—"}</dd>
            </div>
            <div className="flex justify-between gap-4 border-t pt-2 text-base font-semibold">
              <dt>Total</dt>
              <dd className="font-mono tabular-nums">{quote ? formatMoney(quote.total) : "—"}</dd>
            </div>
          </dl>

          <FormAlert message={formError} />
        </CardContent>
        <CardFooter>
          <Button size="lg" className="w-full" disabled={!pricing.quote || pending} onClick={checkout}>
            {pending ? "Placing order…" : pricing.quote ? `Place order · ${formatMoney(pricing.quote.total)}` : "Updating price…"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
