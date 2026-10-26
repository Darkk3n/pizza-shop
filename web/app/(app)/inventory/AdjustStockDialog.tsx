"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { ChoiceGroup } from "@/components/forms/ChoiceGroup";
import { FormAlert } from "@/components/forms/FormAlert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  STOCK_ADJUSTMENT_MODES,
  stockAdjustmentFormSchema,
  stockDelta,
  type Ingredient,
  type StockAdjustmentForm,
} from "@/lib/api/schemas/ingredients";
import { formatQuantity } from "@/lib/helpers/format";
import { applyActionErrors } from "@/lib/helpers/forms";
import { cn } from "@/lib/utils";
import { adjustStock } from "./actions";

const MODE_COPY = {
  Restock: { label: "Restock", field: "Quantity received" },
  Waste: { label: "Waste", field: "Quantity thrown out" },
  Recount: { label: "Recount", field: "Counted stock" },
} as const;

const MODE_CHOICES = STOCK_ADJUSTMENT_MODES.map((mode) => ({ value: mode, label: MODE_COPY[mode].label }));

// Restock / waste / recount for one ingredient, sent as a single delta. A 409 means the change
// would go below zero (orders may have used stock meanwhile): the action refreshed the row, so
// the dialog shows the API's message next to the current stock.
export const AdjustStockDialog = ({ ingredient }: { ingredient: Ingredient }) => {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm<StockAdjustmentForm>({
    resolver: zodResolver(stockAdjustmentFormSchema),
    defaultValues: { mode: "Restock" },
  });

  const unit = ingredient.unitOfMeasureName;
  const [mode, quantity] = useWatch({ control, name: ["mode", "quantity"] });
  const newStock =
    typeof quantity === "number" && Number.isFinite(quantity)
      ? ingredient.currentStock + stockDelta({ mode, quantity }, ingredient.currentStock)
      : null;
  const inputId = `stock-${ingredient.ingredientId}`;

  const onSubmit = handleSubmit((values) => {
    setFormError(null);
    const delta = stockDelta(values, ingredient.currentStock);
    if (delta === 0) {
      setError("quantity", { message: "That matches the current stock already." });
      return;
    }
    startTransition(async () => {
      const result = await adjustStock(ingredient.ingredientId, delta);
      if (result.ok) {
        toast.success(
          `${ingredient.name}: ${formatQuantity(ingredient.currentStock)} → ${formatQuantity(ingredient.currentStock + delta)} ${unit}`,
        );
        setOpen(false);
        reset();
      } else {
        // The form's field is a quantity, not the API's delta, so delta errors go above the form.
        setFormError(applyActionErrors(result, setError, ["quantity"]) ?? "Couldn't update the stock.");
      }
    });
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          setFormError(null);
          reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Adjust<span className="sr-only"> {ingredient.name} stock</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit} noValidate className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Adjust {ingredient.name}</DialogTitle>
            <DialogDescription>
              Current stock: {formatQuantity(ingredient.currentStock)} {unit}
            </DialogDescription>
          </DialogHeader>
          <FormAlert message={formError} />
          <ChoiceGroup
            legend="Adjustment"
            value={mode}
            choices={MODE_CHOICES}
            onChange={(next) => setValue("mode", next, { shouldValidate: errors.quantity !== undefined })}
          />
          <div className="grid gap-2">
            <Label htmlFor={inputId}>
              {MODE_COPY[mode].field} ({unit})
            </Label>
            <Input
              id={inputId}
              type="number"
              inputMode="decimal"
              step="0.01"
              min="0"
              autoComplete="off"
              aria-invalid={errors.quantity ? true : undefined}
              aria-describedby={errors.quantity ? `${inputId}-message` : `${inputId}-preview`}
              {...register("quantity", { valueAsNumber: true })}
            />
            {errors.quantity ? (
              <p id={`${inputId}-message`} className="text-sm text-destructive">
                {errors.quantity.message}
              </p>
            ) : (
              <p
                id={`${inputId}-preview`}
                className={cn("text-sm text-muted-foreground", newStock !== null && newStock < 0 && "text-destructive")}
              >
                {newStock === null ? " " : `New stock: ${formatQuantity(newStock)} ${unit}`}
              </p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
