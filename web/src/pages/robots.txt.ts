import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = ({ site }) => {
  const origin = (site?.href ?? "https://illuminate-tuition.vercel.app/").replace(/\/$/, "");

  const body = `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600",
    },
  });
};
