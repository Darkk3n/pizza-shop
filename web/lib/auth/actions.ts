"use server";

import { redirect } from "next/navigation";
import { apiFailure, invalidInput, type ActionResult } from "@/lib/helpers/actions";
import { getClientIp } from "@/lib/api/client";
import { callApi, callApiJson } from "@/lib/api/http";
import { ApiError } from "@/lib/api/problem";
import {
  credentialsSchema,
  emailOnlySchema,
  loginResponseSchema,
  registerSchema,
  resetLinkSchema,
  resetPasswordSchema,
  type Credentials,
  type EmailOnlyInput,
  type LoginResponse,
  type RegisterInput,
  type ResetPasswordInput,
} from "@/lib/api/schemas/auth";
import { clearSessionCookies, setSessionCookies } from "./session";

// Only same-site paths, so ?next= can't send someone to another domain after login.
const safeNext = (next: string | undefined) =>
  next && next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/login") ? next : null;

// Signs in, stores the tokens in httpOnly cookies and returns where to go next.
const startSession = async (credentials: Credentials, next: string | undefined) => {
  const clientIp = await getClientIp();
  const tokens: LoginResponse = await callApiJson("/api/auth/login", loginResponseSchema, {
    method: "POST",
    body: credentials,
    clientIp,
  });
  await setSessionCookies(tokens);
  // Everyone's home is /, which shows the dashboard or the customer home page by role.
  return safeNext(next) ?? "/";
};

export const login = async (input: Credentials, next?: string): Promise<ActionResult> => {
  const parsed = credentialsSchema.safeParse(input);
  if (!parsed.success) return invalidInput(parsed.error);

  let destination: string;
  try {
    destination = await startSession(parsed.data, next);
  } catch (error) {
    // Identity answers 401 "NotAllowed" for an unconfirmed account. It checks that before the
    // password, so this says the address has an account; sign-up reveals that too ("Email is
    // already taken"), so it adds nothing an attacker couldn't learn.
    if (error instanceof ApiError && error.status === 401 && error.problem.detail === "NotAllowed") {
      return {
        ok: false,
        code: "EmailNotConfirmed",
        message: "Confirma tu correo antes de iniciar sesión. Te enviamos un enlace cuando te registraste.",
      };
    }
    if (error instanceof ApiError && error.status === 401) {
      return { ok: false, message: "Correo o contraseña incorrectos." };
    }
    return apiFailure(error);
  }
  // Outside the try: redirect() works by throwing.
  redirect(destination);
};

// Identity's own descriptions are English, so each known code gets a Spanish message; the length
// matches the API's Identity default (6) and newPasswordSchema.
const IDENTITY_MESSAGES: Record<string, string> = {
  DuplicateEmail: "Ya existe una cuenta con este correo.",
  DuplicateUserName: "Ya existe una cuenta con este correo.",
  InvalidEmail: "Escribe un correo válido.",
  InvalidUserName: "Escribe un correo válido.",
  PasswordTooShort: "Usa al menos 6 caracteres.",
  PasswordRequiresNonAlphanumeric: "Incluye un símbolo.",
  PasswordRequiresDigit: "Incluye un número.",
  PasswordRequiresLower: "Incluye una letra minúscula.",
  PasswordRequiresUpper: "Incluye una letra mayúscula.",
  PasswordRequiresUniqueChars: "Usa más caracteres distintos.",
};

// Unknown codes still get Spanish text, by field.
const identityMessage = (code: string, field: string | null) =>
  IDENTITY_MESSAGES[code] ??
  (field === "password" ? "Elige otra contraseña." : field === "email" ? "Revisa el correo." : "No se pudo completar la solicitud.");

// Identity reports problems as codes ("DuplicateEmail", "PasswordTooShort"), not field paths.
const identityFieldFor = (code: string) =>
  code.includes("Password") ? "password" : code.includes("Email") || code.includes("UserName") ? "email" : null;

