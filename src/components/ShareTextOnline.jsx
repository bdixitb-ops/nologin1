"use client";

import HomeHeroBlock from "@/components/HomeHeroBlock";
import { useCallback, useEffect } from "react";
import { ToastContainer } from "react-toastify";

const TEXT_TYPES = [
  {
    title: "Code",
    body: "Paste a function, a script, or an entire file. Your recipient gets it formatted and ready to copy. No email thread, no attachment, no download required.",
  },
  {
    title: "Notes",
    body: "Lecture notes, meeting notes, study material, quick summaries. Create a page, paste the content, share the name. Everyone who needs it can open it.",
  },
  {
    title: "Messages & announcements",
    body: "Need to share something with a group without setting up a group chat? Put it on a NoLogin page and share the name once.",
  },
  {
    title: "Drafts & documents",
    body: "Write something, share the link for feedback, update the content without sending a new version. Everyone with the link always sees the latest version.",
  },
  {
    title: "Credentials & instructions",
    body: "Share a config, an API key, setup instructions, or onboarding notes. Set an expiry so it disappears after the right person has read it.",
  },
];

const HOW_STEPS = [
  {
    num: 1,
    title: "Type a page name",
    body: "Go to nologin.in and type any word or phrase as your page name.",
    url: "nologin.in/yourpagename",
  },
  {
    num: 2,
    title: "Paste your text",
    body: "Paste your text into the editor — code, notes, links, or anything you need to share.",
  },
  {
    num: 3,
    title: "Share the link",
    body: "Say it verbally, write it on a board, or send it in a message.",
  },
  {
    num: 4,
    title: "They open it instantly",
    body: "Any device, any browser. No login required on their end either.",
  },
];

const SITUATION_ITEMS = [
  {
    pill: "STUDENTS",
    title: "In a college lab",
    body: "You finish writing a program and need to share it with your partner two seats away. Instead of emailing yourself or carrying a pendrive, you paste it to nologin.in/labcode and say the page name out loud. Ten seconds.",
    urls: ["nologin.in/labcode"],
  },
  {
    pill: "TEACHERS",
    title: "In a classroom",
    body: "A teacher wants to share the day's notes with students. Write the page name on the board. Students open it on their phones. No WhatsApp group, no email list, no file attachment.",
  },
  {
    pill: "TEAMS",
    title: "In a team",
    body: "Someone needs to share a quick draft or checklist without creating a shared document and managing permissions. One NoLogin page, one link in the chat, done.",
  },
  {
    pill: "EVENTS",
    title: "At an event",
    body: "Paste the schedule, speaker links or resources onto a page. Show the name on the projector. Everyone in the room has it instantly.",
    urls: ["nologin.in/workshop"],
  },
];

const SWITCH_ITEMS = [
  {
    title: "The page name is yours",
    body: "You choose it, you remember it, you control it. There are no randomly generated strings.",
  },
  {
    title: "Text and files live together",
    body: "Paste your notes and upload the related files on the same page. One link for everything.",
  },
  {
    title: "No account on either end",
    body: "The person receiving your link does not need NoLogin. They just need a browser.",
  },
  {
    title: "Edit anytime",
    body: "Come back to the same page and update your text. Everyone with the link sees the latest version automatically.",
  },
  {
    title: "Optional protections",
    body: "Add a password if you want to restrict who can view it. Add edit lock if you want to prevent others from modifying it. Both are optional.",
  },
  {
    title: "Automatic expiry",
    body: "Set your text to disappear after 1 hour, 6 hours, 24 hours, 48 hours, or 7 days. Useful for temporary sharing where you do not want content sitting online permanently.",
  },
];

const HOME_FAQ_ITEMS = [
  {
    q: "What is a page name?",
    a: "A unique word or combination of letters and numbers you choose (nologin.in/yourpagename). Choose something memorable if the name you want is already taken, pick a different one.",
  },
  {
    q: "Why is there a password option if NoLogin does not require login?",
    a: "Password is optional. Set one if you want to restrict who can view your page. Without it, anyone with your page name can open it.",
  },
  {
    q: "What is Edit Lock?",
    a: "Edit Lock makes your page read-only. Visitors can view and copy text or download files, but cannot edit, delete, or upload anything.",
  },
  {
    q: "What is the Set time?",
    a: "Controls how long your content stays on the page. Once time runs out, all text and files are automatically and permanently deleted. Default is 48 hours.",
  },
  {
    q: "How many files can I upload and what is the size limit?",
    a: "Up to 5 files per page, maximum 100MB per file.",
  },
  {
    q: "My content got deleted. What to do?",
    a: "Either the timer expired or someone deleted it before you enabled Edit Lock. We do not store previous versions, content cannot be recovered.",
  },
];

function UrlPill({ href }) {
  const path = href.replace(/^nologin\.in\/?/, "");
  return (
    <span className="instant-page-url-pill">
      <span className="features-page-url-host">nologin.in/</span>
      <span className="features-page-url-path">{path}</span>
    </span>
  );
}

