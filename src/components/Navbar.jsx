"use client";

import { SITE_LOGO_SVG_PATH } from "@/lib/siteMetadata";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const nonEditorRoutes = new Set([
    "/",
    "/about",
    "/terms",
    "/privacy-policy",
    "/content-policy",
    "/share-text-online",
    "/upload-files-online",
    "/instant-sharing",
    "/features-of-nologin",
    "/best-online-sharing",
    "/dontpad-alternative",
    "/pastebin-alternative",
    "/hastebin-alternative",
    "/online-clipboard",
    "/cross-device-sharing",
    "/share-code-online",
    "/why-nologin",
    "/faq",
  ]);

  const isTextEditor = !nonEditorRoutes.has(pathname);

  return (
    <div className="navbar">
      {!isTextEditor && (
        <>
          <div className="navbar-left">
            <img
              className="logo"
              src={SITE_LOGO_SVG_PATH}
              alt="NoLogin"
              width={44}
              height={44}
            />
            <div className="navbar-title">
              <span className="no">No</span>
              <span className="login">Login</span>
            </div>
          </div>
        </>
      )}

      <div className="navbar-right">
        {pathname === "/" && (
          <>
            <Link href="/" className="nav-button active">
              Home
            </Link>
            <Link href="/about" className="nav-button">
              About Us
            </Link>
            <Link href="/terms" className="nav-button">
              Terms
            </Link>
          </>
        )}

        {isTextEditor && (
          <Link href="/" className="nav-button active">
            Home
          </Link>
        )}

        {pathname !== "/" && !isTextEditor && (
          <>
            <Link href="/" className="nav-button active">
              Home
            </Link>
            <Link href="/about" className="nav-button">
              About Us
            </Link>
            <Link href="/terms" className="nav-button">
              Terms
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
