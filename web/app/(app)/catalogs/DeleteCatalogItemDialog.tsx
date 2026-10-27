"use client";

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
import type { ActionResult } from "@/lib/helpers/actions";

type DeleteCatalogItemDialogProps = {
  name: string;
  // e.g. "size", for the buttons and the fallback error.
  kind: string;
  description: string;
  // What to say when the API answers 409 (the item is in use).
  inUseMessage: string;
  onDelete: () => Promise<ActionResult>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

// Catalog rows that orders or ingredients still use can't be deleted; the API answers 409 and the
// dialog stays open to say why.
export const DeleteCatalogItemDialog = ({
  name,
  kind,
  description,
  inUseMessage,
  onDelete,
  open,
  onOpenChange,
}: DeleteCatalogItemDialogProps) => {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const remove = () => {
    setError(null);
    startTransition(async () => {
      const result = await onDelete();
      if (result.ok) {
        toast.success(`${name} deleted.`);
        onOpenChange(false);
      } else if (result.status === 409) {
        setError(inUseMessage);
      } else {
        setError(result.message || `Couldn't delete the ${kind}.`);
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
          <AlertDialogTitle>Delete {name}?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <FormAlert message={error} />
        <AlertDialogFooter>
          <AlertDialogCancel>Keep {kind}</AlertDialogCancel>
          {/* A plain button, not AlertDialogAction, so the dialog stays open to show a 409. */}
          <Button variant="destructive" disabled={pending} onClick={remove}>
            {pending ? "Deleting…" : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
