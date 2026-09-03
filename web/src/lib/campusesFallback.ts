export interface CampusData {
  name: string;
  slug: string;
  region: "Virginia" | "Massachusetts" | "Texas";
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
  about?: string;
  heroImageUrl?: string | null;
  bookingIframeUrl?: string | null;
  showOnFindCampus?: boolean;
  city?: string;
  postalCode?: string;
  agesServed?: string;
  schoolAgeCare?: boolean;
  schoolAgeCareNote?: string;
  location?: { lat: number; lng: number } | null;
  programs?: { name: string; slug: string; ages?: string; defaultAges?: string; description?: string; order?: number }[];
  headOfSchool?: { name?: string; title?: string; bio?: string; photoUrl?: string | null } | null;
  instagram?: string;
  facebook?: string;
  googleBusinessUrl?: string;
}

// Used only if PUBLIC_SANITY_PROJECT_ID is unset (local dev without Sanity connected).
export const fallbackCampuses: CampusData[] = [
  { slug: "bee-cave", name: "Bee Cave", region: "Texas", heroImageUrl: null, showOnFindCampus: false },
  { slug: "berkeley", name: "Berkeley", region: "Virginia", heroImageUrl: null, showOnFindCampus: true },
  { slug: "broadlands", name: "Broadlands", region: "Virginia", heroImageUrl: null, showOnFindCampus: true },
  { slug: "brushy-creek", name: "Brushy Creek", region: "Texas", heroImageUrl: null, showOnFindCampus: false },
  { slug: "chantilly", name: "Chantilly", region: "Virginia", heroImageUrl: null, showOnFindCampus: true },
  { slug: "cypress-creek", name: "Cypress Creek", region: "Texas", heroImageUrl: null, showOnFindCampus: false },
  { slug: "downtown-boston-dtb", name: "Downtown Boston (DTB)", region: "Massachusetts", heroImageUrl: null, showOnFindCampus: true },
  { slug: "eldorado-2", name: "Eldorado", region: "Texas", heroImageUrl: null, showOnFindCampus: false },
  { slug: "fairfax", name: "Fairfax", region: "Virginia", heroImageUrl: null, showOnFindCampus: true },
  { slug: "flowermound", name: "Flower Mound", region: "Texas", heroImageUrl: null, showOnFindCampus: false },
  { slug: "marlborough", name: "Marlborough", region: "Massachusetts", heroImageUrl: null, showOnFindCampus: true },
  { slug: "montclair", name: "Montclair", region: "Virginia", heroImageUrl: null, showOnFindCampus: true },
  { slug: "reston", name: "Reston", region: "Virginia", heroImageUrl: null, showOnFindCampus: true },
  { slug: "round-rock", name: "Round Rock", region: "Texas", heroImageUrl: null, showOnFindCampus: false },
  { slug: "south-riding", name: "South Riding", region: "Virginia", heroImageUrl: null, showOnFindCampus: true },
  { slug: "timber-ridge", name: "Timber Ridge", region: "Texas", heroImageUrl: null, showOnFindCampus: false },
  { slug: "west-alex", name: "West Alex", region: "Virginia", heroImageUrl: null, showOnFindCampus: true },
  { slug: "westlake", name: "Westlake", region: "Texas", heroImageUrl: null, showOnFindCampus: false },
];
