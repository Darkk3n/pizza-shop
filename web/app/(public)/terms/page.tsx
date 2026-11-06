import type { Metadata } from "next";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";
import { restaurant } from "@/lib/restaurant";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  alternates: { canonical: "/terms" },
};

const TermsPage = () => {
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-10 [&_h2]:pt-2 [&_h2]:text-lg [&_h2]:font-semibold [&_p]:text-muted-foreground">
      <h1 className="text-3xl font-semibold tracking-tight">Términos y condiciones</h1>
      <PlaceholderNotice />
      <p>Al crear una cuenta o hacer un pedido en {restaurant.name}, aceptas estos términos.</p>
      <h2>Pedidos y precios</h2>
      <p>
        Los precios y el IVA se calculan al hacer un pedido y se muestran antes de que lo confirmes. Los productos y precios
        del menú pueden cambiar, pero nunca en un pedido que ya hiciste.
      </p>
      <h2>Recolección</h2>
      <p>Los pedidos son para llevar o para comer aquí, en la dirección que aparece en la página Nosotros. Todavía no tenemos servicio a domicilio.</p>
      <h2>Cancelaciones</h2>
      <p>Puedes cancelar un pedido mientras siga pendiente. Después, contáctanos y haremos lo posible por ayudarte.</p>
      <h2>Tu cuenta</h2>
      <p>
        Mantén tu contraseña en privado. Eres responsable de los pedidos hechos desde tu cuenta. Por seguridad, tu sesión
        se cierra después de un tiempo de inactividad.
      </p>
      <h2>Contacto</h2>
      <p>
        ¿Tienes dudas? Llama al {restaurant.phone} o escribe a{" "}
        <a href={`mailto:${restaurant.email}`} className="text-primary hover:underline">
          {restaurant.email}
        </a>
        .
      </p>
    </article>
  );
};

export default TermsPage;
