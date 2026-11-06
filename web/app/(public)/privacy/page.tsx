import type { Metadata } from "next";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";
import { restaurant } from "@/lib/restaurant";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  alternates: { canonical: "/privacy" },
};

const PrivacyPage = () => {
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-10 [&_h2]:pt-2 [&_h2]:text-lg [&_h2]:font-semibold [&_p]:text-muted-foreground [&_li]:text-muted-foreground">
      <h1 className="text-3xl font-semibold tracking-tight">Aviso de privacidad</h1>
      <PlaceholderNotice />
      <p>
        Este aviso explica qué datos recopila {restaurant.name} cuando usas este sitio y cómo se usan.
      </p>
      <h2>Qué recopilamos</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>Tu correo electrónico y una contraseña (guardada solo como un hash seguro) cuando creas una cuenta.</li>
        <li>Los pedidos que haces: productos, ingredientes extra, totales y su estado.</li>
        <li>Datos técnicos necesarios para mantener seguro el servicio, como tu dirección IP para limitar solicitudes.</li>
      </ul>
      <h2>Cómo los usamos</h2>
      <p>
        Para administrar tu cuenta, preparar tus pedidos y darles seguimiento, enviarte correos de la cuenta (confirmación y
        restablecimiento de contraseña) y proteger el servicio contra abusos. No vendemos tus datos ni los usamos para publicidad.
      </p>
      <h2>Cookies</h2>
      <p>
        Solo usamos las cookies necesarias para mantener tu sesión iniciada. Son httpOnly y vencen cuando termina tu sesión.
      </p>
      <h2>Tus derechos</h2>
      <p>
        Para consultar o eliminar los datos de tu cuenta, escríbenos a{" "}
        <a href={`mailto:${restaurant.email}`} className="text-primary hover:underline">
          {restaurant.email}
        </a>
        .
      </p>
    </article>
  );
};

export default PrivacyPage;
