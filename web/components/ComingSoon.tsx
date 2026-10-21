import { Suspense, type ReactNode } from "react";

type ComingSoonProps = {
  title: string;
  description: string;
  // A server component that calls requireStaff()/requireAdmin(), so the page is gated already.
  guard?: ReactNode;
};

// Placeholder for screens on the roadmap, so nav links don't 404.
export const ComingSoon = ({ title, description, guard }: ComingSoonProps) => {
  return (
    <div className="flex flex-col gap-2">
      {guard && <Suspense>{guard}</Suspense>}
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
      <p className="mt-4 text-sm text-muted-foreground">Coming soon.</p>
    </div>
  );
};
