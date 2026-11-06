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
  { value: "active", label: "Activo" },
  { value: "retired", label: "Retirado" },
] as const;

const TOPPING_CHOICES = [
  { value: "yes", label: "Sí" },
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
        toast.success(ingredient ? `${values.name.trim()} guardado.` : `${values.name.trim()} agregado.`);
        close();
      } else if (result.status === 409) {
        setError("name", { message: result.message ?? "Ya existe otro ingrediente con este nombre." });
      } else {
        setFormError(applyActionErrors(result, setError, FIELDS) ?? "No se pudo guardar el ingrediente.");
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
            <DialogTitle>{ingredient ? `Editar ${ingredient.name}` : "Nuevo ingrediente"}</DialogTitle>
            <DialogDescription>
              {ingredient
                ? "La existencia se cambia con Ajustar; aquí se editan los datos del catálogo."
                : "Las recetas lo usan por cantidad; los ingredientes extra son los que el cliente puede agregar a una pizza."}
            </DialogDescription>
          </DialogHeader>
          <FormAlert message={formError} />

          <div className="grid gap-2">
            <Label htmlFor={`${prefix}-name`}>Nombre</Label>
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
              <Label htmlFor={`${prefix}-unitOfMeasureId`}>Unidad</Label>
              <NativeSelect
                id={`${prefix}-unitOfMeasureId`}
                className="w-full"
                aria-invalid={errors.unitOfMeasureId ? true : undefined}
                aria-describedby={errors.unitOfMeasureId ? `${prefix}-unitOfMeasureId-message` : undefined}
                {...register("unitOfMeasureId")}
              >
                <NativeSelectOption value="" disabled>
                  Seleccionar unidad
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
                <Label htmlFor={`${prefix}-currentStock`}>Existencia inicial{unitName ? ` (${unitName})` : ""}</Label>
                <Input {...numberInput("currentStock", "0.01")} />
                <FieldMessage id={`${prefix}-currentStock-message`} message={errors.currentStock?.message} />
              </div>
            )}
          </div>
          {unitChanged && (
            <p className="-mt-2 text-sm text-warning-foreground">
              La existencia y las cantidades de las recetas no se convierten: conservan sus números en la nueva unidad.
            </p>
          )}

          <ChoiceGroup
            legend="¿Se ofrece como ingrediente extra?"
            size="sm"
            value={isTopping ? "yes" : "no"}
            choices={TOPPING_CHOICES}
            onChange={(next) => setValue("isTopping", next === "yes")}
          />
          {isTopping && (
            <div className="grid items-start gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor={`${prefix}-toppingPrice`}>Precio como extra ($)</Label>
                <Input {...numberInput("toppingPrice", "0.01")} />
                <FieldMessage id={`${prefix}-toppingPrice-message`} message={errors.toppingPrice?.message} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`${prefix}-toppingPortion`}>Porción{unitName ? ` (${unitName})` : ""}</Label>
                <Input {...numberInput("toppingPortion", "0.0001")} />
                <FieldMessage id={`${prefix}-toppingPortion-message`} message={errors.toppingPortion?.message} />
              </div>
              <p className="text-sm text-muted-foreground sm:col-span-2">
                Para una pizza chica completa en cantidad normal. Los tamaños más grandes, la media pizza
                y las cantidades poco/extra ajustan ambos valores.
              </p>
            </div>
          )}

          {ingredient && (
            <ChoiceGroup
              legend="Estado"
              size="sm"
              value={isActive ? "active" : "retired"}
              choices={STATUS_CHOICES}
              onChange={(next) => setValue("isActive", next === "active")}
            />
          )}
          {ingredient && !isActive && (
            <p className="-mt-2 text-sm text-muted-foreground">
              Los ingredientes retirados no se pueden agregar a recetas ni elegir como extra. Las recetas que
              ya lo usan lo conservan.
            </p>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cerrar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={pending}>
              {pending ? "Guardando…" : ingredient ? "Guardar cambios" : "Agregar ingrediente"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
