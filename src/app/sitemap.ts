import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { treatments } from "@/lib/treatments";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/about", "/treatments", "/clinic", "/reviews", "/appointments", "/contact"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  const tx = treatments.map((t) => ({
    url: `${site.url}/treatments/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...pages, ...tx];
}
