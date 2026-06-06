import PrivacyPolicy from "@/components/PrivacyPolicy";
import { shareImageMetadata, siteUrl } from "@/lib/siteMetadata";

/** @type {import("next").Metadata} */
export const metadata = {
  title: "Privacy Policy",
  description:
    "How NoLogin handles your data — no login, no unnecessary data collection, and transparent privacy practices.",
  alternates: {
    canonical: siteUrl("/privacy-policy"),
  },
  ...shareImageMetadata,
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