// Turns Identity's error codes ("DuplicateEmail", "PasswordTooShort", "InvalidToken") into form errors.
const identityFailure = (error: ApiError) => {
  const fieldErrors: Record<string, string> = {};
  const other: string[] = [];
  // Email codes first, so a duplicate account reports DuplicateEmail rather than DuplicateUserName.
  const codes = Object.keys(error.problem.errors ?? {}).sort((a, b) => Number(b.includes("Email")) - Number(a.includes("Email")));
  for (const code of codes) {
    const field = identityFieldFor(code);
    const message = identityMessage(code, field);
    // One message per field: the email is also the username, so a duplicate reports both.
    if (field) fieldErrors[field] ??= message;
    else if (!other.includes(message)) other.push(message);
  }
  return { ok: false as const, fieldErrors, message: other.length > 0 ? other.join(" ") : undefined };
};

// Accounts must confirm their email before they can sign in, so registering doesn't start a
// session: the form switches to "check your inbox" (with a resend button).
export const register = async (input: RegisterInput): Promise<ActionResult<{ email: string }>> => {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) return invalidInput(parsed.error);
  const credentials = { email: parsed.data.email, password: parsed.data.password };

  try {
    await callApi("/api/auth/register", { method: "POST", body: credentials, clientIp: await getClientIp() });
  } catch (error) {
    if (error instanceof ApiError && error.status === 400 && error.problem.errors) return identityFailure(error);
    return apiFailure(error);
  }
  return { ok: true, email: credentials.email };
};

// Both endpoints answer 200 for any address (no account enumeration), so "ok" only means the
// request was accepted; the email goes out only if there's an account it applies to.
const postEmailOnly = async (path: string, input: EmailOnlyInput): Promise<ActionResult> => {
  const parsed = emailOnlySchema.safeParse(input);
  if (!parsed.success) return invalidInput(parsed.error);
  try {
    await callApi(path, { method: "POST", body: parsed.data, clientIp: await getClientIp() });
  } catch (error) {
    return apiFailure(error);
  }
  return { ok: true };
};

export const resendConfirmation = async (input: EmailOnlyInput) => postEmailOnly("/api/auth/resendConfirmationEmail", input);

export const requestPasswordReset = async (input: EmailOnlyInput) => postEmailOnly("/api/auth/forgotPassword", input);

// The email and code come from the reset link (/reset-password?email=&code=), the password from the form.
export const resetPassword = async (email: string, code: string, input: ResetPasswordInput): Promise<ActionResult> => {
  const link = resetLinkSchema.safeParse({ email, code });
  const parsed = resetPasswordSchema.safeParse(input);
  if (!link.success) return { ok: false, code: "InvalidLink", message: "Este enlace para restablecer la contraseña está incompleto. Pide uno nuevo." };
  if (!parsed.success) return invalidInput(parsed.error);

  try {
    await callApi("/api/auth/resetPassword", {
      method: "POST",
      body: { email: link.data.email, resetCode: link.data.code, newPassword: parsed.data.password },
      clientIp: await getClientIp(),
    });
  } catch (error) {
    // Identity reports an expired, used or wrong code (or an unknown email) as InvalidToken.
    if (error instanceof ApiError && error.status === 400 && error.problem.errors?.InvalidToken) {
      return { ok: false, code: "InvalidLink", message: "Este enlace para restablecer la contraseña venció o ya se usó. Pide uno nuevo." };
    }
    if (error instanceof ApiError && error.status === 400 && error.problem.errors) return identityFailure(error);
    return apiFailure(error);
  }
  return { ok: true };
};

// Bearer tokens have no server-side logout in Identity; dropping the cookies ends the session here,
// and the access token expires on its own within 15 minutes.
export const logout = async () => {
  await clearSessionCookies();
  // Back to /, which proxy.ts rewrites to the public landing page for signed-out visitors.
  redirect("/");
};
