"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cancelOrderSchema, type CancelOrderInput } from "@/lib/api/schemas/orders";
import { cancelOrder } from "./actions";

type CancelOrderDialogProps = {
  orderId: string;
  orderNumber: number;
  // Staff and customers need different explanations of what cancelling does.
  description: string;
  successMessage: string;
  reasonPlaceholder: string;
};

// Confirm + optional reason, then POST /api/orders/{id}/cancel. A 409 means the order moved on
// meanwhile (e.g. the kitchen started it): the action refreshed the page, so close and explain.
export const CancelOrderDialog = ({
  orderId,
  orderNumber,
  description,
  successMessage,
  reasonPlaceholder,
}: CancelOrderDialogProps) => {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CancelOrderInput>({ resolver: zodResolver(cancelOrderSchema), defaultValues: { reason: "" } });

  const onSubmit = handleSubmit((values) => {
    setFormError(null);
    startTransition(async () => {
      const result = await cancelOrder(orderId, values);
      if (result.ok) {
        toast.success(successMessage);
        setOpen(false);
        reset();
      } else if (result.status === 409) {
        setOpen(false);
        toast.warning(result.message ?? "This order changed. Showing the latest version.");
      } else {
        setFormError(result.message || Object.values(result.fieldErrors ?? {}).join(" ") || "Couldn't cancel the order.");
      }
    });
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setFormError(null);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="destructive">Cancel order</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit} noValidate className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Cancel order #{orderNumber}?</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <FormAlert message={formError} />
          <div className="grid gap-2">
            <Label htmlFor="cancel-reason">Reason (optional)</Label>
            <Textarea
              id="cancel-reason"
              rows={3}
              placeholder={reasonPlaceholder}
              aria-invalid={errors.reason ? true : undefined}
              aria-describedby={errors.reason ? "cancel-reason-message" : undefined}
              {...register("reason")}
            />
            {errors.reason && (
              <p id="cancel-reason-message" className="text-sm text-destructive">
                {errors.reason.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Keep order
              </Button>
            </DialogClose>
            <Button type="submit" variant="destructive" disabled={pending}>
              {pending ? "Cancelling…" : "Cancel order"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
