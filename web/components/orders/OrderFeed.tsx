"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useEffectEvent } from "react";
import { toast } from "sonner";
import { orderFeedSchema, type OrderFeed as Feed } from "@/lib/api/schemas/orders";
import { formatMoney, ORDER_TYPE_LABELS } from "@/lib/helpers/format";

const VISIBLE_INTERVAL_MS = 10_000;
// A background tab polls slower, but often enough that the session stays alive.
const HIDDEN_INTERVAL_MS = 60_000;
// More new orders than this at once (e.g. after the tab slept) get one summary toast.
const MAX_ORDER_TOASTS = 3;

// Staff only (rendered by app/(app)/layout.tsx): polls the BFF feed, toasts each new customer order
// and each cancellation someone else made, and refreshes the dashboard when the active queue
// changes. Lives in the layout, so it keeps its cursors across navigation.
export const OrderFeed = () => {
  const router = useRouter();
  const pathname = usePathname();

  const announce = useEffectEvent((orders: Feed["newOrders"]) => {
    if (orders.length > MAX_ORDER_TOASTS) {
      toast.info(`${orders.length} new orders`, {
        action: { label: "View", onClick: () => router.push("/") },
        duration: 10_000,
      });
      return;
    }
    for (const order of orders) {
      const items = `${order.itemCount} ${order.itemCount === 1 ? "item" : "items"}`;
      toast.info(`New order #${order.orderNumber}`, {
        description: `${ORDER_TYPE_LABELS[order.orderType]} · ${items} · ${formatMoney(order.total)}${order.placedByEmail ? ` · ${order.placedByEmail}` : ""}`,
        action: { label: "View", onClick: () => router.push(`/orders/${order.orderId}`) },
        duration: 10_000,
      });
    }
  });

  const announceCancellations = useEffectEvent((orders: Feed["cancelledOrders"]) => {
    if (orders.length > MAX_ORDER_TOASTS) {
      toast.warning(`${orders.length} orders cancelled`, { duration: 10_000 });
      return;
    }
    for (const order of orders) {
      const details = [order.cancelledByEmail && `By ${order.cancelledByEmail}`, order.cancellationReason].filter(Boolean);
      toast.warning(`Order #${order.orderNumber} cancelled`, {
        description: details.length > 0 ? details.join(" · ") : undefined,
        action: { label: "View", onClick: () => router.push(`/orders/${order.orderId}`) },
        duration: 10_000,
      });
    }
  });

  // Only the dashboard shows the live queue; other pages pick it up on their next load.
  const queueChanged = useEffectEvent(() => {
    if (pathname === "/") router.refresh();
  });

  // The proxy answered 401 (session over): re-render so the page sends the user to sign in.
  const sessionEnded = useEffectEvent(() => router.refresh());

  useEffect(() => {
    // Cursors echoed back to the API; undefined until the first poll, which only sets them.
    let cursor: number | undefined;
    let cancelledCursor: string | undefined;
    let version: string | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let controller: AbortController | undefined;
    let stopped = false;

    const schedule = () => {
      clearTimeout(timer);
      if (!stopped) timer = setTimeout(poll, document.hidden ? HIDDEN_INTERVAL_MS : VISIBLE_INTERVAL_MS);
    };

    const poll = async () => {
      // One loop at a time: a visibility-triggered poll replaces the pending one.
      clearTimeout(timer);
      controller?.abort();
      controller = new AbortController();
      try {
        const query = new URLSearchParams();
        if (cursor !== undefined) query.set("after", String(cursor));
        if (cancelledCursor !== undefined) query.set("cancelledAfter", cancelledCursor);
        const response = await fetch(`/api/orders/feed?${query}`, { cache: "no-store", signal: controller.signal });
        if (response.status === 401) {
          stopped = true;
          sessionEnded();
          return;
        }
        if (response.ok) {
          const feed = orderFeedSchema.parse(await response.json());
          if (feed.newOrders.length > 0) announce(feed.newOrders);
          if (feed.cancelledOrders.length > 0) announceCancellations(feed.cancelledOrders);
          if (version !== undefined && feed.activeVersion !== version) queueChanged();
          cursor = feed.latestOrderNumber;
          cancelledCursor = feed.cancelledSince;
          version = feed.activeVersion;
        }
        // Anything else (API down, 429) is skipped; the next poll tries again.
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
      schedule();
    };

    // Back on the tab: check now instead of waiting out the slow background interval.
    const onVisibilityChange = () => {
      if (!document.hidden) void poll();
    };

    void poll();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      stopped = true;
      clearTimeout(timer);
      controller?.abort();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return null;
};
