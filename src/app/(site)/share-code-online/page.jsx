import ShareCodeOnline from "@/components/ShareCodeOnline";
import { shareImageMetadata } from "@/lib/siteMetadata";

export const metadata = {
  title: {
    absolute: "Share Code Online — No Login, No GitHub, Instant Code Sharing | NoLogin",
  },
  description:
    "Share code online instantly without login, GitHub or any account. Perfect for temporary snippets, hackathons, pair programming and quick reviews. Free, no signup needed.",
  alternates: {
    canonical: "https://nologin.in/share-code-online",
  },
  openGraph: {
    title: "Share Code Online — No Login, No GitHub, Instant Code Sharing | NoLogin",
    description:
      "Share code online instantly without login, GitHub or any account. Perfect for temporary snippets, hackathons, pair programming and quick reviews. Free, no signup needed.",
    url: "https://nologin.in/share-code-online",
    ...shareImageMetadata.openGraph,
  },
  twitter: shareImageMetadata.twitter,
};

export default function ShareCodeOnlinePage() {
  return <ShareCodeOnline />;
}
