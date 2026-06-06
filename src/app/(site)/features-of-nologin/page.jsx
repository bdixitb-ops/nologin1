import FeaturesOfNoLogin from "@/components/FeaturesOfNoLogin";
import { shareImageMetadata } from "@/lib/siteMetadata";

export const metadata = {
  title: {
    absolute: "Features of NoLogin — Instant Sharing Without Login | NoLogin",
  },
  description:
    "Explore NoLogin's features — instant file and text sharing, password protection, edit lock, expiry control and real-time collaboration. No login, no signup, free forever.",
  alternates: {
    canonical: "https://nologin.in/features-of-nologin",
  },
  openGraph: {
    title: "Features of NoLogin — Instant Sharing Without Login | NoLogin",
    description:
      "Explore NoLogin's features — instant file and text sharing, password protection, edit lock, expiry control and real-time collaboration. No login, no signup, free forever.",
    url: "https://nologin.in/features-of-nologin",
    ...shareImageMetadata.openGraph,
  },
  twitter: shareImageMetadata.twitter,
};

export default function FeaturesPage() {
  return <FeaturesOfNoLogin />;
}
