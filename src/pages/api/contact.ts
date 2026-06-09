import type { APIRoute } from "astro";

export const prerender = false;

const PROJECT_ID = "rcecmbgj";
const DATASET = "production";
const API_VERSION = "2024-01-01";

export const GET: APIRoute = async () => {
  const query = encodeURIComponent(
    `{
      "page": *[_type == "contactPage"][0]{ heading, introText, formHeadline, submitLabel },
      "settings": *[_type == "siteSettings"][0]{ email, phone, location, instagram, linkedin }
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

    const json = (await res.json()) as { result: { page: unknown; settings: unknown } };

    return new Response(JSON.stringify(json.result ?? {}), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "s-maxage=300, stale-while-revalidate=3600",
      },
    });
  } catch {
    return new Response(JSON.stringify({}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
};
