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
  // e.g. "tamaño", for the keep button ("Conservar tamaño").
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
        toast.success(`${name}: eliminado.`);
        onOpenChange(false);
      } else if (result.status === 409) {
        setError(inUseMessage);
      } else {
        setError(result.message || `No se pudo eliminar ${name}.`);
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
          <AlertDialogTitle>¿Eliminar {name}?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <FormAlert message={error} />
        <AlertDialogFooter>
          <AlertDialogCancel>Conservar {kind}</AlertDialogCancel>
          {/* A plain button, not AlertDialogAction, so the dialog stays open to show a 409. */}
          <Button variant="destructive" disabled={pending} onClick={remove}>
            {pending ? "Eliminando…" : "Eliminar"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
