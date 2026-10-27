import { NextResponse, type NextRequest } from "next/server";
import { getOrderFeed } from "@/lib/api/orders";
import { ApiError } from "@/lib/api/problem";
import { orderFeedQuerySchema } from "@/lib/api/schemas/orders";

const problemJson = (body: object, status: number, headers?: HeadersInit) =>
  NextResponse.json(body, { status, headers: { "Content-Type": "application/problem+json", ...headers } });

// BFF for components/orders/OrderFeed.tsx, polled every few seconds by staff screens. Going through
// proxy.ts like any request, each poll also refreshes the staff member's tokens, so an open staff
// screen stays signed in. Customers never poll, so their 30-minute idle timeout is unchanged.
export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const parsed = orderFeedQuerySchema.safeParse({
    after: searchParams.get("after") ?? undefined,
    cancelledAfter: searchParams.get("cancelledAfter") ?? undefined,
  });
  if (!parsed.success) {
    return problemJson({ title: "Invalid feed cursor.", status: 400 }, 400);
  }

  try {
    return NextResponse.json(await getOrderFeed(parsed.data), { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (!(error instanceof ApiError)) throw error;
    // Pass the API's Problem Details through (401 session ended, 403 not staff, 429 rate limited).
    const headers = error.retryAfter ? { "Retry-After": String(error.retryAfter) } : undefined;
    return problemJson(error.problem, error.status, headers);
  }
};
