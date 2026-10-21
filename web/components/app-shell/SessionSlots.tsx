import { getCurrentUser } from "@/lib/auth/currentUser";
import { navKeysFor } from "@/lib/helpers/navigation";
import { NavLinks } from "./NavLinks";
import { UserMenu } from "./UserMenu";

// Server Components for AppShell's slots. Each reads the session, so each sits behind its own
// <Suspense> in app/(app)/layout.tsx; getCurrentUser is cached per request, so /me is called once.

export const RoleNav = async () => {
  const user = await getCurrentUser();
  return user ? <NavLinks keys={navKeysFor(user)} /> : null;
};

export const SessionUserMenu = async () => {
  const user = await getCurrentUser();
  if (!user) return null;
  const roleLabel = user.isAdmin ? "Admin" : user.isStaff ? "Staff" : "Customer";
  return <UserMenu email={user.email} roleLabel={roleLabel} />;
};
