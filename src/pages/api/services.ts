import type { APIRoute } from "astro";

export const prerender = false;

const PROJECT_ID = import.meta.env.SANITY_PROJECT_ID ?? "REPLACE_WITH_YOUR_PROJECT_ID";
const DATASET = import.meta.env.SANITY_DATASET ?? "production";
const API_VERSION = import.meta.env.SANITY_API_VERSION ?? "2024-01-01";

export const GET: APIRoute = async () => {
  const pageQuery = encodeURIComponent(
    `*[_type == "servicesPage"][0]{ heading, introText }`
  );
  const servicesQuery = encodeURIComponent(
    `*[_type == "service"] | order(order asc){
      name,
      description,
      "src": image.asset->url,
      features[]
    }`
  );

  try {
    const [pageRes, servicesRes] = await Promise.all([
      fetch(
        `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${pageQuery}`
      ),
      fetch(
        `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${servicesQuery}`
      ),
    ]);

    const pageJson = pageRes.ok ? ((await pageRes.json()) as { result: unknown }) : { result: null };
    const servicesJson = servicesRes.ok
      ? ((await servicesRes.json()) as { result: unknown[] })
      : { result: [] };

    return new Response(
      JSON.stringify({
        page: pageJson.result ?? {},
        services: servicesJson.result ?? [],
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
    return new Response(JSON.stringify({ page: {}, services: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
};
