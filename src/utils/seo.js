/**
 * Site URL helper to resolve canonical and social sharing links.
 * Reads VITE_SITE_URL from Vite environment, Node environment, or falls back to window.location.origin.
 */
export function getSiteUrl() {
  let envUrl = undefined;
  try {
    if (typeof import.meta !== "undefined" && import.meta.env) {
      envUrl = import.meta.env.VITE_SITE_URL;
    }
  } catch {
    // Ignore in non-Vite environments
  }

  if (!envUrl && typeof globalThis !== "undefined" && globalThis.process?.env) {
    envUrl = globalThis.process.env.VITE_SITE_URL;
  }

  if (envUrl && typeof envUrl === "string" && envUrl.trim() !== "") {
    return envUrl.replace(/\/+$/, "");
  }
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin.replace(/\/+$/, "");
  }
  return "https://jagmohan.dev";
}
