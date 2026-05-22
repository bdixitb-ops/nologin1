import ShareCodeOnline from "@/components/ShareCodeOnline";

export const metadata = {
  title: {
    absolute: "Share Code Online — No Login, No GitHub, Instant Code Sharing | NoLogin",
  },
  description:
    "Share code online instantly without login, GitHub or any account. Perfect for temporary snippets, hackathons, pair programming and quick reviews. Free, no signup needed.",
  alternates: {
    canonical: "https://www.nologin.in/share-code-online",
  },
  openGraph: {
    title: "Share Code Online — No Login, No GitHub, Instant Code Sharing | NoLogin",
    description:
      "Share code online instantly without login, GitHub or any account. Perfect for temporary snippets, hackathons, pair programming and quick reviews. Free, no signup needed.",
    url: "https://www.nologin.in/share-code-online",
  },
};

export default function ShareCodeOnlinePage() {
  return <ShareCodeOnline />;
}
