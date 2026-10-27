import { NextResponse, type NextRequest } from "next/server";
import { ApiError } from "@/lib/api/problem";
import { callApiJson } from "@/lib/api/http";
import { loginResponseSchema } from "@/lib/api/schemas/auth";
import {
  ACCESS_COOKIE,
  ACCESS_EXPIRES_COOKIE,
  cookieOptions,
  REFRESH_COOKIE,
  SESSION_COOKIES,
  sessionCookieValues,
} from "@/lib/auth/cookies";

// Pages reachable without a session. Everything else needs one (the API agrees: only Identity's
// sign-in endpoints are anonymous). The last three are opened from emailed links.
const PUBLIC_PATHS = ["/login", "/register", "/forgot-password", "/reset-password", "/confirm-email"];

// Refresh this long before the access token expires, so a request never reaches the API with a dying token.
const REFRESH_WINDOW_MS = 60_000;

// Background polls that must not count as activity: the customer home page checks its orders in
// progress, and refreshing the session there would keep an idle customer signed in forever (rule 4).
// They run while the access token is valid; after that they get a 401 that keeps the cookies, so the
// next real navigation can still refresh within the 30 idle minutes. (Staff polls use
// /api/orders/feed, which does refresh: an open staff screen stays signed in on purpose.)
const PASSIVE_PATHS = ["/api/orders/active"];

const toLogin = (request: NextRequest) => {
  let response: NextResponse;
  if (request.nextUrl.pathname.startsWith("/api/")) {
    // Route Handlers are called by fetch(), which would follow a redirect to the login HTML.
    response = NextResponse.json(
      { title: "Your session has ended.", status: 401 },
      { status: 401, headers: { "Content-Type": "application/problem+json" } },
    );
  } else {
    const url = new URL("/login", request.url);
    const next = `${request.nextUrl.pathname}${request.nextUrl.search}`;
    if (next !== "/") url.searchParams.set("next", next);
    response = NextResponse.redirect(url);
  }
  for (const name of SESSION_COOKIES) response.cookies.delete(name);
  return response;
};

const clientIp = (request: NextRequest) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip");

// Optimistic check only: it looks at cookies, not at roles. Pages and Server Actions verify the user
// themselves (lib/auth/currentUser.ts), since a matcher change could silently skip this file.
export const proxy = async (request: NextRequest) => {
  if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) return NextResponse.next();

  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;
  if (!refreshToken) return toLogin(request);

  const expiresAt = Number(request.cookies.get(ACCESS_EXPIRES_COOKIE)?.value);
  const hasAccess = request.cookies.has(ACCESS_COOKIE);
  if (PASSIVE_PATHS.includes(request.nextUrl.pathname)) {
    return hasAccess && Number.isFinite(expiresAt) && expiresAt > Date.now()
      ? NextResponse.next()
      : NextResponse.json(
          { title: "Paused until you're active again.", status: 401 },
          { status: 401, headers: { "Content-Type": "application/problem+json" } },
        );
  }
  if (hasAccess && Number.isFinite(expiresAt) && expiresAt - Date.now() > REFRESH_WINDOW_MS) {
    return NextResponse.next();
  }

  try {
    // Each refresh returns a new refresh token, so 30 idle minutes (not 30 total) end the session.
    // Identity doesn't invalidate the old refresh token, so parallel refreshes (prefetches) are harmless.
    const tokens = await callApiJson("/api/auth/refresh", loginResponseSchema, {
      method: "POST",
      body: { refreshToken },
      clientIp: clientIp(request),
    });
    const values = sessionCookieValues(tokens);

    // Rewrite the request cookies too, so Server Components in this same request read the new token.
    for (const { name, value } of values) request.cookies.set(name, value);
    const response = NextResponse.next({ request: { headers: request.headers } });
    for (const { name, value } of values) response.cookies.set(name, value, cookieOptions);
    return response;
  } catch (error) {
    // Expired or revoked refresh token: the session is over.
    if (error instanceof ApiError && (error.status === 401 || error.status === 400)) return toLogin(request);
    // API down or rate limited: let the page render and show its own error rather than logging out.
    return NextResponse.next();
  }
};

export const config = {
  // Skip Next.js internals and static files.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
