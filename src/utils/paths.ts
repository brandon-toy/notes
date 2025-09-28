/**
 * Utility functions for handling paths, slugs, and API URLs
 */

/**
 * Get the slug/identifier from a content collection item
 * In Astro content collections, use the 'id' field as the slug
 */
export function getContentSlug(doc: { id: string }): string {
  return doc.id;
}

/**
 * Build an API URL with proper base path handling
 * Handles both development and production environments
 */
export function buildApiUrl(endpoint: string, baseUrl?: string): string {
  const base =
    baseUrl ||
    (typeof import.meta !== "undefined" ? import.meta.env.BASE_URL : "") ||
    "/";

  // Ensure endpoint starts with a slash
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  // Handle base URL ending
  if (base.endsWith("/")) {
    return `${base}${cleanEndpoint.slice(1)}`; // Remove leading slash from endpoint
  } else {
    return `${base}${cleanEndpoint}`;
  }
}

/**
 * Get the base URL for the current environment
 * Useful for server-side rendering where import.meta might not be available
 */
export function getBaseUrl(): string {
  // In browser/client-side
  if (typeof import.meta !== "undefined" && import.meta.env) {
    return import.meta.env.BASE_URL || "/";
  }

  // In server-side (Node.js environment)
  if (typeof process !== "undefined" && process.env) {
    return process.env.NODE_ENV === "production" ? "/notes" : "/";
  }

  // Fallback
  return "/";
}

/**
 * Check if a slug should be excluded from content lists
 */
export function shouldExcludeFromContentList(slug: string): boolean {
  const excludedSlugs = ["index", "contents"];
  return excludedSlugs.includes(slug) || !slug;
}
