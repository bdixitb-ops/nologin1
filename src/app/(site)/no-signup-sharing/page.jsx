import NoSignupSharing from "@/components/NoSignupSharing";

export const metadata = {
  title: {
    absolute: "Share Files & Text Online Without Signup — Free, Instant | NoLogin",
  },
  description:
    "Share text, code and files online without signup, without login, without any account. Pick a page name, drop your content, share the link. Free forever.",
  alternates: {
    canonical: "https://www.nologin.in/no-signup-sharing",
  },
  openGraph: {
    title: "Share Files & Text Online Without Signup — Free, Instant | NoLogin",
    description:
      "Share text, code and files online without signup, without login, without any account. Pick a page name, drop your content, share the link. Free forever.",
    url: "https://www.nologin.in/no-signup-sharing",
  },
};

export default function NoSignupSharingPage() {
  return <NoSignupSharing />;
}
