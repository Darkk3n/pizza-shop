"use client";

import { MinusIcon, PlusIcon, RotateCwIcon } from "lucide-react";
import { ChoiceGroup } from "@/components/forms/ChoiceGroup";
import { FormAlert } from "@/components/forms/FormAlert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MAX_QUANTITY, usePizzaBuilder } from "@/hooks/usePizzaBuilder";
import type { PizzaSize, Recipe, Topping } from "@/lib/api/schemas/menu";
import type { OrderQuote, ToppingAmount, ToppingCoverage } from "@/lib/api/schemas/orders";
import { AMOUNT_LABELS, COVERAGE_LABELS, formatMoney } from "@/lib/helpers/format";
import { cn } from "@/lib/utils";

const COVERAGE_CHOICES = (["Whole", "LeftHalf", "RightHalf"] as const).map((value) => ({
  value,
  label: COVERAGE_LABELS[value],
}));
const AMOUNT_CHOICES = (["Light", "Standard", "Extra"] as const).map((value) => ({
  value,
  label: AMOUNT_LABELS[value],
}));

type PizzaBuilderProps = {
  recipe: Recipe;
  sizes: PizzaSize[];
  toppings: Topping[];
  initialQuote: OrderQuote | null;
};

export const PizzaBuilder = ({ recipe, sizes, toppings, initialQuote }: PizzaBuilderProps) => {
  const builder = usePizzaBuilder({
    recipeId: recipe.recipeId,
    defaultSizeId: sizes[0]?.pizzaSizeId ?? null,
    initialQuote,
  });
  const quotedItem = builder.displayQuote?.items[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-start">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Size</CardTitle>
          </CardHeader>
          <CardContent>
            <ChoiceGroup
              legend="Size"
              hideLegend
              value={builder.sizeId}
              onChange={builder.setSize}
              // Only names here: the price panel shows the server's price for the chosen size.
              choices={sizes.map((size) => ({ value: size.pizzaSizeId, label: size.name }))}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Extra toppings</CardTitle>
            <p className="text-sm text-muted-foreground">
              Prices are for a small, whole pizza; they scale with size, half coverage and amount.
            </p>
          </CardHeader>
          <CardContent>
            {toppings.length === 0 ? (
              <p className="text-sm text-muted-foreground">No extra toppings are available right now.</p>
            ) : (
              <ul className="flex flex-col divide-y">
                {toppings.map((topping) => {
                  const choice = builder.toppings.find((t) => t.ingredientId === topping.ingredientId);
                  const checkboxId = `topping-${topping.ingredientId}`;
                  return (
                    <li key={topping.ingredientId} className="flex flex-col gap-3 py-3 first:pt-0 last:pb-0">
                      <label htmlFor={checkboxId} className="flex cursor-pointer items-center gap-3">
                        <input
                          id={checkboxId}
                          type="checkbox"
                          checked={Boolean(choice)}
                          onChange={() => builder.toggleTopping(topping.ingredientId)}
                          className="size-4 accent-primary"
                        />
                        <span className="flex-1 text-sm font-medium">{topping.name}</span>
                        <span className="font-mono text-sm text-muted-foreground">
                          +{formatMoney(topping.toppingPrice)}
                        </span>
                      </label>
                      {choice && (
                        <div className="flex flex-wrap gap-x-6 gap-y-3 pl-7">
                          <ChoiceGroup<ToppingCoverage>
                            legend={`${topping.name} coverage`}
                            hideLegend
                            size="sm"
                            value={choice.coverage}
                            onChange={(coverage) => builder.setToppingCoverage(topping.ingredientId, coverage)}
                            choices={COVERAGE_CHOICES}
                          />
                          <ChoiceGroup<ToppingAmount>
                            legend={`${topping.name} amount`}
                            hideLegend
                            size="sm"
                            value={choice.extraAmount}
                            onChange={(amount) => builder.setToppingAmount(topping.ingredientId, amount)}
                            choices={AMOUNT_CHOICES}
                          />
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="lg:sticky lg:top-22">
        <CardHeader>
          <CardTitle>{quotedItem?.itemNameSnapshot ?? recipe.name}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {recipe.items.map((item) => item.ingredientName).join(", ")}
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <span id="quantity-label" className="text-sm font-medium">
              Quantity
            </span>
            <div className="flex items-center gap-2" role="group" aria-labelledby="quantity-label">
              <Button
                variant="outline"
                size="icon"
                aria-label="Decrease quantity"
                disabled={builder.quantity <= 1}
                onClick={() => builder.setQuantity(builder.quantity - 1)}
              >
                <MinusIcon />
              </Button>
              <output aria-live="polite" className="w-8 text-center font-mono tabular-nums">
                {builder.quantity}
              </output>
              <Button
                variant="outline"
                size="icon"
                aria-label="Increase quantity"
                disabled={builder.quantity >= MAX_QUANTITY}
                onClick={() => builder.setQuantity(builder.quantity + 1)}
              >
                <PlusIcon />
              </Button>
            </div>
          </div>

          <FormAlert message={builder.quoteError} />
          {builder.quoteError && (
            <Button variant="outline" size="sm" className="w-fit" onClick={builder.retryQuote}>
              <RotateCwIcon />
              Try again
            </Button>
          )}

          {/* Server-computed prices; dimmed while a newer quote loads. */}
          <dl
            aria-busy={builder.isQuoting}
            className={cn("grid gap-2 text-sm transition-opacity", builder.isQuoting && "opacity-50")}
          >
            {quotedItem && (
              <>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Pizza</dt>
                  <dd className="font-mono tabular-nums">
                    {formatMoney(quotedItem.unitPrice - quotedItem.toppings.reduce((sum, t) => sum + t.priceAdjustment, 0))}
                  </dd>
                </div>
                {quotedItem.toppings.map((topping) => (
                  <div key={topping.ingredientId} className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">
                      + {topping.ingredientName}
                      {topping.coverage !== "Whole" && ` (${COVERAGE_LABELS[topping.coverage].toLowerCase()})`}
                      {topping.extraAmount !== "Standard" && `, ${AMOUNT_LABELS[topping.extraAmount].toLowerCase()}`}
                    </dt>
                    <dd className="font-mono tabular-nums">{formatMoney(topping.priceAdjustment)}</dd>
                  </div>
                ))}
                {quotedItem.quantity > 1 && (
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Each × {quotedItem.quantity}</dt>
                    <dd className="font-mono tabular-nums">{formatMoney(quotedItem.unitPrice)}</dd>
                  </div>
                )}
                <div className="flex justify-between gap-4 border-t pt-2 text-base font-semibold">
                  <dt>Total</dt>
                  <dd className="font-mono tabular-nums">{formatMoney(quotedItem.lineTotal)}</dd>
                </div>
                <p className="text-xs text-muted-foreground">Tax is added at checkout.</p>
              </>
            )}
          </dl>
        </CardContent>
        <CardFooter className="flex-col items-stretch gap-2">
          {/* The cart comes in the next step; the button is here so the layout is final. */}
          <Button size="lg" disabled>
            Add to order
          </Button>
          <p className="text-center text-xs text-muted-foreground">Ordering opens soon.</p>
        </CardFooter>
      </Card>
    </div>
  );
};
