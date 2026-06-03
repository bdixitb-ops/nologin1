export default function UrlPill({ href }) {
  const path = href.replace(/^nologin\.in\/?/, "");
  return (
    <span className="instant-page-url-pill">
      <span className="features-page-url-host">nologin.in/</span>
      <span className="features-page-url-path">{path}</span>
    </span>
  );
}
