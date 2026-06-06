import ContentPolicy from "@/components/ContentPolicy";
import { shareImageMetadata, siteUrl } from "@/lib/siteMetadata";

/** @type {import("next").Metadata} */
export const metadata = {
  title: "Content Policy",
  description:
    "NoLogin content policy — what is and is not allowed when sharing text and files on nologin.in.",
  alternates: {
    canonical: siteUrl("/content-policy"),
  },
  ...shareImageMetadata,
};

export default function ContentPolicyPage() {
  return <ContentPolicy />;
}
