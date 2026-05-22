import OnlineClipboard from "@/components/OnlineClipboard";

export const metadata = {
  title: {
    absolute: "Online Clipboard — Share Text & Files Across Devices Without Login | NoLogin",
  },
  description:
    "Use NoLogin as a free online clipboard to share text, code and files across devices instantly. No login, no app, no cable. Just open the same page name on any device.",
  alternates: {
    canonical: "https://www.nologin.in/online-clipboard",
  },
  openGraph: {
    title: "Online Clipboard — Share Text & Files Across Devices Without Login | NoLogin",
    description:
      "Use NoLogin as a free online clipboard to share text, code and files across devices instantly. No login, no app, no cable. Just open the same page name on any device.",
    url: "https://www.nologin.in/online-clipboard",
  },
};

export default function OnlineClipboardPage() {
  return <OnlineClipboard />;
}
