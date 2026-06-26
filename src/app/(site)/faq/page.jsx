import FAQ from "@/components/FAQ";
import { shareImageMetadata, siteUrl } from "@/lib/siteMetadata";

/** @type {import("next").Metadata} */
export const metadata = {
  title: "FAQ",
  description:
    "Answers about NoLogin — page names, files, privacy, password protection, edit lock, time lock, and auto expiry. No account needed.",
  alternates: {
    canonical: siteUrl("/faq"),
  },
  ...shareImageMetadata,
};

export default function FaqPage() {
  return <FAQ />;
}
