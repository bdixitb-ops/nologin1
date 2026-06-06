import {
  siteOrganizationJsonLd,
  siteWebApplicationJsonLd,
  siteWebSiteJsonLd,
} from "@/lib/siteMetadata";

export default function SiteJsonLd() {
  const schemas = [siteOrganizationJsonLd, siteWebSiteJsonLd, siteWebApplicationJsonLd];

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
