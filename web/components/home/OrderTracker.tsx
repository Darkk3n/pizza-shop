"use client";

import { CheckIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { activeOrdersUpdateSchema, type Order, type OrderStatus } from "@/lib/api/schemas/orders";
import { formatMoney, formatTime, ORDER_TYPE_LABELS } from "@/lib/helpers/format";
import { cn } from "@/lib/utils";

const POLL_INTERVAL_MS = 15_000;

const STEPS: { status: OrderStatus; label: string }[] = [
  { status: "Pending", label: "Received" },
  { status: "Preparing", label: "Preparing" },
  { status: "Ready", label: "Ready" },
];

const readyMessage = (order: Pick<Order, "orderType">) =>
  order.orderType === "DineIn" ? "It's on its way to your table." : "It's ready for pickup.";

const statusMessage = (order: Order) => {
  if (order.status === "Pending") return "We've got your order and will start on it shortly.";
  if (order.status === "Preparing") return "It's being made right now.";
  return readyMessage(order);
};

const Steps = ({ status }: { status: OrderStatus }) => {
  const current = STEPS.findIndex((step) => step.status === status);
  return (
    <ol className="grid grid-cols-3 gap-2" aria-label="Order progress">
      {STEPS.map((step, index) => (
        <li
          key={step.status}
          aria-current={index === current ? "step" : undefined}
          className="flex flex-col gap-1.5 text-xs font-medium"
        >
          <span className={cn("h-1.5 rounded-full bg-muted", index <= current && "bg-primary")} />
          <span className={cn("flex items-center gap-1", index > current && "text-muted-foreground")}>
            {index < current && <CheckIcon className="size-3.5 text-primary" aria-hidden="true" />}
            {step.label}
          </span>
        </li>
      ))}
    </ol>
  );
};

// The customer's orders in progress, kept current by checking every 15 s while the tab is visible.
// Those checks never refresh the session (proxy.ts lists the route as passive), so an idle customer
// still signs out after 30 minutes; once the access token runs out the checks pause until they're
// active again. Remounted (keyed by the page) whenever the server renders newer orders.
export const OrderTracker = ({ initialOrders }: { initialOrders: Order[] }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let statuses = new Map(initialOrders.map((order) => [order.orderId, order]));
    let timer: ReturnType<typeof setTimeout> | undefined;
    let controller: AbortController | undefined;
    let stopped = false;

    const poll = async () => {
      clearTimeout(timer);
      if (stopped || statuses.size === 0 || document.hidden) return;
      controller?.abort();
      controller = new AbortController();
      try {
        const track = [...statuses.keys()].join(",");
        const response = await fetch(`/api/orders/active?track=${track}`, { cache: "no-store", signal: controller.signal });
        if (response.status === 401) {
          stopped = true;
          setPaused(true);
          return;
        }
        if (response.ok) {
          const update = activeOrdersUpdateSchema.parse(await response.json());
          for (const order of update.active) {
            const before = statuses.get(order.orderId);
            if (before && before.status !== order.status) {
              if (order.status === "Ready") toast.success(`Order #${order.orderNumber} is ready`, { description: readyMessage(order) });
              else toast.info(`Order #${order.orderNumber} is being prepared`);
            }
          }
          for (const order of update.finished) {
            if (order.status === "Completed") toast.success(`Order #${order.orderNumber} is complete. Enjoy!`);
            else if (order.status === "Cancelled") {
              toast.warning(`Order #${order.orderNumber} was cancelled`, {
                description: order.cancellationReason ?? undefined,
              });
            }
          }
          // Orders placed meanwhile (another tab) are picked up too.
          statuses = new Map(update.active.map((order) => [order.orderId, order]));
          setOrders(update.active);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
      if (!stopped) timer = setTimeout(poll, POLL_INTERVAL_MS);
    };

    const onVisibilityChange = () => {
      if (!document.hidden) void poll();
    };

    timer = setTimeout(poll, POLL_INTERVAL_MS);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      stopped = true;
      clearTimeout(timer);
      controller?.abort();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [initialOrders]);

  if (orders.length === 0) return null;

  return (
    <section aria-labelledby="in-progress" className="flex flex-col gap-3">
      <h2 id="in-progress" className="text-lg font-semibold tracking-tight">
        {orders.length === 1 ? "Your order" : "Your orders"} in progress
      </h2>
      <ul className="grid gap-4 md:grid-cols-2">
        {orders.map((order) => (
          <li key={order.orderId}>
            <Card>
              <CardHeader>
                <div className="flex items-baseline justify-between gap-2">
                  <CardTitle className="font-mono">#{order.orderNumber}</CardTitle>
                  <Link href={`/my-orders/${order.orderId}`} className="text-sm text-muted-foreground hover:underline">
                    View order
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground">
                  {ORDER_TYPE_LABELS[order.orderType]} · placed{" "}
                  {/* The browser's time zone may differ from the server's; the customer's own clock wins. */}
                  <time dateTime={order.createdAt} suppressHydrationWarning>
                    {formatTime(order.createdAt)}
                  </time>{" "}
                  · {formatMoney(order.total)}
                </p>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <Steps status={order.status} />
                <p className="text-sm" role="status">
                  {statusMessage(order)}
                </p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
      {paused && (
        <p className="text-sm text-muted-foreground">
          Updates are paused while you&apos;re away.{" "}
          <Link href="/" className="font-medium text-foreground underline-offset-4 hover:underline">
            Check again
          </Link>
        </p>
      )}
    </section>
  );
};
