import type { CurrentUser } from "@/lib/auth/currentUser";

// Which screens each role sees. The UI only hides links; the API (and each page's
// requireStaff/requireAdmin) enforces access.
export type NavKey = "dashboard" | "home" | "menu" | "myOrders" | "orders" | "inventory" | "recipes" | "analytics" | "users";

const CUSTOMER: NavKey[] = ["home", "menu", "myOrders"];
const STAFF: NavKey[] = ["dashboard", "orders", "inventory"];
const ADMIN: NavKey[] = [...STAFF, "recipes", "analytics", "users"];

export const navKeysFor = (user: Pick<CurrentUser, "isAdmin" | "isStaff">) =>
  user.isAdmin ? ADMIN : user.isStaff ? STAFF : CUSTOMER;
