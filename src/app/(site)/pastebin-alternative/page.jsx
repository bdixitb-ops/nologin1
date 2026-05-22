import PastebinAlternative from "@/components/PastebinAlternative";

export const metadata = {
  title: {
    absolute: "Pastebin Alternative — Free Text & File Sharing Without Login | NoLogin",
  },
  description:
    "Looking for a Pastebin alternative? NoLogin offers instant text and file sharing with no login, custom page names, password protection and expiry control. Free forever.",
  alternates: {
    canonical: "https://www.nologin.in/pastebin-alternative",
  },
  openGraph: {
    title: "Pastebin Alternative — Free Text & File Sharing Without Login | NoLogin",
    description:
      "Looking for a Pastebin alternative? NoLogin offers instant text and file sharing with no login, custom page names, password protection and expiry control. Free forever.",
    url: "https://www.nologin.in/pastebin-alternative",
  },
};

export default function PastebinAlternativePage() {
  return <PastebinAlternative />;
}
