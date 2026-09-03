import type { APIRoute } from "astro";
import { getAllCampuses } from "../lib/campuses";
import { sanityClient } from "../lib/sanity";
import { ALL_PROGRAMS_QUERY } from "../lib/queries";

export const prerender = false;

const STATIC_PATHS = [
  { path: "/", priority: "1.0" },
  { path: "/our-schools/", priority: "0.9" },
  { path: "/programs/", priority: "0.9" },
  { path: "/admissions/", priority: "0.9" },
  { path: "/tuition/", priority: "0.9" },
  { path: "/what-is-montessori/", priority: "0.8" },
  { path: "/about/", priority: "0.7" },
  { path: "/contact/", priority: "0.8" },
];

export const GET: APIRoute = async ({ site }) => {
  const origin = (site?.href ?? "https://illuminate-tuition.vercel.app/").replace(/\/$/, "");
  const campuses = await getAllCampuses();
  const programs = sanityClient ? ((await sanityClient.fetch(ALL_PROGRAMS_QUERY)) ?? []) : [];
  const offered = new Set(campuses.flatMap((c: any) => (c.programs ?? []).map((p: any) => p.slug)));
  const lastmod = new Date().toISOString().split("T")[0];

  const urls = [
    ...STATIC_PATHS.map((p) => ({ loc: `${origin}${p.path}`, priority: p.priority })),
    ...campuses.map((c) => ({ loc: `${origin}/${c.slug}/`, priority: "0.8" })),
    ...programs
      .filter((p: any) => offered.has(p.slug))
      .map((p: any) => ({ loc: `${origin}/programs/${p.slug}/`, priority: "0.8" })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
};
