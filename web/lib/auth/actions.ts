"use server";

import { redirect } from "next/navigation";
import { apiFailure, invalidInput, type ActionResult } from "@/lib/helpers/actions";
import { getClientIp } from "@/lib/api/client";
import { callApi, callApiJson } from "@/lib/api/http";
import { ApiError } from "@/lib/api/problem";
import {
  credentialsSchema,
  currentUserSchema,
  loginResponseSchema,
  registerSchema,
  type Credentials,
  type LoginResponse,
  type RegisterInput,
} from "@/lib/api/schemas/auth";
import { homePathFor } from "./currentUser";
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

  const me = await callApiJson("/api/auth/me", currentUserSchema, { accessToken: tokens.accessToken, clientIp });
  const isStaff = me.roles.includes("Admin") || me.roles.includes("Staff");
  return safeNext(next) ?? homePathFor({ isStaff });
};

export const login = async (input: Credentials, next?: string): Promise<ActionResult> => {
  const parsed = credentialsSchema.safeParse(input);
  if (!parsed.success) return invalidInput(parsed.error);

  let destination: string;
  try {
    destination = await startSession(parsed.data, next);
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return { ok: false, message: "Incorrect email or password." };
    }
    return apiFailure(error);
  }
  // Outside the try: redirect() works by throwing.
  redirect(destination);
};

// Identity reports problems as codes ("DuplicateEmail", "PasswordTooShort"), not field paths.
const identityFieldFor = (code: string) =>
  code.includes("Password") ? "password" : code.includes("Email") || code.includes("UserName") ? "email" : null;

export const register = async (input: RegisterInput, next?: string): Promise<ActionResult> => {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) return invalidInput(parsed.error);
  const credentials = { email: parsed.data.email, password: parsed.data.password };

  try {
    await callApi("/api/auth/register", { method: "POST", body: credentials, clientIp: await getClientIp() });
  } catch (error) {
    if (error instanceof ApiError && error.status === 400 && error.problem.errors) {
      const fieldErrors: Record<string, string> = {};
      const other: string[] = [];
      // Email codes first, so a duplicate reads "Email ... is already taken", not "Username ...".
      const entries = Object.entries(error.problem.errors).sort(([a], [b]) => Number(b.includes("Email")) - Number(a.includes("Email")));
      for (const [code, messages] of entries) {
        const field = identityFieldFor(code);
        // One message per field: the email is also the username, so a duplicate reports both.
        if (field) fieldErrors[field] ??= messages[0];
        else other.push(...messages);
      }
      return { ok: false, fieldErrors, message: other.length > 0 ? other.join(" ") : undefined };
    }
    return apiFailure(error);
  }

  let destination: string;
  try {
    destination = await startSession(credentials, next);
  } catch (error) {
    return apiFailure(error);
  }
  redirect(destination);
};

// Bearer tokens have no server-side logout in Identity; dropping the cookies ends the session here,
// and the access token expires on its own within 15 minutes.
export const logout = async () => {
  await clearSessionCookies();
  redirect("/login");
};
