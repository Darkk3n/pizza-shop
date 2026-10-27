import { z } from "zod";
import { ApiError, describeApiError, toFieldErrors } from "@/lib/api/problem";

// What a Server Action hands back to its form (plus any data on success, e.g. a new id).
// Redirects throw instead of returning.
// `code` names a failure the form handles specially (e.g. "EmailNotConfirmed" offers a resend).
export type ActionFailure = {
  ok: false;
  message?: string;
  fieldErrors?: Record<string, string>;
  status?: number;
  code?: string;
};
export type ActionResult<T extends object = Record<never, never>> = ({ ok: true } & T) | ActionFailure;

// First message per field, matching what the client-side resolver shows.
export const invalidInput = (error: z.ZodError): ActionFailure => {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) fieldErrors[issue.path.join(".")] ??= issue.message;
  return { ok: false, fieldErrors };
};

// Turns an API failure into something a form can show; anything else is a bug and rethrows.
export const apiFailure = (error: unknown): ActionFailure => {
  if (!(error instanceof ApiError)) throw error;

  const fieldErrors = toFieldErrors(error.problem.errors);
  return {
    ok: false,
    status: error.status,
    message: Object.keys(fieldErrors).length > 0 ? undefined : describeApiError(error),
    fieldErrors,
  };
};
