import FAQ from "@/components/FAQ";

/** @type {import("next").Metadata} */
export const metadata = {
  title: "FAQ",
  description:
    "Answers about NoLogin — page names, files, privacy, password protection, edit lock, and auto expiry. No account needed.",
};

export default function FaqPage() {
  return <FAQ />;
}
