"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { pizzaSizeFormSchema, type PizzaSize, type PizzaSizeForm } from "@/lib/api/schemas/menu";
import { formatMoney } from "@/lib/helpers/format";
import { applyActionErrors } from "@/lib/helpers/forms";
import { createPizzaSize, updatePizzaSize } from "./actions";
import { FieldMessage } from "./FieldMessage";

type PizzaSizeFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // Absent = a new size.
  size?: PizzaSize;
};

const STATUS_CHOICES = [
  { value: "active", label: "On the menu" },
  { value: "retired", label: "Retired" },
] as const;

const FIELDS = ["name", "priceMultiplier"] as const;

// The example price on the page and in this form.
export const EXAMPLE_SMALL_PRICE = 10;

const defaultsFor = (size?: PizzaSize): PizzaSizeForm =>
  size
    ? { name: size.name, priceMultiplier: size.priceMultiplier, isActive: size.isActive }
    : { name: "", priceMultiplier: Number.NaN, isActive: true };

export const PizzaSizeFormDialog = ({ open, onOpenChange, size }: PizzaSizeFormDialogProps) => {
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
  } = useForm<PizzaSizeForm>({
    resolver: zodResolver(pizzaSizeFormSchema),
    defaultValues: defaultsFor(size),
  });
  const [isActive, priceMultiplier] = useWatch({ control, name: ["isActive", "priceMultiplier"] });

  const prefix = size ? `edit-size-${size.pizzaSizeId}` : "new-size";
  const multiplierChanged = size !== undefined && priceMultiplier !== size.priceMultiplier;

  // Start from the latest data each time it opens (a save refreshes the row's size).
  useEffect(() => {
    if (open) reset(defaultsFor(size));
  }, [open, size, reset]);

  const close = () => {
    onOpenChange(false);
    setFormError(null);
  };

  const onSubmit = handleSubmit((values) => {
    setFormError(null);
    startTransition(async () => {
      const result = size ? await updatePizzaSize(size.pizzaSizeId, values) : await createPizzaSize(values);
      if (result.ok) {
        toast.success(size ? `${values.name.trim()} saved.` : `${values.name.trim()} added.`);
        close();
      } else if (result.status === 409) {
        setError("name", { message: result.message ?? "Another size already has this name." });
      } else {
        setFormError(applyActionErrors(result, setError, FIELDS) ?? "Couldn't save the size.");
      }
    });
  });

  return (
    <Dialog open={open} onOpenChange={(next) => (next ? onOpenChange(true) : close())}>
      <DialogContent>
        <form onSubmit={onSubmit} noValidate className="grid gap-4">
          <DialogHeader>
            <DialogTitle>{size ? `Edit ${size.name}` : "New size"}</DialogTitle>
            <DialogDescription>
              Recipe prices and amounts are set for a Small; each size multiplies them.
            </DialogDescription>
          </DialogHeader>
          <FormAlert message={formError} />

          <div className="grid items-start gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor={`${prefix}-name`}>Name</Label>
              <Input
                id={`${prefix}-name`}
                autoComplete="off"
                maxLength={20}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? `${prefix}-name-message` : undefined}
                {...register("name")}
              />
              <FieldMessage id={`${prefix}-name-message`} message={errors.name?.message} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor={`${prefix}-priceMultiplier`}>Multiplier</Label>
              <Input
                id={`${prefix}-priceMultiplier`}
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0.01"
                max="9.99"
                aria-invalid={errors.priceMultiplier ? true : undefined}
                aria-describedby={`${prefix}-priceMultiplier-${errors.priceMultiplier ? "message" : "hint"}`}
                {...register("priceMultiplier", { valueAsNumber: true })}
              />
              {errors.priceMultiplier ? (
                <FieldMessage id={`${prefix}-priceMultiplier-message`} message={errors.priceMultiplier.message} />
              ) : (
                <p id={`${prefix}-priceMultiplier-hint`} className="text-sm text-muted-foreground">
                  {Number.isFinite(priceMultiplier) && priceMultiplier > 0
                    ? `A ${formatMoney(EXAMPLE_SMALL_PRICE)} Small costs ${formatMoney(EXAMPLE_SMALL_PRICE * priceMultiplier)}.`
                    : "Small is 1.00."}
                </p>
              )}
            </div>
          </div>
          <p className="-mt-2 text-sm text-muted-foreground">
            The multiplier scales both the price and the ingredients each pizza uses from stock.
            {multiplierChanged && " Only new orders change; past orders keep what they were charged and used."}
          </p>

          {size && (
            <ChoiceGroup
              legend="Status"
              size="sm"
              value={isActive ? "active" : "retired"}
              choices={STATUS_CHOICES}
              onChange={(next) => setValue("isActive", next === "active")}
            />
          )}
          {size && !isActive && (
            <p className="-mt-2 text-sm text-muted-foreground">
              Retired sizes are hidden from customers and can&apos;t be ordered. Past orders keep them.
            </p>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving…" : size ? "Save changes" : "Add size"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
