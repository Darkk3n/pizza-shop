import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { requireStaff } from "@/lib/auth/currentUser";
import { formatDateTime, ORDER_TYPE_LABELS } from "@/lib/helpers/format";
import { getOrder } from "@/lib/api/orders";
import { OrderItemsTable } from "@/components/orders/OrderItemsTable";
import { StatusBadge } from "@/components/orders/StatusBadge";
import { OrderActions } from "./OrderActions";

export const metadata: Metadata = { title: "Order · Pizza Shop POS" };

const Detail = ({ label, children }: { label: string; children: ReactNode }) => {
  return (
    <div className="grid gap-0.5">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-sm">{children}</dd>
    </div>
  );
};

const OrderDetail = async ({ params }: { params: PageProps<"/orders/[id]">["params"] }) => {
  await requireStaff();
  const order = await getOrder((await params).id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h1 className="font-mono text-2xl font-semibold tracking-tight">Order #{order.orderNumber}</h1>
            <StatusBadge status={order.status} />
          </div>
          <p className="text-sm text-muted-foreground">
            {ORDER_TYPE_LABELS[order.orderType]} · placed {formatDateTime(order.createdAt)}
          </p>
        </div>
        <OrderActions orderId={order.orderId} orderNumber={order.orderNumber} status={order.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
        <Card>
          <CardHeader>
            <CardTitle>Items</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderItemsTable order={order} />
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4">
              <Detail label="Placed by">{order.placedByEmail ?? "—"}</Detail>
              <Detail label="Placed">{formatDateTime(order.createdAt)}</Detail>
              {order.cancelledAt && (
                <>
                  <Detail label="Cancelled">{formatDateTime(order.cancelledAt)}</Detail>
                  <Detail label="Cancelled by">{order.cancelledByEmail ?? "—"}</Detail>
                  <Detail label="Reason">{order.cancellationReason ?? "No reason given"}</Detail>
                </>
              )}
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const OrderDetailSkeleton = () => {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading order">
      <Skeleton className="h-8 w-56" />
      <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
        <Skeleton className="h-64" />
        <Skeleton className="h-40" />
      </div>
    </div>
  );
};

const OrderPage = ({ params }: PageProps<"/orders/[id]">) => {
  return (
    <div className="flex flex-col gap-6">
      <Link href="/orders" className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeftIcon className="size-4" />
        All orders
      </Link>
      <Suspense fallback={<OrderDetailSkeleton />}>
        <OrderDetail params={params} />
      </Suspense>
    </div>
  );
};

export default OrderPage;
