import Home from "@/components/Home";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  shareImageMetadata,
  siteUrl,
} from "@/lib/siteMetadata";
import type { Metadata } from "next";

const homeTitle = `${SITE_NAME} | ${SITE_TAGLINE}`;

export const metadata: Metadata = {
  title: {
    absolute: homeTitle,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  alternates: {
    canonical: siteUrl("/"),
  },
  openGraph: {
    title: homeTitle,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    ...shareImageMetadata.openGraph,
  },
  twitter: {
    ...shareImageMetadata.twitter,
    title: homeTitle,
    description: SITE_DESCRIPTION,
  },
};

export default function Page() {
  return <Home />;
}