export default function ShareTextOnline() {
  useEffect(() => {
    const sections = document.querySelectorAll(".share-text-page section.fade-up");
    if (!sections.length) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => sections.forEach((el) => observer.unobserve(el));
  }, []);

  const playCardLift = useCallback((e) => {
    const el = e.currentTarget;
    const why = el.classList.contains("home-v2-why-column-card");
    el.classList.remove("home-v2-card-lift", "home-v2-card-lift-why");
    void el.offsetWidth;
    el.classList.add(why ? "home-v2-card-lift-why" : "home-v2-card-lift");
  }, []);

  const endCardLift = useCallback((e) => {
    e.currentTarget.classList.remove("home-v2-card-lift", "home-v2-card-lift-why");
  }, []);

  return (
    <div className="home-v2-page share-text-page">
      <ToastContainer />
      <section className="home-v2-shell">
        <HomeHeroBlock
          badge="One page. Your words."
          title="Share Text Online"
          subtext={
            <>
              The fastest way to share text online.
              <br />
              Open a page. Paste your text. Share the name.
            </>
          }
        />

        <section className="home-v2-section instant-page-block fade-up" aria-labelledby="share-text-intro-heading">
          <p className="home-v2-section-kicker">THE SIMPLEST WAY TO SHARE TEXT ONLINE</p>
          <h2 id="share-text-intro-heading" className="home-v2-section-title">
            No account. No ugly URLs. No friction.
          </h2>
          <div className="instant-page-prose">
            <p>
              Most tools that let you share text online ask you to create an account first. Or they generate a long ugly
              URL you have to copy and send. Or they only work if the other person also has the app installed.
            </p>
            <p>NoLogin does none of that.</p>
            <p>
              You open nologin.in, type a page name you choose yourself, paste your text, and share the link. The link
              is just:
            </p>
            <div className="instant-page-url-pills">
              <UrlPill href="nologin.in/yourpagename" />
            </div>
            <p>
              Short. Clean. Easy to say out loud or write on a board. Anyone opens it instantly on any device — no login
              required on either end.
            </p>
          </div>
        </section>

        <section
          className="home-v2-section home-v2-features-section instant-page-text-types fade-up"
          aria-labelledby="share-text-types-heading"
        >
          <p className="home-v2-section-kicker">WHAT KIND OF TEXT CAN YOU SHARE</p>
          <h2 id="share-text-types-heading" className="home-v2-section-title">
            Code, notes, messages, drafts and more.
          </h2>

          <div className="home-v2-features-cards-grid instant-page-text-types-grid">
            {TEXT_TYPES.map((item) => (
              <article
                key={item.title}
                className="home-v2-features-box-card"
                role="presentation"
                onClick={playCardLift}
                onAnimationEnd={endCardLift}
              >
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="share-text-how"
          className="home-v2-section home-v2-why instant-page-how fade-up"
          aria-labelledby="share-text-how-heading"
        >
          <p className="home-v2-section-kicker">HOW TO SHARE TEXT ONLINE WITH NOLOGIN</p>
          <h2 id="share-text-how-heading" className="home-v2-section-title">
            Four steps. No verification. No permissions.
          </h2>
          <p className="instant-page-section-lead">
            That is the entire process. No verification email. No permissions to configure. No app to install. The person
            receiving it just opens the link.
          </p>

          <div className="home-v2-why-columns-grid instant-page-how-grid">
            {HOW_STEPS.map((step) => (
              <article
                key={step.num}
                className="home-v2-why-column-card"
                role="presentation"
                onClick={playCardLift}
                onAnimationEnd={endCardLift}
              >
                <div className="home-v2-why-rail" aria-hidden />
                <span className="home-v2-why-audience-pill instant-page-step-pill" aria-hidden>
                  {step.num}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                {step.url ? <UrlPill href={step.url} /> : null}
              </article>
            ))}
          </div>
        </section>

        <section
          id="share-text-situations"
          className="home-v2-section home-v2-features-section instant-page-who fade-up"
          aria-labelledby="share-text-situations-heading"
        >
          <p className="home-v2-section-kicker">REAL SITUATIONS WHERE THIS SAVES TIME</p>
          <h2 id="share-text-situations-heading" className="home-v2-section-title">
            Every situation where sharing text is painful.
          </h2>

          <div className="home-v2-features-cards-grid instant-page-who-grid">
            {SITUATION_ITEMS.map((item) => (
              <article
                key={item.title}
                className="home-v2-features-box-card"
                role="presentation"
                onClick={playCardLift}
                onAnimationEnd={endCardLift}
              >
                <span className="home-v2-why-audience-pill">{item.pill}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                {item.urls?.length ? (
                  <div className="instant-page-url-pills instant-page-url-pills--card">
                    {item.urls.map((link) => (
                      <UrlPill key={link} href={link} />
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="home-v2-section instant-page-switch fade-up" aria-labelledby="share-text-switch-heading">
          <p className="home-v2-section-kicker">WHY PEOPLE SWITCH TO NOLOGIN FOR TEXT SHARING</p>
          <h2 id="share-text-switch-heading" className="home-v2-section-title">
            Different in a few specific ways.
          </h2>
          <p className="instant-page-section-lead">
            Pastebin requires an account for most features and generates random URLs you cannot control. Dontpad is
            text-only with no file support and no password protection. Google Docs needs everyone to have a Google account
            and understand sharing permissions.
          </p>
          <ul className="instant-page-switch-list">
            {SWITCH_ITEMS.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="share-text-faq" className="home-v2-section home-v2-faq fade-up">
          <p className="home-v2-section-kicker">FAQ</p>
          <div className="home-v2-faq-list">
            {HOME_FAQ_ITEMS.map((item) => (
              <details key={item.q} className="home-v2-faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
