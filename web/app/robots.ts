import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/helpers/site";

// Only the signed-out site is indexable; everything else is behind a sign-in anyway.
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/$", "/menu$", "/about", "/privacy", "/terms"],
    disallow: "/",
  },
  sitemap: `${siteUrl()}/sitemap.xml`,
});

export default robots;
