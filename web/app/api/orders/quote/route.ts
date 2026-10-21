import { NextResponse, type NextRequest } from "next/server";
import { quoteItems } from "@/lib/api/menu";
import { ApiError } from "@/lib/api/problem";
import { quoteRequestSchema } from "@/lib/api/schemas/orders";

const problemJson = (body: object, status: number, headers?: HeadersInit) =>
  NextResponse.json(body, { status, headers: { "Content-Type": "application/problem+json", ...headers } });

// BFF for the pizza builder's live price. A Route Handler rather than a Server Action: React runs
// Server Actions one at a time, while the builder needs to abort stale quotes as the user changes it.
export const POST = async (request: NextRequest) => {
  const parsed = quoteRequestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return problemJson({ title: "Invalid quote request.", status: 400 }, 400);
  }

  try {
    return NextResponse.json(await quoteItems(parsed.data.items));
  } catch (error) {
    if (!(error instanceof ApiError)) throw error;
    // Pass the API's Problem Details through (400 validation, 401 session ended, 429 rate limited).
    const headers = error.retryAfter ? { "Retry-After": String(error.retryAfter) } : undefined;
    return problemJson(error.problem, error.status, headers);
  }
};
