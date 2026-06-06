import FastestOnlineSharing from "@/components/FastestOnlineSharing";
import { shareImageMetadata } from "@/lib/siteMetadata";

export const metadata = {
  title: {
    absolute: "Fastest Online Sharing — Share Text & Files in Seconds | NoLogin",
  },
  description:
    "The fastest way to share text, code and files online. No login, no signup, no waiting. Pick a page name, drop your content, share the link. Done in under ten seconds.",
  alternates: {
    canonical: "https://nologin.in/fastest-online-sharing",
  },
  openGraph: {
    title: "Fastest Online Sharing — Share Text & Files in Seconds | NoLogin",
    description:
      "The fastest way to share text, code and files online. No login, no signup, no waiting. Pick a page name, drop your content, share the link. Done in under ten seconds.",
    url: "https://nologin.in/fastest-online-sharing",
    ...shareImageMetadata.openGraph,
  },
  twitter: shareImageMetadata.twitter,
};

export default function FastestOnlineSharingPage() {
  return <FastestOnlineSharing />;
}
