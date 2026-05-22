import TextEditor from "@/components/TextEditor";

export default async function DomainPage({ params }) {
  const { domainName } = await params;
  return <TextEditor domainName={domainName} />;
}
