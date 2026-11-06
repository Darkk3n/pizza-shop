"use client";

import { MoreHorizontalIcon, PlusIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { FormAlert } from "@/components/forms/FormAlert";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Ingredient, UnitOfMeasure } from "@/lib/api/schemas/ingredients";
import { deleteIngredient } from "./actions";
import { IngredientFormDialog } from "./IngredientFormDialog";

export const NewIngredientButton = ({ units }: { units: UnitOfMeasure[] }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <PlusIcon />
        Nuevo ingrediente
      </Button>
      <IngredientFormDialog open={open} onOpenChange={setOpen} units={units} />
    </>
  );
};

type DeleteIngredientDialogProps = {
  ingredient: Ingredient;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

// Only ingredients no recipe or order ever used can be deleted; the API answers 409 otherwise,
// and retiring keeps recipes and order history intact.
const DeleteIngredientDialog = ({ ingredient, open, onOpenChange }: DeleteIngredientDialogProps) => {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const onDelete = () => {
    setError(null);
    startTransition(async () => {
      const result = await deleteIngredient(ingredient.ingredientId);
      if (result.ok) {
        toast.success(`${ingredient.name} eliminado.`);
        onOpenChange(false);
      } else if (result.status === 409) {
        setError(`${ingredient.name} se usa en recetas o en pedidos anteriores, así que no se puede eliminar. En su lugar, se puede editar y marcar como Retirado.`);
      } else {
        setError(result.message || "No se pudo eliminar el ingrediente.");
      }
    });
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setError(null);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar {ingredient.name}?</AlertDialogTitle>
          <AlertDialogDescription>
            Se elimina de forma permanente. Los ingredientes que usan recetas o pedidos solo se pueden retirar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <FormAlert message={error} />
        <AlertDialogFooter>
          <AlertDialogCancel>Conservar ingrediente</AlertDialogCancel>
          {/* A plain button, not AlertDialogAction, so the dialog stays open to show a 409. */}
          <Button variant="destructive" disabled={pending} onClick={onDelete}>
            {pending ? "Eliminando…" : "Eliminar"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// Edit / Delete for admins, next to the Adjust button staff also get. The dialogs live outside
// the menu so they stay open after the menu closes.
export const IngredientAdminActions = ({ ingredient, units }: { ingredient: Ingredient; units: UnitOfMeasure[] }) => {
  const [dialog, setDialog] = useState<"edit" | "delete" | null>(null);
  const setOpen = (which: "edit" | "delete") => (open: boolean) => setDialog(open ? which : null);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label={`Más acciones para ${ingredient.name}`}>
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setDialog("edit")}>Editar</DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onSelect={() => setDialog("delete")}>
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <IngredientFormDialog
        open={dialog === "edit"}
        onOpenChange={setOpen("edit")}
        ingredient={ingredient}
        units={units}
      />
      <DeleteIngredientDialog ingredient={ingredient} open={dialog === "delete"} onOpenChange={setOpen("delete")} />
    </>
  );
};
