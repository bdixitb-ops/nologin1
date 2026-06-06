import Terms from "@/components/Terms";
import { shareImageMetadata, siteUrl } from "@/lib/siteMetadata";

/** @type {import("next").Metadata} */
export const metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for using NoLogin — your rights, responsibilities, and acceptable use of the platform.",
  alternates: {
    canonical: siteUrl("/terms"),
  },
  ...shareImageMetadata,
};

export default function TermsPage() {
  return <Terms />;
}
