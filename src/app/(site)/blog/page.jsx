import { Lora } from "next/font/google";
import Blog from "@/components/Blog";
import { shareImageMetadata } from "@/lib/siteMetadata";

const blogHeading = Lora({
  subsets: ["latin"],
  variable: "--font-blog-heading",
  display: "swap",
});

export const metadata = {
  title: {
    absolute: "The NoLogin Blog | News & guides from the team",
  },
  description:
    "Updates, tips, and articles from the NoLogin team about instant sharing, privacy-friendly workflows, and tools for sharing text and files without an account.",
  alternates: {
    canonical: "https://nologin.in/blog",
  },
  openGraph: {
    title: "The NoLogin Blog | News & guides from the team",
    description:
      "Updates and articles from the NoLogin team about sharing text and files online without logging in.",
    url: "https://nologin.in/blog",
    ...shareImageMetadata.openGraph,
  },
  twitter: shareImageMetadata.twitter,
};

export default function BlogPage() {
  return (
    <div className={blogHeading.variable}>
      <Blog />
    </div>
  );
}
