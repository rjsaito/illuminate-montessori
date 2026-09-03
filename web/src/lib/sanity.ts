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

interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
}

/**
 * Build a CDN URL with resize + WebP conversion. Serving originals costs ~1MB
 * per campus hero; the same image at w=800/webp is ~60KB.
 */
export function urlFor(source: any, opts: ImageOptions = {}) {
  if (!builder || !source) return "";
  const { width = 900, height, quality = 75 } = opts;
  let img = builder.image(source).width(width).quality(quality).auto("format").fit("max");
  if (height) img = img.height(height).fit("crop");
  return img.url();
}
