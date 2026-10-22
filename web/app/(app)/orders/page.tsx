import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { orderListQuerySchema, orderStatusSchema, type OrderStatus } from "@/lib/api/schemas/orders";
import { requireStaff } from "@/lib/auth/currentUser";
import { formatDateTime, formatMoney, ORDER_STATUS_LABELS, ORDER_TYPE_LABELS } from "@/lib/helpers/format";
import { listOrders, ORDERS_PAGE_SIZE } from "@/lib/api/orders";
import { Pager } from "@/components/orders/Pager";
import { StatusBadge } from "@/components/orders/StatusBadge";

export const metadata: Metadata = { title: "Orders · Pizza Shop POS" };

const FILTERS: { status?: OrderStatus; label: string }[] = [
  { label: "All" },
  ...orderStatusSchema.options.map((status) => ({ status, label: ORDER_STATUS_LABELS[status] })),
];

const hrefFor = (status: OrderStatus | undefined, page = 1) => {
  const query = new URLSearchParams();
  if (status) query.set("status", status);
  if (page > 1) query.set("page", String(page));
  const search = query.toString();
  return search ? `/orders?${search}` : "/orders";
};

const StatusFilters = ({ active }: { active?: OrderStatus }) => {
  return (
    <nav aria-label="Filter by status" className="flex flex-wrap gap-2">
      {FILTERS.map(({ status, label }) => (
        <Link
          key={label}
          href={hrefFor(status)}
          aria-current={status === active ? "page" : undefined}
          className={buttonVariants({ variant: status === active ? "default" : "outline", size: "sm" })}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

const OrdersTable = async ({ searchParams }: { searchParams: PageProps<"/orders">["searchParams"] }) => {
  await requireStaff();
  const { status, page } = orderListQuerySchema.parse(await searchParams);
  const result = await listOrders({ status, page });
  const pageCount = Math.max(1, Math.ceil(result.totalCount / ORDERS_PAGE_SIZE));

  return (
    <div className="flex flex-col gap-4">
      <StatusFilters active={status} />

      {result.items.length === 0 ? (
        <p className="rounded-lg border border-dashed px-4 py-12 text-center text-muted-foreground">
          {status ? `No ${ORDER_STATUS_LABELS[status].toLowerCase()} orders.` : "No orders yet."}
        </p>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Type</TableHead>
                <TableHead className="hidden md:table-cell">Placed by</TableHead>
                <TableHead className="hidden lg:table-cell">Placed</TableHead>
                <TableHead className="text-right">Items</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.items.map((order) => (
                <TableRow key={order.orderId} className="relative">
                  <TableCell className="font-mono font-medium">
                    {/* Stretched link: the whole row opens the order. */}
                    <Link
                      href={`/orders/${order.orderId}`}
                      className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring"
                    >
                      #{order.orderNumber}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{ORDER_TYPE_LABELS[order.orderType]}</TableCell>
                  <TableCell className="hidden max-w-56 truncate md:table-cell">{order.placedByEmail ?? "—"}</TableCell>
                  <TableCell className="hidden font-mono text-muted-foreground lg:table-cell">
                    {formatDateTime(order.createdAt)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{order.itemCount}</TableCell>
                  <TableCell className="text-right font-mono tabular-nums">{formatMoney(order.total)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Pager
        page={result.page}
        pageCount={pageCount}
        totalCount={result.totalCount}
        hrefForPage={(target) => hrefFor(status, target)}
      />
    </div>
  );
};

const OrdersTableSkeleton = () => {
  return (
    <div className="flex flex-col gap-4" aria-busy="true" aria-label="Loading orders">
      <div className="flex gap-2">
        {FILTERS.map(({ label }) => (
          <Skeleton key={label} className="h-7 w-20" />
        ))}
      </div>
      <div className="flex flex-col gap-2 rounded-lg border p-4">
        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    </div>
  );
};

const OrdersPage = ({ searchParams }: PageProps<"/orders">) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">Move orders through the kitchen, or cancel them.</p>
      </div>
      <Suspense fallback={<OrdersTableSkeleton />}>
        <OrdersTable searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default OrdersPage;
