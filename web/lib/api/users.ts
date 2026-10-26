import "server-only";
import { apiJson } from "@/lib/api/client";
import { userPageSchema } from "@/lib/api/schemas/users";

export const USERS_PAGE_SIZE = 20;

// GET /api/users (admin): by email; `email` matches anywhere in the address, ignoring case.
export const listUsers = async ({ email, page }: { email?: string; page: number }) => {
  const query = new URLSearchParams({ page: String(page), pageSize: String(USERS_PAGE_SIZE) });
  if (email) query.set("email", email);
  return apiJson(`/api/users?${query}`, userPageSchema);
};
