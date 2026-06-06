import NoSignupSharing from "@/components/NoSignupSharing";
import { shareImageMetadata } from "@/lib/siteMetadata";

export const metadata = {
  title: {
    absolute: "Share Files & Text Online Without Signup — Free, Instant | NoLogin",
  },
  description:
    "Share text, code and files online without signup, without login, without any account. Pick a page name, drop your content, share the link. Free forever.",
  alternates: {
    canonical: "https://nologin.in/no-signup-sharing",
  },
  openGraph: {
    title: "Share Files & Text Online Without Signup — Free, Instant | NoLogin",
    description:
      "Share text, code and files online without signup, without login, without any account. Pick a page name, drop your content, share the link. Free forever.",
    url: "https://nologin.in/no-signup-sharing",
    ...shareImageMetadata.openGraph,
  },
  twitter: shareImageMetadata.twitter,
};

export default function NoSignupSharingPage() {
  return <NoSignupSharing />;
}
