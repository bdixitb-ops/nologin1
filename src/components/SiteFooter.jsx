import Link from "next/link";
import FooterLogoHomeLink from "./FooterLogoHomeLink";

export default function SiteFooter() {
  return (
    <footer className="home-v2-footer">
      <div className="home-v2-footer-grid">
        <div className="home-v2-footer-col home-v2-footer-brand-col">
          <FooterLogoHomeLink />
          <p className="home-v2-footer-brand-copy">The fastest way to share online.</p>
          <p className="home-v2-footer-brand-since">Since Nov 2024</p>
        </div>

        <div className="home-v2-footer-col">
          <h4>Quick Links</h4>
          <Link href="/about">About</Link>
          <Link href="/features-of-nologin">Features</Link>
          <Link href="/why-nologin">Why NoLogin</Link>
          <Link href="/faq">FAQ</Link>
        </div>

        <div className="home-v2-footer-col">
          <h4>Resources</h4>
          <Link href="/instant-sharing">Instant Sharing</Link>
          <Link href="/share-text-online">Share Text Online</Link>
          <Link href="/upload-files-online">Upload Files Online</Link>
          <Link href="/cross-device-sharing">Cross Device Sharing</Link>
        </div>

        <div className="home-v2-footer-col">
          <h4>Explore</h4>
          <Link href="/dontpad-alternative">Dontpad Alternative</Link>
          <Link href="/pastebin-alternative">Pastebin Alternative</Link>
          <Link href="/online-clipboard">Online Clipboard</Link>
          <Link href="/share-code-online">Share Code Online</Link>
        </div>

        <div className="home-v2-footer-col">
          <h4>Policies</h4>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/content-policy">Content Policy</Link>
        </div>

        <div className="home-v2-footer-col">
          <h4>Contact</h4>
          <a href="mailto:nologin044@gmail.com">Email</a>
          <a href="https://www.instagram.com/nologin.in" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href="https://www.linkedin.com/company/nologin-in/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>

      <div className="home-v2-footer-bottom">
        <p className="home-v2-footer-bottom-line">© 2026 NoLogin. All rights reserved.</p>
        <p className="home-v2-footer-bottom-line">Made in Bengaluru 🇮🇳</p>
        <p className="home-v2-footer-bottom-line">
          Built by{" "}
          <a href="https://www.linkedin.com/in/deekshith2912/" target="_blank" rel="noopener noreferrer">
            Deekshith B
          </a>
        </p>
      </div>
    </footer>
  );
}
