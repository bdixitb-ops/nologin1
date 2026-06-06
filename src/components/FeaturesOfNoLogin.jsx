"use client";

import { ChevronRight, Download, FileText, Laptop, Monitor, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function FeatureIcon({ src, alt = "" }) {
  return (
    <div className="features-page-spotlight-icon-wrap">
      <Image src={src} alt={alt} width={40} height={40} className="features-page-spotlight-icon-img" unoptimized />
    </div>
  );
}

function SpotlightCopy({ id, iconSrc, title, body, meta }) {
  return (
    <div className="features-page-spotlight-copy">
      <FeatureIcon src={iconSrc} />
      <h2 id={id}>{title}</h2>
      <p className="features-page-spotlight-body">{body}</p>
      {meta ? <p className="features-page-spotlight-meta">{meta}</p> : null}
    </div>
  );
}

function VisualLabel({ children }) {
  return <p className="features-page-spotlight-visual-label">{children}</p>;
}

function VisualFoot({ children }) {
  return <p className="features-page-spotlight-visual-foot">{children}</p>;
}

function TextFilesVisual() {
  return (
    <div className="features-page-spotlight-visual features-page-spotlight-visual--panel" aria-hidden>
      <VisualLabel>TEXT ABOVE · FILES BELOW · ONE LINK</VisualLabel>
      <div className="features-page-mock-browser">
        <div className="features-page-mock-chrome">
          <span className="features-page-mock-dot" />
          <span className="features-page-mock-dot" />
          <span className="features-page-mock-dot" />
          <span className="features-page-mock-url">
            <span className="features-page-url-host">nologin.in/</span>
            <span className="features-page-url-path">labnotes</span>
          </span>
        </div>
        <div className="features-page-mock-section">
          <span className="features-page-mock-section-label">TEXT</span>
          <pre className="features-page-mock-code">
            <code>
              {`const solve = (arr) => {\n  return arr.filter(x => x > 0)\n    .map(x => x * 2);`}
              <span className="features-page-code-cursor" aria-hidden />
            </code>
          </pre>
        </div>
        <div className="features-page-mock-divider" />
        <div className="features-page-mock-section">
          <span className="features-page-mock-section-label">FILES (1 OF 5)</span>
          <div className="features-page-mock-file">
            <FileText className="features-page-mock-file-icon" strokeWidth={1.5} aria-hidden />
            <div className="features-page-mock-file-info">
              <span className="features-page-mock-file-name">assignment_q2.pdf</span>
              <span className="features-page-mock-file-size">2.4 MB</span>
            </div>
            <Download className="features-page-mock-file-dl" strokeWidth={1.5} aria-hidden />
          </div>
        </div>
      </div>
      <VisualFoot>one link · text + files</VisualFoot>
    </div>
  );
}

function CollaborationVisual() {
  return (
    <div className="features-page-spotlight-visual features-page-spotlight-visual--panel" aria-hidden>
      <VisualLabel>ONE PAGE · MULTIPLE VIEWERS</VisualLabel>
      <div className="features-page-mock-card">
        <p className="features-page-mock-card-url">
          <span className="features-page-url-host">nologin.in/</span>
          <span className="features-page-url-path">shared</span>
        </p>
        <div className="features-page-mock-lines">
          <span />
          <span />
          <span />
        </div>
        <p className="features-page-mock-viewing">
          <span className="features-page-mock-viewing-dot" aria-hidden />
          viewing now
        </p>
      </div>
      <div className="features-page-mock-devices">
        <span>phone</span>
        <span>laptop</span>
        <span>monitor</span>
        <span className="features-page-mock-devices-more">+ anyone with the link</span>
      </div>
    </div>
  );
}

function ExpiryVisual() {
  const bars = [
    { label: "1 hr", width: "22%" },
    { label: "6 hrs", width: "38%" },
    { label: "24 hrs", width: "55%" },
    { label: "48 hrs", width: "72%", active: true },
    { label: "7 days", width: "88%" },
  ];

  return (
    <div className="features-page-spotlight-visual features-page-spotlight-visual--panel" aria-hidden>
      <VisualLabel>SET IT · FORGET IT · GONE</VisualLabel>
      <ul className="features-page-expiry-bars">
        {bars.map((bar) => (
          <li key={bar.label} className={bar.active ? "is-active" : undefined}>
            <span className="features-page-expiry-label">
              {bar.label}
              {bar.active ? <span className="features-page-expiry-default">default</span> : null}
            </span>
            <span className="features-page-expiry-track">
              <span className="features-page-expiry-fill" style={{ width: bar.width }} />
            </span>
          </li>
        ))}
      </ul>
      <VisualFoot>48 hours is the default</VisualFoot>
    </div>
  );
}

function PasswordVisual() {
  return (
    <div className="features-page-spotlight-visual features-page-spotlight-visual--panel" aria-hidden>
      <VisualLabel>YOU CONTROL WHO SEES IT</VisualLabel>
      <div className="features-page-password-rows">
        <div className="features-page-password-row">
          <span>has the password</span>
          <span className="features-page-password-ok">✓ can view</span>
        </div>
        <div className="features-page-password-row">
          <span>no password</span>
          <span className="features-page-password-no">✗ blocked</span>
        </div>
      </div>
      <VisualFoot>optional · takes just 5 seconds to set</VisualFoot>
    </div>
  );
}

function EditLockVisual() {
  const rows = [
    { label: "View content", status: "allowed", ok: true },
    { label: "Copy text", status: "allowed", ok: true },
    { label: "Download files", status: "allowed", ok: true },
    { label: "Edit content", status: "blocked", ok: false },
    { label: "Delete page", status: "blocked", ok: false },
    { label: "Upload files", status: "blocked", ok: false },
  ];

  return (
    <div className="features-page-spotlight-visual features-page-spotlight-visual--panel" aria-hidden>
      <VisualLabel>WHAT VISITORS CAN DO</VisualLabel>
      <ul className="features-page-permissions">
        {rows.map((row) => (
          <li key={row.label}>
            <span>{row.label}</span>
            <span className={row.ok ? "features-page-perm-ok" : "features-page-perm-no"}>
              {row.ok ? "✓" : "✗"} {row.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DeviceVisual() {
  return (
    <div className="features-page-spotlight-visual" aria-hidden>
      <VisualLabel>SAME PAGE NAME · ANY DEVICE</VisualLabel>
      <div className="features-page-device-flow">
        <div className="features-page-device-node">
          <Smartphone className="features-page-device-node-icon" strokeWidth={1.5} aria-hidden />
          <span>Phone</span>
        </div>
        <ChevronRight className="features-page-device-arrow" aria-hidden />
        <div className="features-page-device-node">
          <Laptop className="features-page-device-node-icon" strokeWidth={1.5} aria-hidden />
          <span>Laptop</span>
        </div>
        <ChevronRight className="features-page-device-arrow" aria-hidden />
        <div className="features-page-device-node">
          <Monitor className="features-page-device-node-icon" strokeWidth={1.5} aria-hidden />
          <span>Monitor</span>
        </div>
      </div>
      <p className="features-page-device-url">
        <span className="features-page-url-host">nologin.in</span>
        <span className="features-page-url-path">/yourpagename</span>
      </p>
      <VisualFoot>same link · same content · instant access</VisualFoot>
    </div>
  );
}

export default function FeaturesOfNoLogin() {
  return (
    <div className="about-page features-page">
      <div className="about-page-inner">
        <section className="about-page-hero">
          <p className="about-page-kicker">FEATURES</p>
          <h1 className="about-page-title">
            <span className="about-page-title-row about-page-title-strong">Everything you</span>
            <span className="about-page-title-row">
              <span className="about-page-title-accent">need</span>
              <span className="about-page-title-strong">.</span>
            </span>
            <span className="about-page-title-row about-page-title-muted">Nothing you don&apos;t.</span>
          </h1>
          <p className="features-page-hero-sub">Instant sharing with the controls that actually matter.</p>
        </section>

        <section className="features-page-spotlight" aria-labelledby="features-device-heading">
          <SpotlightCopy
            id="features-device-heading"
            iconSrc="/feature-any-device.svg"
            title="Works on any device."
            body="Phone, laptop, tablet, lab computer — the same page name works everywhere. Any OS, any browser. No app to install, no account to sign into on either device."
            meta="iOS · Android · Windows · Mac · Linux · Chromebook"
          />
          <DeviceVisual />
        </section>

        <section className="features-page-spotlight" aria-labelledby="features-text-files-heading">
          <SpotlightCopy
            id="features-text-files-heading"
            iconSrc="/feature-file-text.svg"
            title="Text + files together."
            body="Paste your notes and upload the related files on the same page. One link for everything — no second message for the attachment, no separate folder to share."
            meta="Up to 5 files · 100MB each · free"
          />
          <TextFilesVisual />
        </section>

        <section className="features-page-spotlight" aria-labelledby="features-expiry-heading">
          <SpotlightCopy
            id="features-expiry-heading"
            iconSrc="/feature-auto-expiry.svg"
            title="Auto expiry."
            body="Set your content to delete itself. Nothing stays online longer than you need it. Content disappears automatically — no cleanup, no forgotten links sitting online."
            meta="1hr · 6hrs · 24hrs · 48hrs · 7days"
          />
          <ExpiryVisual />
        </section>

        <section className="features-page-spotlight" aria-labelledby="features-password-heading">
          <SpotlightCopy
            id="features-password-heading"
            iconSrc="/feature-password.svg"
            title="Password protect."
            body="Restrict who can view your page. Set a password and only people with it can open your content. Optional, takes just 5 seconds. The link still works — the password is the gate."
            meta="View-only access control · optional"
          />
          <PasswordVisual />
        </section>

        <section className="features-page-spotlight" aria-labelledby="features-editlock-heading">
          <SpotlightCopy
            id="features-editlock-heading"
            iconSrc="/feature-edit-lock.svg"
            title="Edit lock."
            body="Make your page read-only. Visitors can view and copy text, download files — but cannot edit, delete or upload anything. Your content stays exactly as you left it."
            meta="View ✓ · Copy ✓ · Edit ✗ · Delete ✗"
          />
          <EditLockVisual />
        </section>

        <section className="features-page-spotlight" aria-labelledby="features-collab-heading">
          <SpotlightCopy
            id="features-collab-heading"
            iconSrc="/feature-collaborate.svg"
            title="Real-time collaboration."
            body="Share the page name and everyone with it can view the same content. Multiple people, same page, always the latest version. No account needed on any end."
            meta="Share the page name · anyone can open it"
          />
          <CollaborationVisual />
        </section>

        <div className="about-page-grid about-page-mission">
          <div className="about-page-cell about-page-mission-copy">
            <p className="about-page-mission-lead">
              Everything you need to share anything{" "}
              <span className="about-page-mission-accent">instantly.</span>
            </p>
            <p className="about-page-mission-sub">No account. No friction. No cleanup. Just a page name.</p>
          </div>
          <div className="about-page-cell about-page-mission-cta">
            <Link href="/" className="about-page-cta">
              Try NoLogin →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
