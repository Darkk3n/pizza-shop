// Public address of the web app (SITE_URL), for absolute links: metadataBase, sitemap and robots.
export const siteUrl = () => (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
