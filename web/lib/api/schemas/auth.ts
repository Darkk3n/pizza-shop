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

export const credentialsSchema = z.object({
  email: z.email("Enter a valid email address.").trim(),
  password: z.string().min(1, "Enter your password."),
});

export type Credentials = z.infer<typeof credentialsSchema>;

// Mirrors the API's Identity password rules (defaults): 6+ chars, upper, lower, digit, symbol.
export const registerSchema = z
  .object({
    email: z.email("Enter a valid email address.").trim(),
    password: z
      .string()
      .min(6, "Use at least 6 characters.")
      .regex(/[A-Z]/, "Include an uppercase letter.")
      .regex(/[a-z]/, "Include a lowercase letter.")
      .regex(/\d/, "Include a number.")
      .regex(/[^A-Za-z0-9]/, "Include a symbol."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
