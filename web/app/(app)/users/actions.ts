"use server";

import { refresh } from "next/cache";
import { z } from "zod";
import { apiFailure, invalidInput, type ActionResult } from "@/lib/helpers/actions";
import { apiFetch } from "@/lib/api/client";
import { rolesFor, userRoleSchema, type UserRole } from "@/lib/api/schemas/users";
import { requireAdmin } from "@/lib/auth/currentUser";

const userIdSchema = z.uuid();

// Server Actions are public endpoints: check the caller here too, not only on the page.
// 409 = this would remove the last admin. The user's own token picks up the change on its next
// refresh (within one access-token lifetime, 15 minutes).
export const updateUserRole = async (userId: string, role: UserRole): Promise<ActionResult> => {
  await requireAdmin();
  const id = userIdSchema.safeParse(userId);
  const parsed = userRoleSchema.safeParse(role);
  if (!id.success) return invalidInput(id.error);
  if (!parsed.success) return invalidInput(parsed.error);

  try {
    await apiFetch(`/api/users/${id.data}/roles`, { method: "PUT", body: { roles: rolesFor(parsed.data) } });
  } catch (error) {
    return apiFailure(error);
  }
  refresh();
  return { ok: true };
};
