import GoogleAnalyticsRouteTracker from "@/components/GoogleAnalyticsRouteTracker";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import Script from "next/script";
import { Suspense } from "react";

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname + window.location.search,
            page_location: window.location.href,
          });
        `}
      </Script>
      <Suspense fallback={null}>
        <GoogleAnalyticsRouteTracker />
      </Suspense>
    </>
  );
}
