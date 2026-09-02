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
}

// Used only if PUBLIC_SANITY_PROJECT_ID is unset (local dev without Sanity connected).
export const fallbackCampuses: CampusData[] = [
  { slug: "bee-cave", name: "Bee Cave", region: "Texas", heroImageUrl: "/images/campuses/bee-cave.jpg", showOnFindCampus: false },
  { slug: "berkeley", name: "Berkeley", region: "Virginia", heroImageUrl: null, showOnFindCampus: true },
  { slug: "broadlands", name: "Broadlands", region: "Virginia", heroImageUrl: "/images/campuses/broadlands.png", showOnFindCampus: true },
  { slug: "brushy-creek", name: "Brushy Creek", region: "Texas", heroImageUrl: "/images/campuses/brushy-creek.png", showOnFindCampus: false },
  { slug: "chantilly", name: "Chantilly", region: "Virginia", heroImageUrl: null, showOnFindCampus: true },
  { slug: "cypress-creek", name: "Cypress Creek", region: "Texas", heroImageUrl: "/images/campuses/cypress-creek.jpeg", showOnFindCampus: false },
  { slug: "downtown-boston-dtb", name: "Downtown Boston (DTB)", region: "Massachusetts", heroImageUrl: "/images/campuses/downtown-boston-dtb.png", showOnFindCampus: true },
  { slug: "eldorado-2", name: "Eldorado", region: "Texas", heroImageUrl: "/images/campuses/eldorado-2.png", showOnFindCampus: false },
  { slug: "fairfax", name: "Fairfax", region: "Virginia", heroImageUrl: null, showOnFindCampus: true },
  { slug: "flowermound", name: "Flower Mound", region: "Texas", heroImageUrl: "/images/campuses/flowermound.png", showOnFindCampus: false },
  { slug: "marlborough", name: "Marlborough", region: "Massachusetts", heroImageUrl: "/images/campuses/marlborough.jpg", showOnFindCampus: true },
  { slug: "montclair", name: "Montclair", region: "Virginia", heroImageUrl: "/images/campuses/montclair.png", showOnFindCampus: true },
  { slug: "reston", name: "Reston", region: "Virginia", heroImageUrl: "/images/campuses/reston.png", showOnFindCampus: true },
  { slug: "round-rock", name: "Round Rock", region: "Texas", heroImageUrl: "/images/campuses/round-rock.png", showOnFindCampus: false },
  { slug: "south-riding", name: "South Riding", region: "Virginia", heroImageUrl: null, showOnFindCampus: true },
  { slug: "timber-ridge", name: "Timber Ridge", region: "Texas", heroImageUrl: "/images/campuses/timber-ridge.png", showOnFindCampus: false },
  { slug: "west-alex", name: "West Alex", region: "Virginia", heroImageUrl: "/images/campuses/west-alex.png", showOnFindCampus: true },
  { slug: "westlake", name: "Westlake", region: "Texas", heroImageUrl: "/images/campuses/westlake.png", showOnFindCampus: false },
];
