import { z } from "zod";

// Every API error is RFC 9457 Problem Details; `errors` is only present on validation (400) problems.
export const problemSchema = z.object({
  type: z.string().optional(),
  title: z.string().optional(),
  status: z.number().optional(),
  detail: z.string().optional(),
  errors: z.record(z.string(), z.array(z.string())).optional(),
});

export type Problem = z.infer<typeof problemSchema>;

export class ApiError extends Error {
  readonly status: number;
  readonly problem: Problem;
  // Seconds from the Retry-After header on 429 responses.
  readonly retryAfter: number | null;

  constructor(status: number, problem: Problem, retryAfter: number | null) {
    super(problem.detail ?? problem.title ?? `API request failed with ${status}.`);
    this.name = "ApiError";
    this.status = status;
    this.problem = problem;
    this.retryAfter = retryAfter;
  }
}

export const readApiError = async (response: Response) => {
  const retryAfterHeader = response.headers.get("retry-after");
  const retryAfter = retryAfterHeader ? Number.parseInt(retryAfterHeader, 10) : null;

  let problem: Problem = { status: response.status };
  try {
    const parsed = problemSchema.safeParse(await response.json());
    if (parsed.success) problem = parsed.data;
  } catch {
    // Empty or non-JSON body: keep the status-only problem.
  }
  return new ApiError(response.status, problem, Number.isNaN(retryAfter) ? null : retryAfter);
};

const lowerFirst = (segment: string) => segment.charAt(0).toLowerCase() + segment.slice(1);

// API validation keys are PascalCase with indexers ("Items[0].Toppings[1].IngredientId");
// React Hook Form paths are camelCase with dots ("items.0.toppings.1.ingredientId").
export const toFieldPath = (key: string) =>
  key.replace(/\[(\d+)\]/g, ".$1").split(".").map(lowerFirst).join(".");

export const toFieldErrors = (errors: Problem["errors"]) =>
  Object.fromEntries(
    Object.entries(errors ?? {}).map(([key, messages]) => [toFieldPath(key), messages.join(" ")]),
  );

// A user-facing sentence for errors that aren't tied to a field.
export const describeApiError = (error: ApiError) => {
  if (error.status === 429) {
    return error.retryAfter
      ? `Demasiados intentos. Intenta de nuevo en ${error.retryAfter} segundos.`
      : "Demasiados intentos. Intenta de nuevo en un momento.";
  }
  if (error.status === 401) return "Tu sesión terminó. Vuelve a iniciar sesión.";
  if (error.status === 403) return "No tienes permiso para hacer eso.";
  if (error.status === 404) return "Ese elemento ya no existe.";
  if (error.status >= 500) return "Algo salió mal de nuestro lado. Intenta de nuevo.";
  return error.problem.detail ?? error.problem.title ?? "No se pudo completar la solicitud.";
};
