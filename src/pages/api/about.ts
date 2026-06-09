import type { APIRoute } from "astro";

export const prerender = false;

const PROJECT_ID = import.meta.env.SANITY_PROJECT_ID ?? "REPLACE_WITH_YOUR_PROJECT_ID";
const DATASET = import.meta.env.SANITY_DATASET ?? "production";
const API_VERSION = import.meta.env.SANITY_API_VERSION ?? "2024-01-01";

export const GET: APIRoute = async () => {
  const query = encodeURIComponent(
    `*[_type == "aboutPage"][0]{
      heading,
      bio,
      "portraitUrl": portrait.asset->url,
      experience[]{year, title, company, location},
      skills[],
      stats[]{number, label}
    }`
  );

  try {
    const res = await fetch(
      `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`
    );

    if (!res.ok) {
      return new Response(JSON.stringify({}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const json = (await res.json()) as { result: unknown };

    return new Response(JSON.stringify(json.result ?? {}), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch {
    return new Response(JSON.stringify({}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
};
