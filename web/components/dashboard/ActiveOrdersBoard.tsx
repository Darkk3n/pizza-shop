import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/orders/StatusBadge";
import { listActiveOrders } from "@/lib/api/orders";
import type { Order, OrderStatus } from "@/lib/api/schemas/orders";
import { ORDER_STATUS_LABELS } from "@/lib/helpers/format";
import { ActiveOrderCard } from "./ActiveOrderCard";

const COLUMNS: OrderStatus[] = ["Pending", "Preparing", "Ready"];

const Column = ({ status, orders }: { status: OrderStatus; orders: Order[] }) => {
  const headingId = `column-${status}`;
  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-3">
      <h2 id={headingId} className="flex items-center gap-2 font-medium">
        <StatusBadge status={status} />
        <span className="text-sm text-muted-foreground tabular-nums">
          {orders.length} {orders.length === 1 ? "order" : "orders"}
        </span>
      </h2>
      {orders.length === 0 ? (
        <p className="rounded-lg border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
          No {ORDER_STATUS_LABELS[status].toLowerCase()} orders.
        </p>
      ) : (
        <ol className="flex flex-col gap-3">
          {orders.map((order) => (
            <li key={order.orderId}>
              <ActiveOrderCard order={order} />
            </li>
          ))}
        </ol>
      )}
    </section>
  );
};

// The kitchen queue: one column per active status, oldest order at the top of each (the API's order).
export const ActiveOrdersBoard = async () => {
  const orders = await listActiveOrders();
  return (
    <div className="grid items-start gap-6 lg:grid-cols-3">
      {COLUMNS.map((status) => (
        <Column key={status} status={status} orders={orders.filter((order) => order.status === status)} />
      ))}
    </div>
  );
};

export const ActiveOrdersBoardSkeleton = () => {
  return (
    <div className="grid items-start gap-6 lg:grid-cols-3" aria-busy="true" aria-label="Loading active orders">
      {COLUMNS.map((status) => (
        <div key={status} className="flex flex-col gap-3">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      ))}
    </div>
  );
};
