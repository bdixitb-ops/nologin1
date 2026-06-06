"use client";

import { ChevronRight, Laptop, Monitor, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const USE_CASES = [
  {
    id: "college-lab",
    pill: "students",
    iconSrc: "/feature-collaborate.svg",
    title: "Sharing code in a college lab",
    body: "In a shared lab, agree on one page name and everyone pulls the same code — no Gmail login on every machine, no USB passes. Practical sessions stay fast across Windows, Mac, and lab Linux.",
    meta: "One page name · whole batch",
    visual: "college-lab",
    visualLabel: "SAME ROOM · SAME PAGE NAME",
    visualFoot: "no email · no pendrive",
  },
  {
    id: "hackathon",
    pill: "hackathons",
    iconSrc: "/feature-auto-expiry.svg",
    title: "Temporary code at a hackathon",
    body: "Pass snippets, env configs, and WIP files before anything belongs in a main repo. Teams keep moving without invites, permissions, or repository setup slowing the night down.",
    meta: "Share fast · expire later",
    visual: "hackathon",
    visualLabel: "TEMP SPACE · SHIP FASTER",
    visualFoot: "set expiry when done",
  },
  {
    id: "code-review",
    pill: "developers",
    iconSrc: "/feature-file-text.svg",
    title: "Quick code review without GitHub",
    body: "Not every review needs a full PR. Drop a fix, function, or small chunk of code on a page, share the name, and get feedback in minutes — great for interviews, pair work, and student handoffs.",
    meta: "Link-free handoff · instant feedback",
    visual: "code-review",
    visualLabel: "PASTE · SHARE NAME · DONE",
    visualFoot: "no repo overhead",
  },
  {
    id: "events",
    pill: "events",
    iconSrc: "/feature-collaborate.svg",
    title: "Mass sharing at events and conferences",
    body: "Put one URL on the slide. Attendees open slides, links, and resources on their own phones and laptops — no signup wall at the door, no WhatsApp number exchange mid-session.",
    meta: "One URL · entire audience",
    visual: "events",
    visualLabel: "ONE LINK · WHOLE ROOM",
    visualFoot: "workshops · meetups · conferences",
  },
  {
    id: "teaching",
    pill: "teachers",
    iconSrc: "/feature-file-text.svg",
    title: "Teaching without interruptions",
    body: "Write the page name on the board. Students open notes, PDFs, and code instantly. Class time goes to teaching — not recovering passwords, resending attachments, or troubleshooting logins.",
    meta: "Board → phones in seconds",
    visual: "teaching",
    visualLabel: "PAGE NAME ON THE BOARD",
    visualFoot: "notes · PDFs · code together",
  },
  {
    id: "public-pc",
    pill: "public pcs",
    iconSrc: "/feature-auto-expiry.svg",
    title: "Files off a shared computer, nothing left behind",
    body: "Upload from a library or lab machine, open the same page on your phone, download, and let it expire. Walk away without leaving files on a system you do not own.",
    meta: "Upload · transfer · auto-delete",
    visual: "public-pc",
    visualLabel: "PUBLIC PC → YOUR PHONE",
    visualFoot: "expiry clears the trail",
  },
  {
    id: "cross-device",
    pill: "cross-device",
    iconSrc: "/feature-any-device.svg",
    title: "Moving content between your own devices",
    body: "Notes on your phone that you need on your laptop? Upload once, open the same page name everywhere. No cable, no Bluetooth pairing, no signing into cloud storage on either device.",
    meta: "Phone · laptop · desktop",
    visual: "cross-device",
    visualLabel: "SAME PAGE · ANY DEVICE",
    visualFoot: "any OS · any browser",
  },
  {
    id: "external",
    pill: "external",
    iconSrc: "/feature-password.svg",
    title: "Sharing with people without the app or account",
    body: "Clients, collaborators, and first-time users often do not have your tools installed. If they have a browser, they can open the page — optional password when you want a gate, never a forced signup.",
    meta: "Recipients stay login-free",
    visual: "external",
    visualLabel: "BROWSER ONLY · NO SIGNUP",
    visualFoot: "optional password · no accounts",
  },
  {
    id: "study-groups",
    pill: "study groups",
    iconSrc: "/feature-collaborate.svg",
    title: "Study groups before an exam",
    body: "Keep formulas, solved examples, and last-minute notes in one place before the paper. Everyone opens the same link during revision — no chasing files across chats the night before.",
    meta: "One link · whole group aligned",
    visual: "study-groups",
    visualLabel: "SHARED REVISION PAGE",
    visualFoot: "notes · refs · examples",
  },
];

function CaseIcon({ src, alt = "" }) {
  return (
    <div className="features-page-spotlight-icon-wrap">
      <Image src={src} alt={alt} width={40} height={40} className="features-page-spotlight-icon-img" unoptimized />
    </div>
  );
}

function CaseCopy({ id, pill, iconSrc, title, body, meta }) {
  return (
    <div className="features-page-spotlight-copy">
      <span className="why-page-spotlight-pill">{pill}</span>
      <CaseIcon src={iconSrc} alt="" />
      <h2 id={id}>{title}</h2>
      <p className="features-page-spotlight-body">{body}</p>
      {meta ? <p className="features-page-spotlight-meta">{meta}</p> : null}
    </div>
  );
}

function VisualShell({ label, foot, children }) {
  return (
    <div className="features-page-spotlight-visual features-page-spotlight-visual--panel" aria-hidden>
      <p className="features-page-spotlight-visual-label">{label}</p>
      {children}
      <p className="features-page-spotlight-visual-foot">{foot}</p>
    </div>
  );
}

function CaseVisual({ type }) {
  switch (type) {
    case "college-lab":
      return (
        <VisualShell label="SAME ROOM · SAME PAGE NAME" foot="no email · no pendrive">
          <div className="features-page-mock-browser">
            <div className="features-page-mock-chrome">
              <span className="features-page-mock-dot" />
              <span className="features-page-mock-dot" />
              <span className="features-page-mock-dot" />
              <span className="features-page-mock-url">
                <span className="features-page-url-host">nologin.in/</span>
                <span className="features-page-url-path">lab-batch</span>
              </span>
            </div>
            <pre className="features-page-mock-code why-page-mock-code--short">
              <code>{`int main() {\n  return solve();\n}`}</code>
            </pre>
          </div>
          <div className="why-page-mock-tags">
            <span>student A</span>
            <span>student B</span>
            <span>faculty</span>
          </div>
        </VisualShell>
      );
    case "hackathon":
      return (
        <VisualShell label="TEMP SPACE · SHIP FASTER" foot="set expiry when done">
          <pre className="features-page-mock-code">
            <code>{`API_KEY=...\nPORT=3000\n# ship first`}</code>
          </pre>
          <ul className="features-page-expiry-bars why-page-expiry-bars--compact">
            <li>
              <span className="features-page-expiry-label">6 hrs</span>
              <span className="features-page-expiry-track">
                <span className="features-page-expiry-fill" style={{ width: "62%" }} />
              </span>
            </li>
          </ul>
        </VisualShell>
      );
    case "code-review":
      return (
        <VisualShell label="PASTE · SHARE NAME · DONE" foot="no repo overhead">
          <div className="features-page-mock-card">
            <p className="features-page-mock-card-url">
              <span className="features-page-url-host">nologin.in/</span>
              <span className="features-page-url-path">fix-auth</span>
            </p>
            <pre className="features-page-mock-code why-page-mock-code--short">
              <code>{`if (!token) return;\nvalidate(token);`}</code>
            </pre>
          </div>
          <p className="why-page-mock-note">→ feedback in minutes</p>
        </VisualShell>
      );
    case "events":
      return (
        <VisualShell label="ONE LINK · WHOLE ROOM" foot="workshops · meetups · conferences">
          <div className="features-page-mock-card">
            <p className="features-page-mock-card-url">
              <span className="features-page-url-host">nologin.in/</span>
              <span className="features-page-url-path">workshop24</span>
            </p>
            <div className="features-page-mock-lines">
              <span />
              <span />
              <span />
            </div>
            <p className="features-page-mock-viewing">
              <span className="features-page-mock-viewing-dot" aria-hidden />
              120 viewing now
            </p>
          </div>
        </VisualShell>
      );
    case "teaching":
      return (
        <VisualShell label="PAGE NAME ON THE BOARD" foot="notes · PDFs · code together">
          <div className="why-page-mock-board">
            <p className="why-page-mock-board-label">write on board</p>
            <p className="why-page-mock-board-name">
              nologin.in/<span>class-notes</span>
            </p>
          </div>
          <div className="why-page-mock-file-rows">
            <span>lecture.pdf</span>
            <span>demo.py</span>
            <span>assignment.docx</span>
          </div>
        </VisualShell>
      );
    case "public-pc":
      return (
        <VisualShell label="PUBLIC PC → YOUR PHONE" foot="expiry clears the trail">
          <div className="why-page-mock-transfer">
            <div className="why-page-mock-transfer-node">
              <Monitor className="why-page-mock-transfer-icon" strokeWidth={1.5} aria-hidden />
              <span>Lab PC</span>
            </div>
            <ChevronRight className="features-page-device-arrow" aria-hidden />
            <div className="why-page-mock-transfer-node">
              <Smartphone className="why-page-mock-transfer-icon" strokeWidth={1.5} aria-hidden />
              <span>Your phone</span>
            </div>
          </div>
          <p className="why-page-mock-expiry">expires in 1 hr</p>
        </VisualShell>
      );
    case "cross-device":
      return (
        <VisualShell label="SAME PAGE · ANY DEVICE" foot="any OS · any browser">
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
              <span>Desktop</span>
            </div>
          </div>
          <p className="features-page-device-url">
            <span className="features-page-url-host">nologin.in/</span>
            <span className="features-page-url-path">mynotes</span>
          </p>
        </VisualShell>
      );
    case "external":
      return (
        <VisualShell label="BROWSER ONLY · NO SIGNUP" foot="optional password · no accounts">
          <div className="features-page-password-rows">
            <div className="features-page-password-row">
              <span>has browser</span>
              <span className="features-page-password-ok">✓ can open</span>
            </div>
            <div className="features-page-password-row">
              <span>needs account</span>
              <span className="features-page-password-no">✗ not required</span>
            </div>
            <div className="features-page-password-row">
              <span>optional password</span>
              <span className="features-page-password-ok">✓ your choice</span>
            </div>
          </div>
        </VisualShell>
      );
    case "study-groups":
      return (
        <VisualShell label="SHARED REVISION PAGE" foot="notes · refs · examples">
          <ul className="why-page-mock-notes">
            <li>Integration formulas</li>
            <li>Solved Q4 from mock test</li>
            <li>Professor&apos;s shortcut</li>
            <li>Last-year paper refs</li>
          </ul>
          <p className="features-page-mock-viewing">
            <span className="features-page-mock-viewing-dot" aria-hidden />4 students on same page
          </p>
        </VisualShell>
      );
    default:
      return null;
  }
}

export default function WhyNoLogin() {
  return (
    <div className="about-page features-page why-page">
      <div className="about-page-inner">
        <section className="about-page-hero">
          <p className="about-page-kicker">WHY NOLOGIN</p>
          <h1 className="about-page-title">
            <span className="about-page-title-row about-page-title-strong">Text was short.</span>
            <span className="about-page-title-row about-page-title-strong">File was small.</span>
            <span className="about-page-title-row">
              Login step was <span className="about-page-title-accent">neither</span>.
            </span>
          </h1>
          <p className="about-page-hero-sub">
          Nine times the login step had no business being there.
          </p>
        </section>

        {USE_CASES.map((item, index) => {
          const reverse = index % 2 === 1;
          const sectionClass = reverse
            ? "features-page-spotlight features-page-spotlight--reverse"
            : "features-page-spotlight";

          return (
            <section
              key={item.id}
              className={sectionClass}
              aria-labelledby={`why-${item.id}-heading`}
            >
              {reverse ? (
                <>
                  <CaseVisual type={item.visual} />
                  <CaseCopy
                    id={`why-${item.id}-heading`}
                    pill={item.pill}
                    iconSrc={item.iconSrc}
                    title={item.title}
                    body={item.body}
                    meta={item.meta}
                  />
                </>
              ) : (
                <>
                  <CaseCopy
                    id={`why-${item.id}-heading`}
                    pill={item.pill}
                    iconSrc={item.iconSrc}
                    title={item.title}
                    body={item.body}
                    meta={item.meta}
                  />
                  <CaseVisual type={item.visual} />
                </>
              )}
            </section>
          );
        })}

        <div className="about-page-grid about-page-mission">
          <div className="about-page-cell about-page-mission-copy">
            <p className="about-page-mission-lead">
              NoLogin is built for moments where{" "}
              <span className="about-page-mission-accent">speed matters.</span>
            </p>
            <p className="about-page-mission-sub">Create a page name, add your content, share instantly. No login needed.</p>
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
