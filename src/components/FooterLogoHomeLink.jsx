"use client";

import { SITE_LOGO_SVG_PATH } from "@/lib/siteMetadata";
import { usePathname } from "next/navigation";

export default function FooterLogoHomeLink() {
  const pathname = usePathname();

  return (
    <a
      href="/#home-hero"
      className="home-v2-footer-logo-link"
      aria-label="NoLogin — back to top"
      onClick={(e) => {
        if (pathname === "/") {
          e.preventDefault();
          document.getElementById("home-hero")?.scrollIntoView({ behavior: "smooth" });
        }
      }}
    >
      <img
        src={SITE_LOGO_SVG_PATH}
        alt=""
        width={44}
        height={44}
        className="home-v2-footer-logo"
      />
    </a>
  );
}
