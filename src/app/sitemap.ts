import type { MetadataRoute } from "next";
import { categories, mainMenu } from "@/lib/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://goppob.com";
  return [
    { url: base, lastModified: new Date() },
    ...mainMenu.map(([, href]) => ({ url: `${base}${href}`, lastModified: new Date() })),
    ...categories.map((category) => ({ url: `${base}/${category.slug}`, lastModified: new Date() })),
    { url: `${base}/dashboard`, lastModified: new Date() },
    { url: `${base}/admin`, lastModified: new Date() },
  ];
}
