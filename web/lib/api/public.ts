import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { callApiJson } from "./http";
import { publicMenuSchema } from "./schemas/public";

// Catalog Server Actions call updateTag(PUBLIC_MENU_TAG) so menu edits show up right away.
export const PUBLIC_MENU_TAG = "public-menu";

// Shared by every signed-out visitor, so it's cached for a few minutes instead of hitting the API per
// request. No token or client IP: the call is the same for everyone (and can't read headers here).
// Callers await connection() first, so the build never needs the API running.
export const getPublicMenu = async () => {
  "use cache";
  cacheLife("minutes");
  cacheTag(PUBLIC_MENU_TAG);
  return callApiJson("/api/public/menu", publicMenuSchema);
};
