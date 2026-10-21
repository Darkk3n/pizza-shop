import type { LoginResponse } from "@/lib/api/schemas/auth";

// Shared by proxy.ts (NextRequest/NextResponse cookies) and lib/auth/session.ts (next/headers).
// The tokens live only in httpOnly cookies, so browser JavaScript never sees them.
export const ACCESS_COOKIE = "ps_access";
export const REFRESH_COOKIE = "ps_refresh";
// Epoch ms when the access token expires, so proxy.ts can refresh it shortly before.
export const ACCESS_EXPIRES_COOKIE = "ps_access_exp";

export const SESSION_COOKIES = [ACCESS_COOKIE, REFRESH_COOKIE, ACCESS_EXPIRES_COOKIE] as const;

// Session cookies (no maxAge): the API decides when the refresh token stops working.
export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
} as const;

export const sessionCookieValues = (tokens: LoginResponse, now = Date.now()) => [
  { name: ACCESS_COOKIE, value: tokens.accessToken },
  { name: REFRESH_COOKIE, value: tokens.refreshToken },
  { name: ACCESS_EXPIRES_COOKIE, value: String(now + tokens.expiresIn * 1000) },
];
