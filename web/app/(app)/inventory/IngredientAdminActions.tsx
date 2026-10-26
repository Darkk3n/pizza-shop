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
        New ingredient
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
        toast.success(`${ingredient.name} deleted.`);
        onOpenChange(false);
      } else if (result.status === 409) {
        setError(`${ingredient.name} is used by recipes or past orders, so it can't be deleted. Edit it and set it to Retired instead.`);
      } else {
        setError(result.message || "Couldn't delete the ingredient.");
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
          <AlertDialogTitle>Delete {ingredient.name}?</AlertDialogTitle>
          <AlertDialogDescription>
            This removes it for good. Ingredients that recipes or orders use can only be retired.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <FormAlert message={error} />
        <AlertDialogFooter>
          <AlertDialogCancel>Keep ingredient</AlertDialogCancel>
          {/* A plain button, not AlertDialogAction, so the dialog stays open to show a 409. */}
          <Button variant="destructive" disabled={pending} onClick={onDelete}>
            {pending ? "Deleting…" : "Delete"}
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
          <Button variant="ghost" size="icon-sm" aria-label={`More actions for ${ingredient.name}`}>
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setDialog("edit")}>Edit</DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onSelect={() => setDialog("delete")}>
            Delete
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
