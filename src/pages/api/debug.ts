import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const projectId = import.meta.env.SANITY_PROJECT_ID;
  const dataset = import.meta.env.SANITY_DATASET;

  let sanityResult = null;
  let sanityError = null;

  if (projectId) {
    try {
      const res = await fetch(
        `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset ?? "production"}?query=*[_type=="homePage"][0]{heading}`
      );
      sanityResult = await res.json();
    } catch (e: any) {
      sanityError = e?.message;
    }
  }

  return new Response(
    JSON.stringify({
      SANITY_PROJECT_ID: projectId ?? "MISSING",
      SANITY_DATASET: dataset ?? "MISSING",
      sanityResult,
      sanityError,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};
