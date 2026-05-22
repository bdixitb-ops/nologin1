import FastestOnlineSharing from "@/components/FastestOnlineSharing";

export const metadata = {
  title: {
    absolute: "Fastest Online Sharing — Share Text & Files in Seconds | NoLogin",
  },
  description:
    "The fastest way to share text, code and files online. No login, no signup, no waiting. Pick a page name, drop your content, share the link. Done in under ten seconds.",
  alternates: {
    canonical: "https://www.nologin.in/fastest-online-sharing",
  },
  openGraph: {
    title: "Fastest Online Sharing — Share Text & Files in Seconds | NoLogin",
    description:
      "The fastest way to share text, code and files online. No login, no signup, no waiting. Pick a page name, drop your content, share the link. Done in under ten seconds.",
    url: "https://www.nologin.in/fastest-online-sharing",
  },
};

export default function FastestOnlineSharingPage() {
  return <FastestOnlineSharing />;
}
