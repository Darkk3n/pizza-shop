import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Pager } from "@/components/orders/Pager";
import { StatusBadge } from "@/components/orders/StatusBadge";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { listOrders, ORDERS_PAGE_SIZE } from "@/lib/api/orders";
import { orderListQuerySchema } from "@/lib/api/schemas/orders";
import { requireUser } from "@/lib/auth/currentUser";
import { formatDateTime, formatMoney, ORDER_TYPE_LABELS } from "@/lib/helpers/format";

export const metadata: Metadata = { title: "My orders · Rubencinis & Mate Pizza" };

const hrefForPage = (page: number) => (page > 1 ? `/my-orders?page=${page}` : "/my-orders");

const MyOrdersTable = async ({ searchParams }: { searchParams: PageProps<"/my-orders">["searchParams"] }) => {
  const user = await requireUser();
  // GET /api/orders returns every order to staff, so "my orders" only makes sense for customers.
  if (user.isStaff) redirect("/orders");

  const { page } = orderListQuerySchema.parse(await searchParams);
  const result = await listOrders({ page });
  const pageCount = Math.max(1, Math.ceil(result.totalCount / ORDERS_PAGE_SIZE));

  if (result.totalCount === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed px-4 py-16 text-center">
        <p className="text-muted-foreground">You haven&apos;t placed any orders yet.</p>
        <Link href="/menu" className={buttonVariants()}>
          Browse the menu
        </Link>
      </div>
    );
  }

  // A page number past the end (an old link, or a hand-edited URL).
  if (result.items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed px-4 py-16 text-center">
        <p className="text-muted-foreground">There are no orders on this page.</p>
        <Link href={hrefForPage(1)} className={buttonVariants({ variant: "outline" })}>
          Go to your latest orders
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Placed</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
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
                    href={`/my-orders/${order.orderId}`}
                    className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring"
                  >
                    #{order.orderNumber}
                  </Link>
                </TableCell>
                <TableCell>
                  <StatusBadge status={order.status} />
                </TableCell>
                <TableCell className="hidden font-mono text-muted-foreground sm:table-cell">
                  {formatDateTime(order.createdAt)}
                </TableCell>
                <TableCell className="hidden md:table-cell">{ORDER_TYPE_LABELS[order.orderType]}</TableCell>
                <TableCell className="text-right tabular-nums">{order.itemCount}</TableCell>
                <TableCell className="text-right font-mono tabular-nums">{formatMoney(order.total)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pager page={result.page} pageCount={pageCount} totalCount={result.totalCount} hrefForPage={hrefForPage} />
    </div>
  );
};

const MyOrdersSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 rounded-lg border p-4" aria-busy="true" aria-label="Loading your orders">
      {Array.from({ length: 5 }, (_, i) => (
        <Skeleton key={i} className="h-8 w-full" />
      ))}
    </div>
  );
};

const MyOrdersPage = ({ searchParams }: PageProps<"/my-orders">) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">My orders</h1>
        <p className="text-muted-foreground">Newest first. Open one to see what&apos;s in it.</p>
      </div>
      <Suspense fallback={<MyOrdersSkeleton />}>
        <MyOrdersTable searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default MyOrdersPage;
