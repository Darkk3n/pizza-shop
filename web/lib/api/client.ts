import "server-only";
import { headers } from "next/headers";
import { connection } from "next/server";
import type { z } from "zod";
import { getAccessToken } from "@/lib/auth/session";
import { callApi, callApiJson, type CallApiOptions } from "./http";

type ApiFetchOptions = Omit<CallApiOptions, "accessToken" | "clientIp">;

// The browser's IP as Next.js received it (first X-Forwarded-For hop, or X-Real-IP).
export const getClientIp = async () => {
  const requestHeaders = await headers();
  const forwarded = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || requestHeaders.get("x-real-ip");
};

const withSession = async (options?: ApiFetchOptions): Promise<CallApiOptions> => {
  // API calls are per-user and uncached, so they only run at request time. Without this, the
  // dev prerender with real cookies (partialPrefetching) reaches the fetch and Next flags the
  // Date.now() read inside it ("encountered the unstable value Date.now() while prerendering").
  await connection();
  return { ...options, accessToken: await getAccessToken(), clientIp: await getClientIp() };
};

// For Server Components and Server Actions: sends the signed-in user's token and IP.
export const apiFetch = async (path: string, options?: ApiFetchOptions) =>
  callApi(path, await withSession(options));

export const apiJson = async <T extends z.ZodType>(path: string, schema: T, options?: ApiFetchOptions) =>
  callApiJson(path, schema, await withSession(options));
