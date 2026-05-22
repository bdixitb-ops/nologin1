"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ABOUT_STATS = [
  { id: "users", kind: "count", target: 72, suffix: "K+", label: "Users worldwide" },
  { id: "countries", kind: "count", target: 138, suffix: "", label: "Countries reached" },
  { id: "founded", kind: "text", value: "Nov '24", label: "Founded" },
  { id: "accounts", kind: "count", target: 0, suffix: "", label: "Accounts needed. Ever." },
];

export default function About() {
  const [counts, setCounts] = useState(() => ABOUT_STATS.map((s) => (s.kind === "count" ? 0 : null)));
  const statsRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) {
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) {
          return;
        }
        startedRef.current = true;
        const durationMs = 1200;
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / durationMs, 1);
          const eased = 1 - (1 - t) ** 3;
          setCounts(
            ABOUT_STATS.map((s) => {
              if (s.kind !== "count") {
                return null;
              }
              return Math.round(s.target * eased);
            }),
          );
          if (t < 1) {
            requestAnimationFrame(tick);
          }
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="about-page">
      <div className="about-page-inner">
        <section className="about-page-hero">
          <p className="about-page-kicker">• OUR STORY</p>
          <h1 className="about-page-title">
            <span className="about-page-title-row about-page-title-strong">Short story,</span>
            <span className="about-page-title-row">
              <span className="about-page-title-accent">looong</span>{" "}
              <span className="about-page-title-strong">frustration</span>
            </span>
            <span className="about-page-title-row about-page-title-muted">of why we exist.</span>
          </h1>
          <p className="about-page-hero-sub">Turns out frustration is a great co-founder.</p>
        </section>

        <section className="about-page-story-stack" aria-label="Our story">
          <article className="about-page-story-block">
            <h2 className="about-page-col-head">01 — THE MOMENT</h2>
            <div className="about-page-prose about-page-prose-story">
              <p>
                It was 3rd semester. A friend had just cracked a lab program. Zero errors. The rest of us wanted his
                code.
              </p>
              <p>
                We were sitting right there in the <strong className="about-page-em">same lab.</strong>
              </p>
              <p>
                So he logged into Gmail, composed an email, attached the file. We all logged in, opened it, copied the
                code.
              </p>
              <p>
                <strong className="about-page-em">
                  Why do we even need to log in just to share a piece of code?
                </strong>
              </p>
            </div>
          </article>
          <article className="about-page-story-block">
            <h2 className="about-page-col-head">02 — THE GAP</h2>
            <div className="about-page-prose about-page-prose-story">
              <p>
                Someone pointed us to Dontpad. Text only. No files. No control. One day someone wiped our page by
                accident.
              </p>
              <p>
                Then I watched our teacher{" "}
                <strong className="about-page-em">log into Gmail in class</strong> just to download her own PPT.
              </p>
              <p>
                Then I was in the library, notes on my phone, needed them on the system. Logged into WhatsApp on a
                shared computer.
              </p>
              <p>
                That was it. <strong className="about-page-em">The file problem was impossible to ignore.</strong>{" "}
                Nobody had built the full solution.
              </p>
            </div>
          </article>
          <article className="about-page-story-block">
            <h2 className="about-page-col-head">03 — THE BUILD</h2>
            <div className="about-page-prose about-page-prose-story">
              <p>
                We started building. Text sharing, file uploads, expiry timers, passwords, edit lock, everything the
                existing tools were missing.
              </p>
              <p>
                <strong className="about-page-em">On November 26th 2024 we launched v1.</strong>
              </p>
              <p>No marketing. No launch post. Just a link in a college WhatsApp group. Word of mouth did the rest.</p>
              <p>72,000 users. 138 countries.</p>
              <p>We never expected that. We just built the tool we needed.</p>
            </div>
          </article>
        </section>

        <div ref={statsRef} className="about-page-grid about-page-grid-4 about-page-stats">
          {ABOUT_STATS.map((stat, index) => (
            <div key={stat.id} className="about-page-cell about-page-stat-cell">
              <p className="about-page-stat-value">
                {stat.kind === "count" ? (
                  <>
                    {counts[index]}
                    {stat.suffix}
                  </>
                ) : (
                  stat.value
                )}
              </p>
              <p className="about-page-stat-label">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="about-page-grid about-page-mission">
          <div className="about-page-cell about-page-mission-copy">
            <p className="about-page-mission-lead">
              NoLogin exists so <span className="about-page-mission-accent">neither ever happens again.</span>
            </p>
            <p className="about-page-mission-sub">No login. No signup. No pendrives. Just a page name.</p>
          </div>
          <div className="about-page-cell about-page-mission-cta">
            <Link href="/#home-hero" className="about-page-cta">
              Try NoLogin →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
