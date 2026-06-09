import type { APIRoute } from "astro";

export const prerender = false;

const PROJECT_ID = import.meta.env.SANITY_PROJECT_ID ?? "REPLACE_WITH_YOUR_PROJECT_ID";
const DATASET = import.meta.env.SANITY_DATASET ?? "production";
const API_VERSION = import.meta.env.SANITY_API_VERSION ?? "2024-01-01";

export const GET: APIRoute = async () => {
  const pageQuery = encodeURIComponent(
    `*[_type == "workPage"][0]{ heading, introText }`
  );
  const projectsQuery = encodeURIComponent(
    `*[_type == "project"] | order(_createdAt desc){
      title,
      year,
      category,
      "src": coverImage.asset->url,
      description,
      client,
      location,
      medium,
      collaborators,
      dimensions,
      longDescription
    }`
  );

  try {
    const [pageRes, projectsRes] = await Promise.all([
      fetch(
        `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${pageQuery}`
      ),
      fetch(
        `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${projectsQuery}`
      ),
    ]);

    const pageJson = pageRes.ok ? ((await pageRes.json()) as { result: unknown }) : { result: null };
    const projectsJson = projectsRes.ok
      ? ((await projectsRes.json()) as { result: unknown[] })
      : { result: [] };

    return new Response(
      JSON.stringify({
        page: pageJson.result ?? {},
        projects: projectsJson.result ?? [],
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch {
    return new Response(JSON.stringify({ page: {}, projects: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
};
