import { z } from "zod";

// POST /api/auth/login and /api/auth/refresh (ASP.NET Identity bearer tokens, opaque strings).
export const loginResponseSchema = z.object({
  tokenType: z.literal("Bearer"),
  accessToken: z.string().min(1),
  expiresIn: z.number().int().positive(),
  refreshToken: z.string().min(1),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;

// GET /api/auth/me: roles come from the token, so they match what the API enforces.
export const currentUserSchema = z.object({
  email: z.string().nullable(),
  roles: z.array(z.string()),
});

const emailSchema = z.email("Escribe un correo válido.").trim();

export const credentialsSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Escribe tu contraseña."),
});

export type Credentials = z.infer<typeof credentialsSchema>;

// Mirrors the API's Identity password rules (defaults): 6+ chars, upper, lower, digit, symbol.
const newPasswordSchema = z
  .string()
  .min(6, "Usa al menos 6 caracteres.")
  .regex(/[A-Z]/, "Incluye una letra mayúscula.")
  .regex(/[a-z]/, "Incluye una letra minúscula.")
  .regex(/\d/, "Incluye un número.")
  .regex(/[^A-Za-z0-9]/, "Incluye un símbolo.");

export const PASSWORD_HINT = "Al menos 6 caracteres, con mayúsculas y minúsculas, un número y un símbolo.";

const passwordsMatch = (data: { password: string; confirmPassword: string }) => data.password === data.confirmPassword;
const mismatch = { message: "Las contraseñas no coinciden.", path: ["confirmPassword"] };

export const registerSchema = z
  .object({ email: emailSchema, password: newPasswordSchema, confirmPassword: z.string() })
  .refine(passwordsMatch, mismatch);

export type RegisterInput = z.infer<typeof registerSchema>;

// POST /api/auth/forgotPassword and /resendConfirmationEmail: both answer 200 for any address,
// so the UI never learns (or reveals) whether an account exists.
export const emailOnlySchema = z.object({ email: emailSchema });

export type EmailOnlyInput = z.infer<typeof emailOnlySchema>;

// /reset-password: the email and code come from the emailed link, the password from the form.
export const resetPasswordSchema = z
  .object({ password: newPasswordSchema, confirmPassword: z.string() })
  .refine(passwordsMatch, mismatch);

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const resetLinkSchema = z.object({ email: emailSchema, code: z.string().min(1) });

// /confirm-email?userId=&code=[&changedEmail=]: forwarded as is to GET /api/auth/confirmEmail.
export const confirmLinkSchema = z.object({
  userId: z.uuid(),
  code: z.string().min(1),
  changedEmail: z.string().optional(),
});
