import HastebinAlternative from "@/components/HastebinAlternative";

export const metadata = {
  title: {
    absolute: "Hastebin Alternative — Free Text & File Sharing Without Login | NoLogin",
  },
  description:
    "Hastebin is no longer available. NoLogin is the best Hastebin alternative — instant text and file sharing, no login, custom page names, password protection and expiry control.",
  alternates: {
    canonical: "https://www.nologin.in/hastebin-alternative",
  },
  openGraph: {
    title: "Hastebin Alternative — Free Text & File Sharing Without Login | NoLogin",
    description:
      "Hastebin is no longer available. NoLogin is the best Hastebin alternative — instant text and file sharing, no login, custom page names, password protection and expiry control.",
    url: "https://www.nologin.in/hastebin-alternative",
  },
};

export default function HastebinAlternativePage() {
  return <HastebinAlternative />;
}
