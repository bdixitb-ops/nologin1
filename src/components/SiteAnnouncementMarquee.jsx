import { SITE_ANNOUNCEMENT } from "@/lib/siteMetadata";

export default function SiteAnnouncementMarquee() {
  if (!SITE_ANNOUNCEMENT?.trim()) {
    return null;
  }

  const message = SITE_ANNOUNCEMENT.trim();
  const items = Array.from({ length: 4 }, (_, index) => (
    <span key={index} className="site-announcement-item" aria-hidden={index > 0}>
      {message}
    </span>
  ));

  return (
    <div className="site-announcement" role="status" aria-live="polite">
      <div className="site-announcement-viewport">
        <div className="site-announcement-track">{items}</div>
        <p className="site-announcement-static">{message}</p>
      </div>
    </div>
  );
}
