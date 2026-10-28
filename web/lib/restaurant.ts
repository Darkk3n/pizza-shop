// The restaurant's public details, shown on the signed-out pages (landing, menu, about, footer).
// Hardcoded for now; replace the placeholders with the real values.

export type OpeningHours = {
  // Shown as-is, e.g. "Mon – Thu".
  days: string;
  // 24-hour local times ("12:00", "22:30"), in timeZone; null = closed.
  opens: string | null;
  closes: string | null;
};

export const restaurant = {
  name: "Rubencinis & Mate Pizza",
  tagline: "Hand-stretched pizza, made to order and ready when you are.",
  description:
    "A neighborhood pizzeria baking fresh pies since day one. Build your own half-and-half pizza, order online, and watch it move from the oven to the counter.",
  address: {
    street: "Av. Ejemplo 123",
    neighborhood: "Col. Centro",
    city: "Ciudad de México",
    postalCode: "06000",
  },
  mapUrl: "https://maps.google.com/?q=Av.+Ejemplo+123,+Ciudad+de+M%C3%A9xico",
  phone: "+52 55 0000 0000",
  email: "hola@pizzashop.example",
  // Same zone as the API's Statistics:TimeZone.
  timeZone: "America/Mexico_City",
  hours: [
    { days: "Mon – Thu", opens: "12:00", closes: "22:00" },
    { days: "Fri – Sat", opens: "12:00", closes: "23:30" },
    { days: "Sunday", opens: "13:00", closes: "21:00" },
  ] satisfies OpeningHours[],
  // Delivery isn't offered yet (orders have no address).
  serviceModes: ["Pickup", "Dine-in"],
} as const;

const twelveHour = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours >= 12 ? "pm" : "am";
  const hour = hours % 12 === 0 ? 12 : hours % 12;
  return minutes === 0 ? `${hour} ${suffix}` : `${hour}:${String(minutes).padStart(2, "0")} ${suffix}`;
};

// "12 pm – 10 pm", or "Closed".
export const formatOpeningHours = ({ opens, closes }: OpeningHours) =>
  opens && closes ? `${twelveHour(opens)} – ${twelveHour(closes)}` : "Closed";

export const formatAddress = () => {
  const { street, neighborhood, city, postalCode } = restaurant.address;
  return `${street}, ${neighborhood}, ${postalCode} ${city}`;
};
