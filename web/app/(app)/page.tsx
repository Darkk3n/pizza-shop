import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ActiveOrdersBoard, ActiveOrdersBoardSkeleton } from "@/components/dashboard/ActiveOrdersBoard";
import { buttonVariants } from "@/components/ui/button";
import { homePathFor, requireUser } from "@/lib/auth/currentUser";

export const metadata: Metadata = { title: "Dashboard · Pizza Shop POS" };

// Staff and admins land here. Customers have no dashboard yet; send them to their home screen
// before anything staff-only renders.
const StaffDashboard = async () => {
  const user = await requireUser();
  if (!user.isStaff) redirect(homePathFor(user));

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Active orders, oldest first.</p>
        </div>
        <Link href="/orders" className={buttonVariants({ variant: "outline", size: "sm" })}>
          All orders
        </Link>
      </div>
      <Suspense fallback={<ActiveOrdersBoardSkeleton />}>
        <ActiveOrdersBoard />
      </Suspense>
    </>
  );
};

const Home = () => {
  return (
    <div className="flex flex-col gap-6">
      <Suspense fallback={<ActiveOrdersBoardSkeleton />}>
        <StaffDashboard />
      </Suspense>
    </div>
  );
};

export default Home;
