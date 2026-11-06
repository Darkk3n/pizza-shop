import type { Metadata } from "next";
import Link from "next/link";
import { OpeningHoursList } from "@/components/public/OpeningHoursList";
import { buttonVariants } from "@/components/ui/button";
import { formatAddress, restaurant } from "@/lib/restaurant";

export const metadata: Metadata = {
  title: "Nosotros y preguntas frecuentes",
  description: `Horario, ubicación y respuestas a las preguntas frecuentes sobre cómo pedir en ${restaurant.name}.`,
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

const FAQ = [
  {
    question: "¿Tienen servicio a domicilio?",
    answer: `Todavía no. Los pedidos son ${restaurant.serviceModes.join(" o ").toLowerCase()}.`,
  },
  {
    question: "¿Necesito una cuenta para pedir?",
    answer:
      "Sí. Con una cuenta gratuita puedes hacer pedidos en línea, seguir su estado en tiempo real y volver a pedir tus favoritos con un toque. Puedes ver el menú sin cuenta.",
  },
  {
    question: "¿Puedo poner ingredientes distintos en cada mitad?",
    answer:
      "Sí. Cada ingrediente extra puede ir en la pizza completa, en la mitad izquierda o en la mitad derecha, en porción poca, normal o extra. En media pizza cuesta la mitad.",
  },
  {
    question: "¿Cómo sé cuándo está listo mi pedido?",
    answer: "Tu página de inicio muestra cada pedido mientras pasa de pendiente a en preparación y a listo.",
  },
  {
    question: "¿Puedo cancelar un pedido?",
    answer: "Sí, mientras siga pendiente. Si la cocina ya empezó a prepararlo, llámanos y te ayudamos.",
  },
  {
    question: "¿Tienen información sobre alérgenos?",
    answer: `Cada pizza del menú muestra sus ingredientes. Para cualquier otra duda, pregúntanos al ${restaurant.phone} antes de pedir.`,
  },
];

const AboutPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-4 py-10">
      <section className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">Sobre {restaurant.name}</h1>
        <p className="text-lg text-muted-foreground text-pretty">{restaurant.description}</p>
      </section>

      <section aria-labelledby="visit" className="grid gap-6 rounded-2xl border p-6 sm:grid-cols-2">
        <div className="flex flex-col gap-3">
          <h2 id="visit" className="text-lg font-semibold tracking-tight">
            Visítanos
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
            Abrir en Maps
          </a>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold tracking-tight">Horario</h2>
          <OpeningHoursList />
        </div>
      </section>

      <section aria-labelledby="faq" className="flex flex-col gap-4">
        <h2 id="faq" className="text-2xl font-semibold tracking-tight">
          Preguntas frecuentes
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
          Ver el menú
        </Link>
        <Link href="/register" className={buttonVariants({ variant: "outline" })}>
          Crear una cuenta
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
