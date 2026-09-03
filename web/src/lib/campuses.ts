import { sanityClient, urlFor } from "./sanity";
import { ALL_CAMPUSES_QUERY, CAMPUS_BY_SLUG_QUERY } from "./queries";
import { fallbackCampuses, type CampusData } from "./campusesFallback";

export type { CampusData };

export interface CampusProgram {
  name: string;
  slug: string;
  ages?: string;
  defaultAges?: string;
  description?: string;
  order?: number;
}

function normalize(c: any): CampusData {
  return {
    ...c,
    heroImageUrl: c.heroImage ? urlFor(c.heroImage, { width: 1000 }) : null,
    headOfSchool: c.headOfSchool
      ? {
          ...c.headOfSchool,
          photoUrl: c.headOfSchool.photo ? urlFor(c.headOfSchool.photo, { width: 640 }) : null,
        }
      : null,
    programs: (c.programs ?? [])
      .filter((p: any) => p?.name)
      .sort((a: any, b: any) => (a.order ?? 99) - (b.order ?? 99)),
  };
}

export async function getAllCampuses(): Promise<CampusData[]> {
  if (!sanityClient) return fallbackCampuses;
  const raw = await sanityClient.fetch(ALL_CAMPUSES_QUERY);
  if (!raw || raw.length === 0) return fallbackCampuses;
  return raw.map(normalize);
}

export async function getCampusBySlug(slug: string): Promise<CampusData | null> {
  if (!sanityClient) return fallbackCampuses.find((c) => c.slug === slug) ?? null;
  const raw = await sanityClient.fetch(CAMPUS_BY_SLUG_QUERY, { slug });
  if (!raw) return fallbackCampuses.find((c) => c.slug === slug) ?? null;
  return normalize(raw);
}
