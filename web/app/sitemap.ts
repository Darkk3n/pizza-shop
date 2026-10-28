import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/helpers/site";

// The signed-out pages (/ and /menu are the landing and public menu for visitors, see proxy.ts).
const sitemap = (): MetadataRoute.Sitemap => {
  const base = siteUrl();
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/menu`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];
};

export default sitemap;
