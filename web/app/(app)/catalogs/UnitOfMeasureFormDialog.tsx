"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { unitOfMeasureFormSchema, type UnitOfMeasure, type UnitOfMeasureForm } from "@/lib/api/schemas/ingredients";
import { applyActionErrors } from "@/lib/helpers/forms";
import { createUnitOfMeasure, updateUnitOfMeasure } from "./actions";
import { FieldMessage } from "./FieldMessage";

type UnitOfMeasureFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // Absent = a new unit.
  unit?: UnitOfMeasure;
  // Ingredients measured in this unit, for the rename note.
  ingredientCount?: number;
};

const FIELDS = ["name"] as const;

export const UnitOfMeasureFormDialog = ({ open, onOpenChange, unit, ingredientCount = 0 }: UnitOfMeasureFormDialogProps) => {
  const [pending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<UnitOfMeasureForm>({
    resolver: zodResolver(unitOfMeasureFormSchema),
    defaultValues: { name: unit?.name ?? "" },
  });

  const prefix = unit ? `edit-unit-${unit.unitOfMeasureId}` : "new-unit";

  useEffect(() => {
    if (open) reset({ name: unit?.name ?? "" });
  }, [open, unit, reset]);

  const close = () => {
    onOpenChange(false);
    setFormError(null);
  };

  const onSubmit = handleSubmit((values) => {
    setFormError(null);
    startTransition(async () => {
      const result = unit ? await updateUnitOfMeasure(unit.unitOfMeasureId, values) : await createUnitOfMeasure(values);
      if (result.ok) {
        toast.success(unit ? `${values.name.trim()} saved.` : `${values.name.trim()} added.`);
        close();
      } else if (result.status === 409) {
        setError("name", { message: result.message ?? "Another unit already has this name." });
      } else {
        setFormError(applyActionErrors(result, setError, FIELDS) ?? "Couldn't save the unit.");
      }
    });
  });

  return (
    <Dialog open={open} onOpenChange={(next) => (next ? onOpenChange(true) : close())}>
      <DialogContent>
        <form onSubmit={onSubmit} noValidate className="grid gap-4">
          <DialogHeader>
            <DialogTitle>{unit ? `Edit ${unit.name}` : "New unit"}</DialogTitle>
            <DialogDescription>
              {unit && ingredientCount > 0
                ? `Renaming changes how ${ingredientCount === 1 ? "1 ingredient" : `${ingredientCount} ingredients`} and their recipe amounts read. Amounts aren't converted.`
                : "Ingredients are stocked and used in recipes by this unit, e.g. Gram or Piece."}
            </DialogDescription>
          </DialogHeader>
          <FormAlert message={formError} />

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

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving…" : unit ? "Save changes" : "Add unit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
