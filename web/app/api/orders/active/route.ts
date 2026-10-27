import { NextResponse, type NextRequest } from "next/server";
import { findOrder, listActiveOrders } from "@/lib/api/orders";
import { ApiError } from "@/lib/api/problem";
import { activeOrdersQuerySchema, type ActiveOrdersUpdate } from "@/lib/api/schemas/orders";

const problemJson = (body: object, status: number, headers?: HeadersInit) =>
  NextResponse.json(body, { status, headers: { "Content-Type": "application/problem+json", ...headers } });

// BFF for components/home/OrderTracker.tsx: a customer's orders in progress, plus what became of the
// tracked ones that left that list. proxy.ts lists this path as passive, so these checks never
// refresh the session (the 30-minute idle timeout still applies to customers).
export const GET = async (request: NextRequest) => {
  const parsed = activeOrdersQuerySchema.safeParse({ track: request.nextUrl.searchParams.get("track") ?? undefined });
  if (!parsed.success) {
    return problemJson({ title: "Invalid order ids.", status: 400 }, 400);
  }

  try {
    const active = await listActiveOrders();
    const activeIds = new Set(active.map((order) => order.orderId));
    // Another customer's id (or a made-up one) is a 404 from the API, and simply left out.
    const finished = (
      await Promise.all(parsed.data.track.filter((id) => !activeIds.has(id)).map((id) => findOrder(id)))
    ).filter((order) => order !== null);
    const body: ActiveOrdersUpdate = {
      active,
      finished: finished.map(({ orderId, orderNumber, status, cancellationReason }) => ({
        orderId,
        orderNumber,
        status,
        cancellationReason,
      })),
    };
    return NextResponse.json(body, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (!(error instanceof ApiError)) throw error;
    const headers = error.retryAfter ? { "Retry-After": String(error.retryAfter) } : undefined;
    return problemJson(error.problem, error.status, headers);
  }
};
