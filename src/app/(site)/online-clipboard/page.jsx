import OnlineClipboard from "@/components/OnlineClipboard";
import { shareImageMetadata } from "@/lib/siteMetadata";

export const metadata = {
  title: {
    absolute: "Online Clipboard — Share Text & Files Across Devices Without Login | NoLogin",
  },
  description:
    "Use NoLogin as a free online clipboard to share text, code and files across devices instantly. No login, no app, no cable. Just open the same page name on any device.",
  alternates: {
    canonical: "https://nologin.in/online-clipboard",
  },
  openGraph: {
    title: "Online Clipboard — Share Text & Files Across Devices Without Login | NoLogin",
    description:
      "Use NoLogin as a free online clipboard to share text, code and files across devices instantly. No login, no app, no cable. Just open the same page name on any device.",
    url: "https://nologin.in/online-clipboard",
    ...shareImageMetadata.openGraph,
  },
  twitter: shareImageMetadata.twitter,
};

export default function OnlineClipboardPage() {
  return <OnlineClipboard />;
}
