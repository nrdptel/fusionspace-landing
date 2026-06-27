import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fusionspace.co";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((p) => ({
      url: `${siteUrl}/projects/${p.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
