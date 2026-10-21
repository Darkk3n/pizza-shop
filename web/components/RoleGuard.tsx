import { requireAdmin, requireStaff } from "@/lib/auth/currentUser";

// Render inside <Suspense>: they read the session, then render nothing or throw forbidden().
export const StaffOnly = async () => {
  await requireStaff();
  return null;
};

export const AdminOnly = async () => {
  await requireAdmin();
  return null;
};
