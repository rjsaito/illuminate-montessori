import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = import.meta.env.PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION ?? "2024-01-01";

export const sanityConfigured = Boolean(projectId);

export const sanityClient = sanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source: any) {
  if (!builder) return "";
  return builder.image(source).url();
}
