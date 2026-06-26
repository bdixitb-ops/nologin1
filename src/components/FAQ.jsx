"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";

const FAQS = [
  {
    category: "The basics",
    num: "01",
    q: "What is NoLogin and how does it work?",
    a: "NoLogin is an instant sharing tool. You type a page name — say nologin.in/notes — and you get a page where you can write text and upload files. Share that same page name with anyone and they open the exact same page, instantly. No login required on either end. No account, no signup, no app.",
  },
  {
    category: "The basics",
    num: "01",
    q: "Do I need an account to use NoLogin — on either end?",
    a: "No. Not on your end. Not on the receiver's end. Not on any end. NoLogin was built specifically so that neither person needs an account. If someone has a browser, they can open your page. That's the whole point.",
  },
  {
    category: "Page names",
    num: "02",
    q: "What is a page name?",
    a: "A page name is the word or phrase you choose after nologin.in/. It becomes your page's address. For example, if you type notes, your page lives at nologin.in/notes. Anyone who types the same address opens the same page. Remember it — we don't store it for you.",
  },
  {
    category: "Page names",
    num: "02",
    q: "What happens if someone else uses the same page name?",
    a: "They see the same page you created. This is by design — NoLogin pages are shared by name, not by account. If your content is sensitive, use a password to protect it. Or use a specific, less obvious page name — the more unique your name, the less likely someone stumbles across it.",
  },
  {
    category: "Files & content",
    num: "03",
    q: "What can I share on NoLogin — text, files, or both?",
    a: "Both, on the same page. You can write or paste any text — code, notes, links, messages — and upload files alongside it. PDFs, images, documents, zip files, anything. One page, one link, everything together.",
  },
  {
    category: "Files & content",
    num: "03",
    q: "How many files can I upload and what is the size limit?",
    a: "Up to 5 files per page, with a maximum of 100MB per file. Both limits are free with no account needed.",
  },
  {
    category: "Privacy & security",
    num: "04",
    q: "Is my content private — can anyone find it?",
    a: "NoLogin pages are not listed or indexed anywhere. The only way someone can find your page is if they know your exact page name. A unique page name is your first layer of privacy. For anything sensitive, add a password — then even someone with the exact URL cannot read your content without it.",
  },
  {
    category: "Privacy & security",
    num: "04",
    q: "What is password protection and how does it work?",
    a: "Password protection is an optional setting. When enabled, anyone who opens your page is asked for a password before they can view the content. The link still works — the password is the gate. Only people you give the password to can read what's on the page. It does not require an account on either end.",
  },
  {
    category: "Privacy & security",
    num: "04",
    q: "What is Edit Lock?",
    a: "Edit Lock makes your page read-only. Once enabled, visitors can view your content, copy text and download files — but they cannot edit, delete or upload anything. Your content stays exactly as you left it. Use it when you want to share something that should not be changed by anyone who opens it.",
  },
  {
    category: "Privacy & security",
    num: "04",
    q: "What is Time Lock?",
    a: "Time Lock is an optional setting inside Set time. Turn on Time lock and set a password — after that, nobody can change the expiry timer unless they enter that password. Without it, anyone who knows your page name could shorten or extend your expiry. With Time lock on, you can still visit later, unlock with your password, and extend the timer whenever you need.",
  },
  {
    category: "Expiry & deletion",
    num: "05",
    q: "What is the expiry timer and what happens when it runs out?",
    a: "The expiry timer controls how long your content stays on the page. You can set it to expire after 1 hour, 6 hours, 24 hours, 7 days or 30 days. When the timer runs out, all text and files on the page are automatically and permanently deleted. Nothing needs to be manually cleaned up.",
  },
  {
    category: "Expiry & deletion",
    num: "05",
    q: "My content got deleted — what happened and can I recover it?",
    a: "Either the expiry timer ran out, or someone deleted the content before you enabled Edit Lock. Deletion on NoLogin is permanent — we do not store previous versions or backups. Content cannot be recovered once deleted. If your content matters, enable Edit Lock as soon as you upload it.",
  },
];

function groupFaqs(faqs) {
  const sections = [];
  const byNum = new Map();

  for (const item of faqs) {
    if (!byNum.has(item.num)) {
      const section = {
        id: item.num,
        num: item.num,
        title: item.category.toUpperCase(),
        items: [],
      };
      byNum.set(item.num, section);
      sections.push(section);
    }
    byNum.get(item.num).items.push({ q: item.q, a: item.a });
  }

  return sections;
}

function FaqAccordionItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className={`faq-page-item${open ? " is-open" : ""}`}>
      <button
        type="button"
        className="faq-page-item-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="faq-page-item-question">{question}</span>
        <span className="faq-page-item-toggle" aria-hidden>
          {open ? "×" : "+"}
        </span>
      </button>
      <div id={panelId} className="faq-page-item-panel" hidden={!open}>
        <p>{answer}</p>
      </div>
    </div>
  );
}

function FaqPageCta() {
  return (
    <div className="about-page-grid about-page-mission">
      <div className="about-page-cell about-page-mission-copy">
        <p className="about-page-mission-lead faq-page-mission-lead">
          Understanding it took two minutes.
          <br />
          <span className="about-page-mission-accent">Using it takes ten seconds.</span>
        </p>
      </div>
      <div className="about-page-cell about-page-mission-cta">
        <Link href="/" className="about-page-cta">
          Try NoLogin →
        </Link>
      </div>
    </div>
  );
}

export default function FAQ() {
  const sections = useMemo(() => groupFaqs(FAQS), []);

  return (
    <div className="about-page faq-page">
      <div className="about-page-inner">
        <section className="about-page-hero">
          <p className="about-page-kicker">FAQ</p>
          <h1 className="about-page-title">
            <span className="about-page-title-row about-page-title-strong">Confused is a perfectly</span>
            <span className="about-page-title-row about-page-title-strong">valid reaction.</span>
            <span className="about-page-title-row about-page-title-muted">Start here.</span>
          </h1>
        </section>

        <div className="faq-page-sections">
          {sections.map((section) => (
            <section key={section.id} className="faq-page-section" aria-labelledby={`faq-section-${section.id}`}>
              <h2 id={`faq-section-${section.id}`} className="faq-page-section-head">
                <span className="faq-page-section-num">{section.num}</span> {section.title}
              </h2>
              <div className="faq-page-list">
                {section.items.map((item) => (
                  <FaqAccordionItem key={item.q} question={item.q} answer={item.a} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <FaqPageCta />
      </div>
    </div>
  );
}
