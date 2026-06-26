"use client";

import HomeHeroBlock from "@/components/HomeHeroBlock";
import { useCallback, useEffect } from "react";
import { ToastContainer } from "react-toastify";

const EXAMPLE_LINKS = ["nologin.in/labcode", "nologin.in/slides", "nologin.in/notes"];

const HOW_STEPS = [
  {
    num: 1,
    title: "Type a page name",
    body: "Go to nologin.in and type any word or phrase as your page name.",
    url: "nologin.in/yourpagename",
  },
  {
    num: 2,
    title: "Add your content",
    body: "Paste text, write code, or upload files — or all three together on the same page.",
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

const WHO_ITEMS = [
  {
    pill: "STUDENTS",
    title: "Students and lab partners",
    body: "In a computer lab, sharing code between systems usually means emailing yourself, using a pendrive, or logging into a cloud drive. With NoLogin, you upload your code, tell your partner the page name, and they have it in under ten seconds.",
    urls: ["nologin.in/dslab1", "nologin.in/oopspractical"],
  },
  {
    pill: "TEACHERS",
    title: "Teachers and classrooms",
    body: "Write one link on the board at the start of class. Students open it on their phones or laptops and get instant access to notes, slides or assignments. No WhatsApp group needed. No email list.",
  },
  {
    pill: "ORGANISERS",
    title: "Event organisers and speakers",
    body: "Put a single link on the projector and your entire audience gets instant access to everything you want to share. No QR codes, no long URLs, no number exchange.",
    urls: ["nologin.in/workshop", "nologin.in/resources"],
  },
  {
    pill: "PHONE → LAPTOP",
    title: "Cross-device transfer",
    body: "Copy something on your phone that you need on your laptop. Upload it to NoLogin, open the same page name on your laptop, done. No cable. No Bluetooth. No signing into cloud storage.",
  },
];

const WHY_LIST = [
  "Instant text sharing without login",
  "Instant file sharing without signup",
  "Short, custom, memorable links you choose",
  "Text and files together on the same page",
  "Works on every device with a browser",
  "Optional password protection when you need it",
  "Optional edit lock to protect your content",
  "Content expires automatically — no cleanup needed",
];

const PROBLEM_CARDS = [
  {
    title: "Speed",
    body: "Your content is live the moment you save the page. No upload queue, no processing time, no approval.",
  },
  {
    title: "Simplicity",
    body: "The page name is the URL. You choose it, you remember it, you share it. That is the entire interface.",
  },
  {
    title: "No account required",
    body: "The person receiving your link does not need NoLogin, does not need to sign up, and does not need to do anything except open a browser.",
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
    q: "What is Time Lock?",
    a: "An optional setting in Set time. When enabled, only someone with the time-lock password can change the expiry timer. Use it to stop others from shortening or extending your expiry — you can still unlock and extend it whenever you need.",
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

export default function InstantSharing() {
  useEffect(() => {
    const sections = document.querySelectorAll(".instant-sharing-page section.fade-up");
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
    <div className="home-v2-page instant-sharing-page">
      <ToastContainer />
      <section className="home-v2-shell">
        <HomeHeroBlock
          badge="instant sharing"
          title="Share anything Instantly"
          subtext={
            <>
              Share text, code and files online instantly
              <br />
              Upload once and access from any device.
            </>
          }
        />

      <section className="home-v2-section instant-page-block fade-up" aria-labelledby="instant-what-heading">
        <p className="home-v2-section-kicker">WHAT IS INSTANT SHARING</p>
        <h2 id="instant-what-heading" className="home-v2-section-title">
          Sharing without the usual friction
        </h2>
        <div className="instant-page-prose">
          <p>
            Instant sharing means getting your content in front of someone else in the fewest steps possible. No login
            screens. No account creation. No waiting for a verification email. No fumbling with permissions or long
            cloud drive URLs.
          </p>
          <p>
            NoLogin is built specifically for this. You choose a short page name, drop in your text, code or files, and
            share the link. Anyone with the link opens it instantly from any device — phone, laptop, lab computer,
            anything with a browser.
          </p>
          <p className="instant-page-prose-label">That link looks like this:</p>
          <div className="instant-page-url-pills">
            {EXAMPLE_LINKS.map((link) => (
              <UrlPill key={link} href={link} />
            ))}
          </div>
          <p>Short. Human-readable. No random characters. No expiring tokens. Just a word you choose.</p>
        </div>
      </section>

      <section
        id="instant-how"
        className="home-v2-section home-v2-why instant-page-how fade-up"
        aria-labelledby="instant-how-heading"
      >
        <p className="home-v2-section-kicker">HOW IT WORKS</p>
        <h2 id="instant-how-heading" className="home-v2-section-title">
          Four steps. Under ten seconds.
        </h2>
        <p className="instant-page-section-lead">
          There is no step where someone has to create an account, verify an email, or request access. The link works
          for everyone, immediately.
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
        id="instant-who"
        className="home-v2-section home-v2-features-section instant-page-who fade-up"
        aria-labelledby="instant-who-heading"
      >
        <p className="home-v2-section-kicker">WHO USES INSTANT SHARING</p>
        <h2 id="instant-who-heading" className="home-v2-section-title">
          Real situations where it matters.
        </h2>

        <div className="home-v2-features-cards-grid instant-page-who-grid">
          {WHO_ITEMS.map((item) => (
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

      <section className="home-v2-section instant-page-why-block fade-up" aria-labelledby="instant-why-heading">
        <p className="home-v2-section-kicker">WHY NOLOGIN FOR INSTANT SHARING</p>
        <h2 id="instant-why-heading" className="home-v2-section-title">
          No friction anywhere in the flow.
        </h2>
        <ul className="instant-page-why-list">
          {WHY_LIST.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="home-v2-section instant-page-problems fade-up" aria-labelledby="instant-problems-heading">
        <p className="home-v2-section-kicker">INSTANT SHARING WITHOUT THE USUAL PROBLEMS</p>
        <h2 id="instant-problems-heading" className="home-v2-section-title">
          Three reasons instant sharing usually fails.
        </h2>
        <p className="instant-page-section-lead">
          The reason people look for instant sharing tools is that existing solutions are too slow, too complicated, or
          require the other person to have an account. NoLogin solves all three.
        </p>
        <div className="home-v2-features-cards-grid instant-page-problems-grid">
          {PROBLEM_CARDS.map((card) => (
            <article
              key={card.title}
              className="home-v2-features-box-card"
              role="presentation"
              onClick={playCardLift}
              onAnimationEnd={endCardLift}
            >
              <span className="home-v2-why-audience-pill">{card.title}</span>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="instant-faq" className="home-v2-section home-v2-faq fade-up">
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
