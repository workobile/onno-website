import type { APIRoute } from "astro";

export const prerender = false;

const PROJECT_ID = import.meta.env.SANITY_PROJECT_ID ?? "REPLACE_WITH_YOUR_PROJECT_ID";
const DATASET    = import.meta.env.SANITY_DATASET    ?? "production";
const API_VER    = import.meta.env.SANITY_API_VERSION ?? "2024-01-01";

const q = (query: string) =>
  fetch(`https://${PROJECT_ID}.api.sanity.io/v${API_VER}/data/query/${DATASET}?query=${encodeURIComponent(query)}`);

export const GET: APIRoute = async () => {
  try {
    const [homeRes, pagesRes, worksRes, servicesRes] = await Promise.all([
      q(`*[_type == "homePage"][0]{
          heading, tagline, ctaLabel,
          "heroImageUrl": heroImage.asset->url,
          stats[]{ number, label }
        }`),
      q(`{
          "workPage":     *[_type == "workPage"][0]    { heading, introText },
          "servicesPage": *[_type == "servicesPage"][0]{ heading, introText },
          "aboutPage":    *[_type == "aboutPage"][0]   { heading, bio },
          "contactPage":  *[_type == "contactPage"][0] { ctaHeading, ctaText }
        }`),
      q(`*[_type == "project"] | order(_createdAt desc)[0...3]{
          title, year, "src": coverImage.asset->url
        }`),
      q(`*[_type == "service"] | order(order asc)[0...3]{
          name, description, "src": image.asset->url
        }`),
    ]);

    const home      = homeRes.ok    ? (await homeRes.json()).result  ?? {} : {};
    const pages     = pagesRes.ok   ? (await pagesRes.json()).result ?? {} : {};
    const featuredWorks = worksRes.ok ? (await worksRes.json()).result ?? [] : [];
    const services  = servicesRes.ok ? (await servicesRes.json()).result ?? [] : [];

    return new Response(JSON.stringify({ home, pages, featuredWorks, services }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  } catch {
    return new Response(JSON.stringify({ home: {}, pages: {}, featuredWorks: [], services: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
};
