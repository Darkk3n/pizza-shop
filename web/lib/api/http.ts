import type { z } from "zod";
import { readApiError } from "./problem";

// Low-level API call with no Next.js request APIs, so proxy.ts can use it too.
// Server code should use apiFetch (lib/api/client.ts), which adds the session token.

export type CallApiOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  accessToken?: string | null;
  // The browser's IP, forwarded so the API's per-IP rate limits apply per customer.
  clientIp?: string | null;
  headers?: Record<string, string>;
};

const apiBaseUrl = () => {
  const url = process.env.API_BASE_URL;
  if (!url) throw new Error("API_BASE_URL is not set (see web/.env.example).");
  return url.replace(/\/$/, "");
};

export const callApi = async (path: string, options: CallApiOptions = {}) => {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  if (options.body !== undefined) headers.set("Content-Type", "application/json");
  if (options.accessToken) headers.set("Authorization", `Bearer ${options.accessToken}`);
  if (options.clientIp) headers.set("X-Forwarded-For", options.clientIp);

  const response = await fetch(`${apiBaseUrl()}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    cache: "no-store",
  });

  if (!response.ok) throw await readApiError(response);
  return response;
};

// Parses the body with a Zod schema, so a contract drift fails loudly here instead of in the UI.
export const callApiJson = async <T extends z.ZodType>(
  path: string,
  schema: T,
  options?: CallApiOptions,
): Promise<z.infer<T>> => {
  const response = await callApi(path, options);
  return schema.parse(await response.json());
};
