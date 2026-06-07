"use client";

import { GA_MEASUREMENT_ID } from "@/components/GoogleAnalytics";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function trackPageView(pagePath) {
  if (typeof window.gtag !== "function") return false;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: pagePath,
  });
  return true;
}

export default function GoogleAnalyticsRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams?.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    if (trackPageView(pagePath)) return;

    const intervalId = window.setInterval(() => {
      if (trackPageView(pagePath)) {
        window.clearInterval(intervalId);
      }
    }, 200);

    return () => window.clearInterval(intervalId);
  }, [pathname, searchParams]);

  return null;
}
