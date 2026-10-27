// Shared by the page (server) and CatalogTabs (client); values exported from a "use client"
// module reach server code only as client references.
export const CATALOG_TABS = ["sizes", "units"] as const;
export type CatalogTab = (typeof CATALOG_TABS)[number];

export const isCatalogTab = (value: unknown): value is CatalogTab => CATALOG_TABS.includes(value as CatalogTab);
