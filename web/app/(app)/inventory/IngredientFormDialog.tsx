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
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import {
  ingredientFormSchema,
  newIngredientFormSchema,
  type Ingredient,
  type IngredientForm,
  type UnitOfMeasure,
} from "@/lib/api/schemas/ingredients";
import { applyActionErrors } from "@/lib/helpers/forms";
import { createIngredient, updateIngredient } from "./actions";

type IngredientFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // Absent = a new ingredient.
  ingredient?: Ingredient;
  units: UnitOfMeasure[];
};

const STATUS_CHOICES = [
  { value: "active", label: "Active" },
  { value: "retired", label: "Retired" },
] as const;

const TOPPING_CHOICES = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
] as const;

const FIELDS = ["name", "unitOfMeasureId", "currentStock", "toppingPrice", "toppingPortion"] as const;

// Empty number inputs are NaN, which the schema only accepts where the field doesn't apply.
const defaultsFor = (ingredient?: Ingredient): IngredientForm =>
  ingredient
    ? {
        name: ingredient.name,
        unitOfMeasureId: ingredient.unitOfMeasureId,
        isActive: ingredient.isActive,
        isTopping: ingredient.toppingPrice !== null,
        toppingPrice: ingredient.toppingPrice ?? Number.NaN,
        toppingPortion: ingredient.toppingPortion ?? Number.NaN,
        currentStock: Number.NaN,
      }
    : {
        name: "",
        unitOfMeasureId: "",
        isActive: true,
        isTopping: false,
        toppingPrice: Number.NaN,
        toppingPortion: Number.NaN,
        currentStock: 0,
      };

const FieldMessage = ({ id, message }: { id: string; message?: string }) =>
  message ? (
    <p id={id} className="text-sm text-destructive">
      {message}
    </p>
  ) : null;

