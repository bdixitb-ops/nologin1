import { SITE_URL, siteUrl } from "@/lib/siteMetadata";
import type { MetadataRoute } from "next";

const STATIC_PATHS = [
  "/",
  "/about",
  "/faq",
  "/features-of-nologin",
  "/why-nologin",
  "/blog",
  "/cross-device-sharing",
  "/share-text-online",
  "/instant-sharing",
  "/upload-files-online",
  "/notepad",
  "/no-signup-sharing",
  "/share-code-online",
  "/fastest-online-sharing",
  "/dontpad-alternative",
  "/pastebin-alternative",
  "/hastebin-alternative",
  "/online-clipboard",
  "/privacy-policy",
  "/terms",
  "/content-policy",
  "/best-online-sharing",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return STATIC_PATHS.map((path) => ({
    url: path === "/" ? SITE_URL : siteUrl(path),
    lastModified,
    changeFrequency: path === "/" ? "daily" : "monthly",
    priority: path === "/" ? 1 : path === "/about" || path === "/faq" ? 0.9 : 0.8,
  }));
}
