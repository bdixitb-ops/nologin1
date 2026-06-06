import SiteJsonLd from "@/components/SiteJsonLd";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  shareImageMetadata,
  siteIconMetadata,
} from "@/lib/siteMetadata";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import "./legacy.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const defaultTitle = `${SITE_NAME} | ${SITE_TAGLINE}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: defaultTitle,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    ...shareImageMetadata.openGraph,
  },
  twitter: {
    ...shareImageMetadata.twitter,
    title: defaultTitle,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: siteIconMetadata,
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "black-translucent",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body suppressHydrationWarning>
        <SiteJsonLd />
        {children}
      </body>
    </html>
  );
}
