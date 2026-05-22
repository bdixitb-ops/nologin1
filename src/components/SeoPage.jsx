"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function SeoPage({ containerClass, title, subtitle, blocks }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate");
          else entry.target.classList.remove("animate");
        });
      },
      { threshold: 0.1 },
    );
    const animatedElements = document.querySelectorAll(".fade-up");
    animatedElements.forEach((el) => observer.observe(el));
    return () => animatedElements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div className={containerClass}>
      <div className="hero-section">
        <h1 className="hero-title fade-up custom-font">{title}</h1>
        {subtitle ? <p className="hero-subtitle fade-up">{subtitle}</p> : null}
      </div>

      <div className="content-section">
        {blocks.map((block, index) => (
          <div key={index} className="faq-item fade-up">
            <h2 className="custom-font">{block.heading}</h2>
            {block.paragraphs?.map((p, pIdx) => (
              <p key={pIdx}>{p}</p>
            ))}
            {block.items?.length ? (
              <ul className="features-list">
                {block.items.map((item, iIdx) => (
                  <li key={iIdx}>{item}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>

      <footer className="seo-footer fade-up">
        <div className="footer-links-section">
          <h3 className="custom-font">Resources</h3>
          <div className="footer-links-grid">
            <Link href="/share-text-online" className="footer-link">Share Text Online</Link>
            <Link href="/upload-files-online" className="footer-link">Upload Files Online</Link>
            <Link href="/instant-sharing" className="footer-link">Instant Sharing</Link>
            <Link href="/features-of-nologin" className="footer-link">Features of NoLogin</Link>
            <Link href="/best-online-sharing" className="footer-link">Best Online Sharing</Link>
            <Link href="/faq" className="footer-link">FAQ</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 NoLogin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
