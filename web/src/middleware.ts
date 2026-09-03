import type { MiddlewareHandler } from "astro";

/**
 * Pages are CMS-driven and change rarely, so let the edge serve them and
 * revalidate in the background instead of invoking a function per view.
 * Also sets the baseline security headers Vercel doesn't add by default.
 */
export const onRequest: MiddlewareHandler = async (context, next) => {
  const response = await next();

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("text/html") && response.status === 200) {
    response.headers.set(
      "cache-control",
      "public, max-age=0, s-maxage=300, stale-while-revalidate=86400"
    );
  }

  response.headers.set("x-content-type-options", "nosniff");
  response.headers.set("referrer-policy", "strict-origin-when-cross-origin");
  response.headers.set("x-frame-options", "SAMEORIGIN");
  response.headers.set("permissions-policy", "geolocation=(), microphone=(), camera=()");

  return response;
};