// Admin-only: create or edit an ingredient's catalog details. Stock isn't edited here except as
// the starting stock of a new ingredient; after that it changes through adjustments and orders.
export const IngredientFormDialog = ({ open, onOpenChange, ingredient, units }: IngredientFormDialogProps) => {
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
  } = useForm<IngredientForm>({
    resolver: zodResolver(ingredient ? ingredientFormSchema : newIngredientFormSchema),
    defaultValues: defaultsFor(ingredient),
  });
  const [isActive, isTopping, unitOfMeasureId] = useWatch({
    control,
    name: ["isActive", "isTopping", "unitOfMeasureId"],
  });

  const prefix = ingredient ? `edit-${ingredient.ingredientId}` : "new-ingredient";
  const unitName = units.find((unit) => unit.unitOfMeasureId === unitOfMeasureId)?.name;
  const unitChanged = ingredient !== undefined && unitOfMeasureId !== ingredient.unitOfMeasureId;

  // Start from the latest data each time it opens (a save refreshes the row's ingredient).
  useEffect(() => {
    if (open) reset(defaultsFor(ingredient));
  }, [open, ingredient, reset]);

  const close = () => {
    onOpenChange(false);
    setFormError(null);
  };

  const onSubmit = handleSubmit((values) => {
    setFormError(null);
    startTransition(async () => {
      const result = ingredient ? await updateIngredient(ingredient.ingredientId, values) : await createIngredient(values);
      if (result.ok) {
        toast.success(ingredient ? `${values.name.trim()} saved.` : `${values.name.trim()} added.`);
        close();
      } else if (result.status === 409) {
        setError("name", { message: result.message ?? "Another ingredient already has this name." });
      } else {
        setFormError(applyActionErrors(result, setError, FIELDS) ?? "Couldn't save the ingredient.");
      }
    });
  });

  const numberInput = (field: (typeof FIELDS)[number], step: string) => ({
    id: `${prefix}-${field}`,
    type: "number",
    inputMode: "decimal" as const,
    step,
    min: "0",
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${prefix}-${field}-message` : undefined,
    ...register(field, { valueAsNumber: true }),
  });

  return (
    <Dialog open={open} onOpenChange={(next) => (next ? onOpenChange(true) : close())}>
      <DialogContent>
        <form onSubmit={onSubmit} noValidate className="grid gap-4">
          <DialogHeader>
            <DialogTitle>{ingredient ? `Edit ${ingredient.name}` : "New ingredient"}</DialogTitle>
            <DialogDescription>
              {ingredient
                ? "Stock changes go through Adjust; this edits the catalog details."
                : "Recipes use it by amount; toppings are what customers can add to a pizza."}
            </DialogDescription>
          </DialogHeader>
          <FormAlert message={formError} />

          <div className="grid gap-2">
            <Label htmlFor={`${prefix}-name`}>Name</Label>
            <Input
              id={`${prefix}-name`}
              autoComplete="off"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? `${prefix}-name-message` : undefined}
              {...register("name")}
            />
            <FieldMessage id={`${prefix}-name-message`} message={errors.name?.message} />
          </div>

          <div className="grid items-start gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor={`${prefix}-unitOfMeasureId`}>Unit</Label>
              <NativeSelect
                id={`${prefix}-unitOfMeasureId`}
                className="w-full"
                aria-invalid={errors.unitOfMeasureId ? true : undefined}
                aria-describedby={errors.unitOfMeasureId ? `${prefix}-unitOfMeasureId-message` : undefined}
                {...register("unitOfMeasureId")}
              >
                <NativeSelectOption value="" disabled>
                  Pick a unit
                </NativeSelectOption>
                {units.map((unit) => (
                  <NativeSelectOption key={unit.unitOfMeasureId} value={unit.unitOfMeasureId}>
                    {unit.name}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              <FieldMessage id={`${prefix}-unitOfMeasureId-message`} message={errors.unitOfMeasureId?.message} />
            </div>
            {!ingredient && (
              <div className="grid gap-2">
                <Label htmlFor={`${prefix}-currentStock`}>Starting stock{unitName ? ` (${unitName})` : ""}</Label>
                <Input {...numberInput("currentStock", "0.01")} />
                <FieldMessage id={`${prefix}-currentStock-message`} message={errors.currentStock?.message} />
              </div>
            )}
          </div>
          {unitChanged && (
            <p className="-mt-2 text-sm text-warning-foreground">
              Stock and recipe amounts aren&apos;t converted: they keep their numbers in the new unit.
            </p>
          )}

          <ChoiceGroup
            legend="Offered as a topping?"
            size="sm"
            value={isTopping ? "yes" : "no"}
            choices={TOPPING_CHOICES}
            onChange={(next) => setValue("isTopping", next === "yes")}
          />
          {isTopping && (
            <div className="grid items-start gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor={`${prefix}-toppingPrice`}>Topping price ($)</Label>
                <Input {...numberInput("toppingPrice", "0.01")} />
                <FieldMessage id={`${prefix}-toppingPrice-message`} message={errors.toppingPrice?.message} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`${prefix}-toppingPortion`}>Portion{unitName ? ` (${unitName})` : ""}</Label>
                <Input {...numberInput("toppingPortion", "0.0001")} />
                <FieldMessage id={`${prefix}-toppingPortion-message`} message={errors.toppingPortion?.message} />
              </div>
              <p className="text-sm text-muted-foreground sm:col-span-2">
                For a Small, whole pizza at the standard amount. Larger sizes, half coverage and
                light/extra scale both.
              </p>
            </div>
          )}

          {ingredient && (
            <ChoiceGroup
              legend="Status"
              size="sm"
              value={isActive ? "active" : "retired"}
              choices={STATUS_CHOICES}
              onChange={(next) => setValue("isActive", next === "active")}
            />
          )}
          {ingredient && !isActive && (
            <p className="-mt-2 text-sm text-muted-foreground">
              Retired ingredients can&apos;t be added to recipes or picked as toppings. Recipes that already
              use it keep it.
            </p>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving…" : ingredient ? "Save changes" : "Add ingredient"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
