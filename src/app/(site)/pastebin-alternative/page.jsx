import PastebinAlternative from "@/components/PastebinAlternative";
import { shareImageMetadata } from "@/lib/siteMetadata";

export const metadata = {
  title: {
    absolute: "Pastebin Alternative — Free Text & File Sharing Without Login | NoLogin",
  },
  description:
    "Looking for a Pastebin alternative? NoLogin offers instant text and file sharing with no login, custom page names, password protection and expiry control. Free forever.",
  alternates: {
    canonical: "https://nologin.in/pastebin-alternative",
  },
  openGraph: {
    title: "Pastebin Alternative — Free Text & File Sharing Without Login | NoLogin",
    description:
      "Looking for a Pastebin alternative? NoLogin offers instant text and file sharing with no login, custom page names, password protection and expiry control. Free forever.",
    url: "https://nologin.in/pastebin-alternative",
    ...shareImageMetadata.openGraph,
  },
  twitter: shareImageMetadata.twitter,
};

export default function PastebinAlternativePage() {
  return <PastebinAlternative />;
}
