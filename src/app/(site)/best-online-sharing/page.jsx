import BestOnlineSharing from "@/components/BestOnlineSharing";
import { shareImageMetadata, siteUrl } from "@/lib/siteMetadata";

/** @type {import("next").Metadata} */
export const metadata = {
  title: "Best Online Sharing",
  description:
    "How NoLogin compares to DontPad, Pastebin, Dropbox and other sharing tools — instant text and file sharing without login.",
  alternates: {
    canonical: siteUrl("/best-online-sharing"),
  },
  ...shareImageMetadata,
};

export default function BestOnlineSharingPage() {
  return <BestOnlineSharing />;
}
