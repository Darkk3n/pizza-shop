"use client";

import { useRouter } from "next/navigation";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteRecipe } from "./actions";

// Only recipes that were never ordered can be deleted; the API answers 409 otherwise, and
// retiring keeps the order history (and its price snapshots) intact.
export const DeleteRecipeDialog = ({ recipeId, name }: { recipeId: string; name: string }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const onDelete = () => {
    setError(null);
    startTransition(async () => {
      const result = await deleteRecipe(recipeId);
      if (result.ok) {
        toast.success(`${name} deleted.`);
        setOpen(false);
        router.push("/recipes");
      } else if (result.status === 409) {
        setError(`${name} is in past orders, so it can't be deleted. Set its status to Retired instead.`);
      } else {
        setError(result.message || "Couldn't delete the recipe.");
      }
    });
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setError(null);
      }}
    >
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="text-destructive">
          Delete recipe
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {name}?</AlertDialogTitle>
          <AlertDialogDescription>
            This removes it for good. Recipes that were already ordered can only be retired.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <FormAlert message={error} />
        <AlertDialogFooter>
          <AlertDialogCancel>Keep recipe</AlertDialogCancel>
          {/* A plain button, not AlertDialogAction, so the dialog stays open to show a 409. */}
          <Button variant="destructive" disabled={pending} onClick={onDelete}>
            {pending ? "Deleting…" : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
