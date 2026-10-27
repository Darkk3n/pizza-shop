import "server-only";
import { forbidden, redirect } from "next/navigation";
import { cache } from "react";
import { apiJson } from "@/lib/api/client";
import { ApiError } from "@/lib/api/problem";
import { currentUserSchema } from "@/lib/api/schemas/auth";
import { getAccessToken } from "./session";

export type CurrentUser = {
  email: string;
  roles: string[];
  isAdmin: boolean;
  // Admins pass the Staff policy too (api/Auth/Policies.cs).
  isStaff: boolean;
};

// Once per request (React cache), from the token's claims via /api/auth/me. This only picks which
// UI to show; the API enforces every rule itself. Null when signed out or the token is rejected.
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  if (!(await getAccessToken())) return null;

  try {
    const me = await apiJson("/api/auth/me", currentUserSchema);
    const isAdmin = me.roles.includes("Admin");
    return {
      email: me.email ?? "",
      roles: me.roles,
      isAdmin,
      isStaff: isAdmin || me.roles.includes("Staff"),
    };
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) return null;
    throw error;
  }
});

// proxy.ts already sends signed-out visitors to /login; this covers a token the API rejects.
export const requireUser = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
};

export const requireStaff = async () => {
  const user = await requireUser();
  if (!user.isStaff) forbidden();
  return user;
};

export const requireAdmin = async () => {
  const user = await requireUser();
  if (!user.isAdmin) forbidden();
  return user;
};
