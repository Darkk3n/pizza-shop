import "server-only";
import { getClientIp } from "@/lib/api/client";
import { callApi } from "@/lib/api/http";
import { ApiError } from "@/lib/api/problem";
import { confirmLinkSchema } from "@/lib/api/schemas/auth";

export type ConfirmationResult = "confirmed" | "invalid" | "rate-limited";

// The emailed link opens /confirm-email in the web app, which forwards its query to the API's
// GET /api/auth/confirmEmail. Identity answers 401 for a wrong, expired or already-replaced code.
export const confirmEmail = async (params: Record<string, string | string[] | undefined>): Promise<ConfirmationResult> => {
  const link = confirmLinkSchema.safeParse(params);
  if (!link.success) return "invalid";

  const query = new URLSearchParams({ userId: link.data.userId, code: link.data.code });
  if (link.data.changedEmail) query.set("changedEmail", link.data.changedEmail);
  try {
    await callApi(`/api/auth/confirmEmail?${query}`, { clientIp: await getClientIp() });
    return "confirmed";
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) return "invalid";
    if (error instanceof ApiError && error.status === 429) return "rate-limited";
    throw error;
  }
};
