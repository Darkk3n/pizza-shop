import { z } from "zod";
import { pagedSchema } from "@/lib/api/schemas/orders";

// GET /api/users (admin). Roles is empty for customers; Admin passes the Staff policy too.
export const userSchema = z.object({
  userId: z.uuid(),
  email: z.string().nullable(),
  roles: z.array(z.string()),
});

export type User = z.infer<typeof userSchema>;

export const userPageSchema = pagedSchema(userSchema);

// The one role a user is shown with. Customer isn't stored: it's having no role.
export const userRoleSchema = z.enum(["Customer", "Staff", "Admin"]);
export type UserRole = z.infer<typeof userRoleSchema>;

export const roleOf = (user: Pick<User, "roles">): UserRole =>
  user.roles.includes("Admin") ? "Admin" : user.roles.includes("Staff") ? "Staff" : "Customer";

// PUT /api/users/{id}/roles replaces every role. Admin alone is enough (it passes Staff).
export const rolesFor = (role: UserRole) => (role === "Customer" ? [] : [role]);

// Query string for /users; invalid values fall back to defaults instead of erroring.
export const userListQuerySchema = z.object({
  email: z.string().trim().max(256).optional().catch(undefined),
  page: z.coerce.number().int().min(1).max(100000).catch(1),
});
