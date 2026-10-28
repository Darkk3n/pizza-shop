import type { Metadata } from "next";
import { PublicFooter } from "@/components/public/PublicFooter";
import { PublicHeader } from "@/components/public/PublicHeader";
import { siteUrl } from "@/lib/helpers/site";
import { restaurant } from "@/lib/restaurant";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: restaurant.name, template: `%s · ${restaurant.name}` },
  description: restaurant.tagline,
  openGraph: { siteName: restaurant.name, type: "website", locale: "en_US" },
};

// The signed-out site: landing and menu (shown at / and /menu through proxy.ts rewrites), about and
// legal pages. Static: nothing here reads cookies, so it prerenders.
const PublicLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <>
      <PublicHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <PublicFooter />
    </>
  );
};

export default PublicLayout;
