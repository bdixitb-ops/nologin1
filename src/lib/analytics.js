/**
 * GA4 measurement ID for gtag (site-wide pageviews).
 * Matches legacy index.html — do not use Firebase measurementId here; that env
 * value (G-Y1C9PFJXS1) is a separate Firebase-linked property.
 */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-32R7GHP6H5";

/** @param {string} [pagePath] */
export function trackGaPageView(pagePath) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return false;
  }

  const path = pagePath || `${window.location.pathname}${window.location.search}`;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: path,
    page_location: `${window.location.origin}${path}`,
  });
  return true;
}
