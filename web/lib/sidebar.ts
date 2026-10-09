export const SIDEBAR_STORAGE_KEY = "sidebar";

/**
 * Runs inline in <head> before first paint so a persisted collapsed sidebar
 * doesn't flash open on reload. Mirrors `setCollapsed` in hooks/useSidebar.ts.
 */
export const sidebarInitScript = `try{if(localStorage.getItem("${SIDEBAR_STORAGE_KEY}")==="collapsed")document.documentElement.dataset.sidebar="collapsed"}catch(e){}`;
