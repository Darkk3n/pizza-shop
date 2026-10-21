import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getCurrentUser, homePathFor } from "@/lib/auth/currentUser";

// Customers have no dashboard; send them to their home screen.
const CustomerRedirect = async () => {
  const user = await getCurrentUser();
  if (user && !user.isStaff) redirect(homePathFor(user));
  return null;
};

const Home = () => {
  return (
    <div className="flex flex-col gap-2">
      <Suspense>
        <CustomerRedirect />
      </Suspense>
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Orders, inventory, and sales at a glance.
      </p>
    </div>
  );
};

export default Home;
