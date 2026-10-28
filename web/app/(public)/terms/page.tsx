import type { Metadata } from "next";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";
import { restaurant } from "@/lib/restaurant";

export const metadata: Metadata = {
  title: "Terms of service",
  alternates: { canonical: "/terms" },
};

const TermsPage = () => {
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-10 [&_h2]:pt-2 [&_h2]:text-lg [&_h2]:font-semibold [&_p]:text-muted-foreground">
      <h1 className="text-3xl font-semibold tracking-tight">Terms of service</h1>
      <PlaceholderNotice />
      <p>By creating an account or placing an order with {restaurant.name}, you agree to these terms.</p>
      <h2>Orders and prices</h2>
      <p>
        Prices and taxes are calculated when you place an order and shown before you confirm it. Menu items and prices
        may change, but never for an order you have already placed.
      </p>
      <h2>Pickup</h2>
      <p>Orders are for pickup or dine-in at the address on our About page. We don&apos;t deliver yet.</p>
      <h2>Cancellations</h2>
      <p>You can cancel an order while it is still pending. After that, contact us and we&apos;ll do our best to help.</p>
      <h2>Your account</h2>
      <p>
        Keep your password private. You are responsible for orders placed from your account. For security, you are
        signed out after a period of inactivity.
      </p>
      <h2>Contact</h2>
      <p>
        Questions? Call {restaurant.phone} or email{" "}
        <a href={`mailto:${restaurant.email}`} className="text-primary hover:underline">
          {restaurant.email}
        </a>
        .
      </p>
    </article>
  );
};

export default TermsPage;
