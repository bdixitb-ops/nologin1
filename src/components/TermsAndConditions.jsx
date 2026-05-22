"use client";

import Link from "next/link";
import { useEffect } from "react";

const TermsAndConditions = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate");
          else entry.target.classList.remove("animate");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    );
    const animatedElements = document.querySelectorAll(".fade-up");
    animatedElements.forEach((el) => observer.observe(el));
    return () => animatedElements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div className="terms-container">
      <div className="terms-hero">
        <h1 className="terms-title fade-up custom-font">
          Terms & <span className="purple">Con</span>
          <span className="orange">ditions</span> - NoLogin
        </h1>
        <p className="terms-subtitle fade-up">Understanding Your Rights and Responsibilities on NoLogin</p>
      </div>
      <div className="terms-content">
        <div className="terms-intro fade-up">
          <h2 className="custom-font">Legal Agreement</h2>
          <p>
            Welcome to NoLogin, a platform designed for seamless and secure sharing of text and documents without
            requiring login credentials.
          </p>
        </div>
      </div>
      <footer className="terms-footer fade-up">
        <div className="footer-section">
          <h2 className="custom-font">Questions About Our Terms?</h2>
          <p>If you need clarification, contact support@nologin.com</p>
        </div>
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
        <div className="terms-copyright">
          <p>© 2024 NoLogin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TermsAndConditions;
