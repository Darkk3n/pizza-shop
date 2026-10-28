import type { Metadata } from "next";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";
import { restaurant } from "@/lib/restaurant";

export const metadata: Metadata = {
  title: "Privacy policy",
  alternates: { canonical: "/privacy" },
};

const PrivacyPage = () => {
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-10 [&_h2]:pt-2 [&_h2]:text-lg [&_h2]:font-semibold [&_p]:text-muted-foreground [&_li]:text-muted-foreground">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy policy</h1>
      <PlaceholderNotice />
      <p>
        This policy explains what {restaurant.name} collects when you use this site and how it is used.
      </p>
      <h2>What we collect</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>Your email address and a password (stored only as a secure hash) when you create an account.</li>
        <li>The orders you place: items, toppings, totals and their status.</li>
        <li>Technical data needed to keep the service secure, such as your IP address for rate limiting.</li>
      </ul>
      <h2>How we use it</h2>
      <p>
        To run your account, prepare and track your orders, send account emails (confirmation and password resets),
        and protect the service from abuse. We don&apos;t sell your data or use it for advertising.
      </p>
      <h2>Cookies</h2>
      <p>
        We use only the cookies needed to keep you signed in. They are httpOnly and expire when your session ends.
      </p>
      <h2>Your choices</h2>
      <p>
        To access or delete your account data, email us at{" "}
        <a href={`mailto:${restaurant.email}`} className="text-primary hover:underline">
          {restaurant.email}
        </a>
        .
      </p>
    </article>
  );
};

export default PrivacyPage;
