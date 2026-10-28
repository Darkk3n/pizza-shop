import type { Metadata } from "next";
import Link from "next/link";
import { OpeningHoursList } from "@/components/public/OpeningHoursList";
import { buttonVariants } from "@/components/ui/button";
import { formatAddress, restaurant } from "@/lib/restaurant";

export const metadata: Metadata = {
  title: "About & FAQ",
  description: `Hours, location and answers to common questions about ordering from ${restaurant.name}.`,
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

const FAQ = [
  {
    question: "Do you deliver?",
    answer: `Not yet. Orders are for ${restaurant.serviceModes.join(" or ").toLowerCase()}.`,
  },
  {
    question: "Do I need an account to order?",
    answer:
      "Yes. A free account lets you place orders online, follow their status live and reorder your favorites in one tap. You can browse the menu without one.",
  },
  {
    question: "Can I put different toppings on each half?",
    answer:
      "Yes. Every topping goes on the whole pizza, the left half or the right half, in a light, standard or extra portion. Half a pizza costs half.",
  },
  {
    question: "How do I know when my order is ready?",
    answer: "Your home page shows each order as it moves from pending to preparing to ready.",
  },
  {
    question: "Can I cancel an order?",
    answer: "Yes, while it's still pending. Once the kitchen starts on it, call us and we'll help.",
  },
  {
    question: "Do you have allergen information?",
    answer: `Each pizza on the menu lists its ingredients. For anything else, ask us at ${restaurant.phone} before ordering.`,
  },
];

const AboutPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-4 py-10">
      <section className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">About {restaurant.name}</h1>
        <p className="text-lg text-muted-foreground text-pretty">{restaurant.description}</p>
      </section>

      <section aria-labelledby="visit" className="grid gap-6 rounded-2xl border p-6 sm:grid-cols-2">
        <div className="flex flex-col gap-3">
          <h2 id="visit" className="text-lg font-semibold tracking-tight">
            Visit us
          </h2>
          <address className="flex flex-col gap-1 text-sm not-italic">
            <span>{formatAddress()}</span>
            <a href={`tel:${restaurant.phone.replace(/\s/g, "")}`} className="text-muted-foreground hover:underline">
              {restaurant.phone}
            </a>
            <a href={`mailto:${restaurant.email}`} className="text-muted-foreground hover:underline">
              {restaurant.email}
            </a>
          </address>
          <a
            href={restaurant.mapUrl}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: "outline", className: "self-start" })}
          >
            Open in Maps
          </a>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold tracking-tight">Hours</h2>
          <OpeningHoursList />
        </div>
      </section>

      <section aria-labelledby="faq" className="flex flex-col gap-4">
        <h2 id="faq" className="text-2xl font-semibold tracking-tight">
          Frequently asked questions
        </h2>
        <div className="divide-y rounded-xl border">
          {FAQ.map((item) => (
            <details key={item.question} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
                {item.question}
                <span aria-hidden="true" className="text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pt-3 text-sm text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/menu" className={buttonVariants()}>
          See the menu
        </Link>
        <Link href="/register" className={buttonVariants({ variant: "outline" })}>
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
