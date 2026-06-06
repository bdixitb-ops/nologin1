import DontpadAlternative from "@/components/DontpadAlternative";
import { shareImageMetadata } from "@/lib/siteMetadata";

export const metadata = {
  title: {
    absolute: "Dontpad Alternative — Better File & Text Sharing Without Login | NoLogin",
  },
  description:
    "Looking for a Dontpad alternative? NoLogin offers everything Dontpad does plus file uploads, password protection, edit lock and expiry control — all free, no login needed.",
  alternates: {
    canonical: "https://nologin.in/dontpad-alternative",
  },
  openGraph: {
    title: "Dontpad Alternative — Better File & Text Sharing Without Login | NoLogin",
    description:
      "Looking for a Dontpad alternative? NoLogin offers everything Dontpad does plus file uploads, password protection, edit lock and expiry control — all free, no login needed.",
    url: "https://nologin.in/dontpad-alternative",
    ...shareImageMetadata.openGraph,
  },
  twitter: shareImageMetadata.twitter,
};

export default function DontpadAlternativePage() {
  return <DontpadAlternative />;
}
