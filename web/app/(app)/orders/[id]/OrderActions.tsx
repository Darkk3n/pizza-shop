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
import type { ActionResult } from "@/lib/helpers/actions";
import {
  cancelOrderSchema,
  isCancellable,
  nextStatuses,
  type CancelOrderInput,
  type OrderStatus,
} from "@/lib/api/schemas/orders";
import { ORDER_STATUS_LABELS } from "@/lib/helpers/format";
import { advanceStatus, cancelOrder } from "../actions";

type OrderActionsProps = { orderId: string; orderNumber: number; status: OrderStatus };

// 409 means someone else changed the order first; the action already refreshed the page.
const reportFailure = (result: Extract<ActionResult, { ok: false }>) => {
  if (result.status === 409) {
    toast.warning(result.message ?? "This order changed. Showing the latest version.");
  } else {
    toast.error(result.message || Object.values(result.fieldErrors ?? {}).join(" ") || "Couldn't update the order.");
  }
};

const CancelOrderDialog = ({ orderId, orderNumber }: Omit<OrderActionsProps, "status">) => {
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
        toast.success(`Order #${orderNumber} cancelled. Its stock was returned.`);
        setOpen(false);
        reset();
      } else if (result.status === 409) {
        setOpen(false);
        reportFailure(result);
      } else {
        setFormError(result.message ?? Object.values(result.fieldErrors ?? {}).join(" "));
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
            <DialogDescription>
              The ingredients this order used go back into stock. The order stays in the history as cancelled.
            </DialogDescription>
          </DialogHeader>
          <FormAlert message={formError} />
          <div className="grid gap-2">
            <Label htmlFor="cancel-reason">Reason (optional)</Label>
            <Textarea
              id="cancel-reason"
              rows={3}
              placeholder="e.g. Customer changed their mind"
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

export const OrderActions = ({ orderId, orderNumber, status }: OrderActionsProps) => {
  const [pending, startTransition] = useTransition();
  const [target, setTarget] = useState<OrderStatus | null>(null);
  const forward = nextStatuses(status);

  if (forward.length === 0 && !isCancellable(status)) return null;

  const move = (next: OrderStatus) => {
    setTarget(next);
    startTransition(async () => {
      const result = await advanceStatus(orderId, next);
      if (result.ok) toast.success(`Order #${orderNumber} is now ${ORDER_STATUS_LABELS[next].toLowerCase()}.`);
      else reportFailure(result);
      setTarget(null);
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* The next step is the main action; later steps can be skipped to. */}
      {forward.map((next, index) => (
        <Button key={next} variant={index === 0 ? "default" : "outline"} disabled={pending} onClick={() => move(next)}>
          {pending && target === next ? "Updating…" : `Mark ${ORDER_STATUS_LABELS[next].toLowerCase()}`}
        </Button>
      ))}
      {isCancellable(status) && <CancelOrderDialog orderId={orderId} orderNumber={orderNumber} />}
    </div>
  );
};
