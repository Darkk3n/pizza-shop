import type { Metadata } from "next";
import { ClockIcon, MapPinIcon, PizzaIcon, ShoppingBagIcon, SlidersHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { PopularPizzas, RecipeGridSkeleton } from "@/components/public/MenuSections";
import { OpeningHoursList } from "@/components/public/OpeningHoursList";
import { buttonVariants } from "@/components/ui/button";
import { formatAddress, restaurant } from "@/lib/restaurant";

export const metadata: Metadata = {
  title: { absolute: `${restaurant.name} · Order pizza online` },
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

const STEPS = [
  {
    icon: PizzaIcon,
    title: "Pick a pizza",
    text: "Start from one of our recipes in the size you want.",
  },
  {
    icon: SlidersHorizontalIcon,
    title: "Make it yours",
    text: "Add toppings to the whole pizza or just one half, light or extra.",
  },
  {
    icon: ShoppingBagIcon,
    title: "Track it live",
    text: "Watch your order go from the oven to ready, then pick it up.",
  },
];

// Shown at / to signed-out visitors (proxy.ts rewrites to this route).
const WelcomePage = () => {
  return (
    <div className="flex flex-col">
      <section className="border-b bg-gradient-to-b from-primary/10 to-background">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{restaurant.tagline}</h1>
            <p className="max-w-xl text-lg text-muted-foreground text-pretty">{restaurant.description}</p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/register" className={buttonVariants({ size: "lg" })}>
                Order online
              </Link>
              <Link href="/menu" className={buttonVariants({ variant: "outline", size: "lg" })}>
                See the menu
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
          <div className="flex flex-col gap-5 rounded-2xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 font-semibold">
              <ClockIcon className="size-4 text-primary" aria-hidden="true" />
              Opening hours
            </div>
            <OpeningHoursList />
            <div className="flex items-start gap-2 border-t pt-4 text-sm">
              <MapPinIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <a href={restaurant.mapUrl} className="hover:underline" target="_blank" rel="noreferrer">
                {formatAddress()}
              </a>
            </div>
            <p className="text-sm text-muted-foreground">{restaurant.serviceModes.join(" · ")}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-16">
        <Suspense fallback={<RecipeGridSkeleton count={4} />}>
          <PopularPizzas />
        </Suspense>

        <section aria-labelledby="how-it-works" className="flex flex-col gap-6">
          <h2 id="how-it-works" className="text-2xl font-semibold tracking-tight">
            How it works
          </h2>
          <ol className="grid gap-4 sm:grid-cols-3">
            {STEPS.map((step, index) => (
              <li key={step.title} className="flex flex-col gap-3 rounded-xl border p-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <step.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">Step {index + 1}</span>
                </div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="flex flex-col items-start gap-4 rounded-2xl bg-primary px-6 py-10 text-primary-foreground sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold tracking-tight">Hungry already?</h2>
            <p className="text-primary-foreground/85">Create a free account and place your first order in minutes.</p>
          </div>
          <Link href="/register" className={buttonVariants({ variant: "secondary", size: "lg" })}>
            Create an account
          </Link>
        </section>
      </div>
    </div>
  );
};

export default WelcomePage;
