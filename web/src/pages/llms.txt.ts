import type { APIRoute } from "astro";
import { getAllCampuses } from "../lib/campuses";
import { sanityClient } from "../lib/sanity";
import { ALL_PROGRAMS_QUERY } from "../lib/queries";

export const prerender = false;

/**
 * llms.txt — a plain-text summary for AI answer engines (ChatGPT, Perplexity,
 * Google AI Overviews). Gives them the facts that matter for "montessori school
 * near me" style questions without making them parse the whole site.
 */
export const GET: APIRoute = async ({ site }) => {
  const origin = (site?.href ?? "https://illuminate-montessori.vercel.app/").replace(/\/$/, "");
  const campuses = await getAllCampuses();
  const programs = sanityClient ? ((await sanityClient.fetch(ALL_PROGRAMS_QUERY)) ?? []) : [];

  const stateAbbr: Record<string, string> = { Virginia: "VA", Massachusetts: "MA", Texas: "TX" };
  const offered = new Set(campuses.flatMap((c: any) => (c.programs ?? []).map((p: any) => p.slug)));

  const byRegion = ["Virginia", "Massachusetts", "Texas"]
    .map((r) => ({ region: r, list: campuses.filter((c) => c.region === r) }))
    .filter((g) => g.list.length > 0);

  const body = `# Illuminate Montessori

> Authentic Montessori education for children from 6 weeks through 12 years,
> across ${campuses.length} campuses in ${byRegion.map((g) => g.region).join(", ")}.

Illuminate Montessori operates ${campuses.length} schools offering Montessori programs
from infancy through elementary. Every campus follows the same Montessori curriculum
(Practical Life, Sensorial, Mathematics, Language & Literacy, Cultural Studies, Art &
Creativity, Grace & Courtesy) with mixed-age classrooms and uninterrupted work cycles.
Weekday tours are available at every campus by appointment.

Contact: hello@illuminatemontessori.com

## Programs

${programs
  .filter((p: any) => offered.has(p.slug))
  .map((p: any) => {
    const at = campuses.filter((c) => (c.programs ?? []).some((cp: any) => cp.slug === p.slug));
    return `- [${p.name}](${origin}/programs/${p.slug}/)${p.defaultAges ? ` (${p.defaultAges})` : ""}: ${
      p.description ?? ""
    } Offered at ${at.length} campus${at.length === 1 ? "" : "es"}: ${at.map((c) => c.name).join(", ")}.`;
  })
  .join("\n")}

## Campuses

${byRegion
  .map(
    (g) => `### ${g.region} (${g.list.length})

${g.list
  .map((c) => {
    const loc = [c.address, c.city, stateAbbr[c.region], c.postalCode].filter(Boolean).join(", ");
    const progs = (c.programs ?? []).map((p: any) => p.name).join(", ");
    return `- [Illuminate Montessori at ${c.name}](${origin}/${c.slug}/): ${loc}.${
      c.phone ? ` Phone ${c.phone}.` : ""
    }${c.hours ? ` ${c.hours}.` : ""}${c.agesServed ? ` Ages ${c.agesServed}.` : ""}${
      progs ? ` Programs: ${progs}.` : ""
    }${c.headOfSchool?.name ? ` Head of School: ${c.headOfSchool.name}.` : ""}`;
  })
  .join("\n")}`
  )
  .join("\n\n")}

## Key pages

- [Find a campus near you](${origin}/our-schools/): searchable map, filter by program, ZIP search
- [Programs](${origin}/programs/): every program and which campuses offer it
- [What is Montessori?](${origin}/what-is-montessori/): the method explained
- [Admissions](${origin}/admissions/): how to apply, tours, enrollment
- [Tuition](${origin}/tuition/): what determines tuition and how to request rates
- [Contact](${origin}/contact/): schedule a weekday tour
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
};
