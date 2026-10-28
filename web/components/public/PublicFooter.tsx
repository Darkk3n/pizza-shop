import Link from "next/link";
import { formatAddress, restaurant } from "@/lib/restaurant";
import { OpeningHoursList } from "./OpeningHoursList";

const FooterHeading = ({ children }: { children: string }) => (
  <h2 className="text-sm font-semibold tracking-tight">{children}</h2>
);

export const PublicFooter = () => {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <FooterHeading>{restaurant.name}</FooterHeading>
          <p className="text-sm text-muted-foreground">{restaurant.tagline}</p>
        </div>
        <div className="flex flex-col gap-2">
          <FooterHeading>Visit us</FooterHeading>
          <address className="flex flex-col gap-1 text-sm not-italic text-muted-foreground">
            <a href={restaurant.mapUrl} className="hover:text-foreground hover:underline" target="_blank" rel="noreferrer">
              {formatAddress()}
            </a>
            <a href={`tel:${restaurant.phone.replace(/\s/g, "")}`} className="hover:text-foreground hover:underline">
              {restaurant.phone}
            </a>
            <a href={`mailto:${restaurant.email}`} className="hover:text-foreground hover:underline">
              {restaurant.email}
            </a>
          </address>
        </div>
        <div className="flex flex-col gap-2">
          <FooterHeading>Hours</FooterHeading>
          <OpeningHoursList />
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-2">
          <FooterHeading>More</FooterHeading>
          <ul className="flex flex-col gap-1 text-sm text-muted-foreground">
            <li>
              <Link href="/menu" className="hover:text-foreground hover:underline">
                Menu
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-foreground hover:underline">
                About &amp; FAQ
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-foreground hover:underline">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-foreground hover:underline">
                Terms of service
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};
