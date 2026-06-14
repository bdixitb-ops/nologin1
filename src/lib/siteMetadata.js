export const SITE_URL = "https://nologin.in";
export const SITE_NAME = "NoLogin";
/** Set to empty string to hide the top announcement marquee */
export const SITE_ANNOUNCEMENT =
  "Files uploads are working again. Sorry for the inconvenience.";
export const GOOGLE_ADSENSE_ACCOUNT = "ca-pub-4787043505524485";
/** Transparent vector logo for in-app UI (header, footer, navbar) */
export const SITE_LOGO_SVG_PATH = "/nologin-logo-icon.svg";
export const SITE_TAGLINE = "Instant File & Text Sharing Without Login";
export const SITE_DESCRIPTION =
  "Share text, code and files instantly at nologin.in/yourpagename — no login, no signup, no account. Password protection, edit lock, file uploads up to 100MB, and auto expiry. Free forever.";
export const SITE_KEYWORDS = [
  "NoLogin",
  "nologin.in",
  "share text online",
  "share files online",
  "share code online",
  "instant file sharing",
  "instant text sharing",
  "no login file sharing",
  "no signup sharing",
  "anonymous file sharing",
  "secure file sharing",
  "pastebin alternative",
  "hastebin alternative",
  "dontpad alternative",
  "online notepad",
  "online clipboard",
  "cross device sharing",
  "share without account",
  "temporary file sharing",
  "free file upload",
];

/** Social / OG preview — dark 1200x630 card (WhatsApp/Twitter ignore PNG transparency) */
export const SITE_OG_IMAGE_PATH = "/og-image.png";
export const SITE_OG_IMAGE_URL = `${SITE_URL}${SITE_OG_IMAGE_PATH}`;
/** Square logo for JSON-LD / Google (social uses og-image.png above) */
export const SITE_LOGO_PNG_URL = `${SITE_URL}/android-chrome-512x512.png`;

export const siteOgImage = {
  url: SITE_OG_IMAGE_URL,
  width: 1200,
  height: 630,
  alt: SITE_NAME,
};

export const shareImageMetadata = {
  openGraph: {
    images: [siteOgImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [SITE_OG_IMAGE_URL],
  },
};

export const siteIconMetadata = {
  icon: [
    { url: "/favicon.ico", sizes: "any" },
    { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
  ],
  apple: "/apple-touch-icon.png",
};

/** @param {string} path */
export function siteUrl(path = "") {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export const siteOrganizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: SITE_LOGO_PNG_URL,
  email: "nologin044@gmail.com",
  sameAs: ["https://www.instagram.com/nologin.in"],
};

export const siteWebSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
};

export const siteWebApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Instant text sharing without login",
    "File uploads up to 100MB",
    "Password protection",
    "Edit lock",
    "Auto expiry",
    "Cross-device access via page name",
  ],
};
