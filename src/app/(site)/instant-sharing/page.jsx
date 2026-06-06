import InstantSharing from "@/components/InstantSharing";
import { shareImageMetadata } from "@/lib/siteMetadata";

export const metadata = {
  title: {
    absolute: "Instant Sharing Online — Share Files, Text & Code in Seconds | NoLogin",
  },
  description:
    "Share text, code and files instantly online — no login, no signup, no account needed. Create a page, drop your content, share the link. Done in seconds.",
  alternates: {
    canonical: "https://nologin.in/instant-sharing",
  },
  ...shareImageMetadata,
};

export default function InstantSharingPage() {
  return <InstantSharing />;
}
