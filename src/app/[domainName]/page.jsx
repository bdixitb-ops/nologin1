import TextEditor from "@/components/TextEditor";

/** @type {import("next").Metadata} */
export const metadata = {
  title: {
    absolute: "NoLogin Page",
  },
  description: "A private NoLogin sharing page.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DomainPage({ params }) {
  const { domainName } = await params;
  return <TextEditor domainName={domainName} />;
}
