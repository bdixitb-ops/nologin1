import ShareTextOnline from "@/components/ShareTextOnline";
import { shareImageMetadata } from "@/lib/siteMetadata";

export const metadata = {
  title: {
    absolute: "Share Text Online — No Login, No Signup, Free | NoLogin",
  },
  description:
    "Share text online instantly — no login, no signup, no account needed. Paste your text, pick a page name, share the link. Works on any device, free forever.",
  alternates: {
    canonical: "https://nologin.in/share-text-online",
  },
  ...shareImageMetadata,
};

export default function ShareTextOnlinePage() {
  return <ShareTextOnline />;
}
