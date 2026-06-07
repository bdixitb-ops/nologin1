"use client";

import { trackGaPageView } from "@/lib/analytics";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function GoogleAnalyticsRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPath = useRef(null);

  useEffect(() => {
    const query = searchParams?.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    if (lastTrackedPath.current === pagePath) return;
    lastTrackedPath.current = pagePath;

    if (trackGaPageView(pagePath)) return;

    const intervalId = window.setInterval(() => {
      if (trackGaPageView(pagePath)) {
        window.clearInterval(intervalId);
      }
    }, 100);

    return () => window.clearInterval(intervalId);
  }, [pathname, searchParams]);

  return null;
}
