const PROJECT_ID = import.meta.env.SANITY_PROJECT_ID ?? "REPLACE_WITH_YOUR_PROJECT_ID";
const DATASET = import.meta.env.SANITY_DATASET ?? "production";
const API_VERSION = import.meta.env.SANITY_API_VERSION ?? "2024-01-01";

/**
 * Build a Sanity CDN image URL from a sanity image reference object.
 * Usage: urlFor(image).url()
 */
export function urlFor(source: { asset?: { _ref?: string; url?: string } } | string | null | undefined) {
  if (!source) return { url: () => "" };

  // If it's already a plain string URL
  if (typeof source === "string") {
    return { url: () => source };
  }

  // If the asset has a direct URL (from expanded references)
  if (source.asset?.url) {
    return { url: () => source.asset!.url! };
  }

  // Build URL from _ref: image-<id>-<dimensions>-<format>
  const ref = source.asset?._ref;
  if (!ref) return { url: () => "" };

  const [, id, dimensionStr, format] = ref.split("-");
  const baseUrl = `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dimensionStr}.${format}`;

  return { url: () => baseUrl };
}

/**
 * Execute a GROQ query against the Sanity HTTP API.
 * Used in API route handlers (server-side only).
 */
export async function sanityFetch<T = unknown>(query: string): Promise<T> {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodedQuery}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Sanity fetch failed: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as { result: T };
  return json.result;
}
