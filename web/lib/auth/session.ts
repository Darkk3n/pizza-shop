import "server-only";
import { cookies } from "next/headers";
import type { LoginResponse } from "@/lib/api/schemas/auth";
import { ACCESS_COOKIE, cookieOptions, SESSION_COOKIES, sessionCookieValues } from "./cookies";

export const getAccessToken = async () => (await cookies()).get(ACCESS_COOKIE)?.value ?? null;

// Setting cookies only works in Server Actions and Route Handlers (refresh lives in proxy.ts).
export const setSessionCookies = async (tokens: LoginResponse) => {
  const store = await cookies();
  for (const { name, value } of sessionCookieValues(tokens)) {
    store.set(name, value, cookieOptions);
  }
};

export const clearSessionCookies = async () => {
  const store = await cookies();
  for (const name of SESSION_COOKIES) store.delete(name);
};
