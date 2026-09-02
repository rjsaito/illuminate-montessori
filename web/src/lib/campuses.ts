import { sanityClient, urlFor } from "./sanity";
import { ALL_CAMPUSES_QUERY, CAMPUS_BY_SLUG_QUERY } from "./queries";
import { fallbackCampuses, type CampusData } from "./campusesFallback";

export type { CampusData };

export async function getAllCampuses(): Promise<CampusData[]> {
  if (!sanityClient) return fallbackCampuses;
  const raw = await sanityClient.fetch(ALL_CAMPUSES_QUERY);
  if (!raw || raw.length === 0) return fallbackCampuses;
  return raw.map((c: any) => ({
    ...c,
    heroImageUrl: c.heroImage ? urlFor(c.heroImage) : null,
  }));
}

export async function getCampusBySlug(slug: string): Promise<CampusData | null> {
  if (!sanityClient) return fallbackCampuses.find((c) => c.slug === slug) ?? null;
  const raw = await sanityClient.fetch(CAMPUS_BY_SLUG_QUERY, { slug });
  if (!raw) return fallbackCampuses.find((c) => c.slug === slug) ?? null;
  return { ...raw, heroImageUrl: raw.heroImage ? urlFor(raw.heroImage) : null };
}
