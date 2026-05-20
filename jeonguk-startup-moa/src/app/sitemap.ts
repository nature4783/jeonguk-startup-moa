import type { MetadataRoute } from "next";
import { getPublicListings } from "@/lib/public-listings";
import { seoRegionPages } from "@/lib/seo-regions";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.changupmoa.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/listings",
    "/ai-recommend",
    "/regions",
    "/guides",
    "/roadmap",
    "/compare",
    "/community",
    "/consult",
    "/sectors",
    "/partners",
    "/support",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" || route === "/listings" ? "daily" : "weekly",
    priority: route === "" ? 1 : route === "/listings" ? 0.9 : 0.7,
  })) satisfies MetadataRoute.Sitemap;

  const listingRoutes = getPublicListings().map((listing) => ({
    url: `${siteUrl}/listings/${listing.id}`,
    lastModified: new Date(listing.publishedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  })) satisfies MetadataRoute.Sitemap;

  const regionRoutes = seoRegionPages.map((page) => ({
    url: `${siteUrl}/regions/${page.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  })) satisfies MetadataRoute.Sitemap;

  return [...staticRoutes, ...listingRoutes, ...regionRoutes];
}
