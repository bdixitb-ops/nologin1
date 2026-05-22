import About from "@/components/About";

/** @type {import("next").Metadata} */
export const metadata = {
  title: "About",
  description:
    "Our story: why NoLogin exists — instant text and file sharing without accounts, built from a real computer-lab frustration.",
};

export default function AboutPage() {
  return <About />;
}
