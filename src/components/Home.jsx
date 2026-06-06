"use client";

import {
  cleanupAllExpiredDocuments,
  deleteExpiredDocument,
  isDocumentExpired,
} from "@/lib/documentExpiry";
import { firestore, isFirebaseConfigured, storage } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const HOME_FEATURE_ITEMS = [
  {
    title: "Works on any device",
    description: "Phone, laptop, tablet, lab computer, the same page name works everywhere.",
    iconSrc: "/feature-any-device.svg",
  },
  {
    title: "Text + files together",
    description: "Paste your notes and upload the files on the same page. One link for everything",
    iconSrc: "/feature-file-text.svg",
  },
  {
    title: "Real-time collaboration",
    description: "Save the content uploaded and share the page name. Everyone sees the latest content instantly.",
    iconSrc: "/feature-collaborate.svg",
  },
  {
    title: "Auto expiry",
    description: "Set your content to delete itself. Nothing stays online longer than you need it.",
    iconSrc: "/feature-auto-expiry.svg",
  },
  {
    title: "Password protect",
    description:
      "Restrict who can view your page. Only people with the password get in. Optional, takes two seconds.",
    iconSrc: "/feature-password.svg",
  },
  {
    title: "Edit lock",
    description:
      "Make your page read-only. Visitors can view, copy and download but cannot edit, delete, or upload anything.",
    iconSrc: "/feature-edit-lock.svg",
  },
];

const HOME_WHY_ITEMS = [
  {
    pill: "students",
    title: "College lab",
    description:
      "Agree on a page name, upload once, your whole batch copies from it. No Gmail, no pendrive.",
  },
  {
    pill: "developers",
    title: "Coding",
    description:
      "Share rough code that isn't push-repo worthy. Say the page name, teammate has it. Set expiry, it disappears.",
  },
  {
    pill: "teachers",
    title: "Classroom",
    description: "Write the page name on the board. Students open notes, slides or PDFs on their phones instantly.",
  },
  {
    pill: "Event hosts",
    title: "Events",
    description:
      "Announce page name. Entire audience gets your resources without exchanging numbers or creating groups.",
  },
  {
    pill: "Any device",
    title: "Cross-device",
    description: "Upload from your phone, open on your laptop. Any device, any OS, no cable, no cloud login.",
  },
];

const HOME_ABOUT_STATS = [
  { target: 500, suffix: "K+", label: "views" },
  { target: 72, suffix: "K+", label: "users" },
  { target: 138, suffix: "+", label: "countries" },
  { target: 0, suffix: "", label: "logins" },
];

export default function Home() {
  const [domainName, setDomainName] = useState("");
  const [expirationTime, setExpirationTime] = useState("48 hrs");
  const [timePanelOpen, setTimePanelOpen] = useState(false);
  const [passwordPanelOpen, setPasswordPanelOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const timeSelectRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [aboutStatValues, setAboutStatValues] = useState(() => HOME_ABOUT_STATS.map(() => 0));
  const [aboutStatsStarted, setAboutStatsStarted] = useState(false);
  const aboutStatsRef = useRef(null);
  const router = useRouter();
  const expirationOptions = ["1 hr", "3 hrs", "5 hrs", "10 hrs", "24 hrs", "48 hrs", "2 days", "4 days", "7 days"];

  const calculateExpirationTimestamp = () => {
    const timestamp = Date.now();
    let expirationMs = 0;

    switch (expirationTime) {
      case "1 hr":
        expirationMs = 1 * 60 * 60 * 1000;
        break;
      case "3 hrs":
        expirationMs = 3 * 60 * 60 * 1000;
        break;
      case "5 hrs":
        expirationMs = 5 * 60 * 60 * 1000;
        break;
      case "10 hrs":
        expirationMs = 10 * 60 * 60 * 1000;
        break;
      case "24 hrs":
        expirationMs = 24 * 60 * 60 * 1000;
        break;
      case "48 hrs":
        expirationMs = 48 * 60 * 60 * 1000;
        break;
      case "2 days":
        expirationMs = 2 * 24 * 60 * 60 * 1000;
        break;
      case "4 days":
        expirationMs = 4 * 24 * 60 * 60 * 1000;
        break;
      case "7 days":
        expirationMs = 7 * 24 * 60 * 60 * 1000;
        break;
      default:
        expirationMs = 48 * 60 * 60 * 1000;
    }

    return timestamp + expirationMs;
  };

  const handleSubmit = async () => {
    const pageName = domainName.trim().toLowerCase();

    if (!pageName) {
      toast.error("Enter a page name.");
      return;
    }

    if (!isFirebaseConfigured()) {
      toast.error("App is not connected to Firebase. Check deployment environment variables.");
      return;
    }

    if (passwordPanelOpen && !password.trim()) {
      toast.error("Enter a password or tap ✕ to cancel.");
      return;
    }

    try {
      const docRef = doc(firestore, "documents", pageName);
      const docSnap = await getDoc(docRef);
      const currentTime = Date.now();
      let domainWasDeleted = false;

      if (docSnap.exists()) {
        const data = docSnap.data();

        if (isDocumentExpired(data, currentTime)) {
          await deleteExpiredDocument(storage, firestore, pageName);
          toast.warn("This domain has expired and has been automatically deleted. Creating new domain...");
          domainWasDeleted = true;
          const verifyDelete = await getDoc(docRef);
          if (verifyDelete.exists()) {
            toast.error("Error: Domain still exists. Please try again.");
            return;
          }
        } else {
          router.push(`/${pageName}`);
          return;
        }
      }

      const finalCheck = await getDoc(docRef);

      if (!finalCheck.exists() || domainWasDeleted) {
        const expirationTimestamp = calculateExpirationTimestamp();
        const createdAt = Date.now();

        await setDoc(docRef, {
          passwordSet: !!password.trim(),
          password: password.trim() || "",
          expirationTimestamp,
          text: "",
          files: [],
          createdAt,
        });

        toast.success("Domain created successfully!");
        router.push(`/${pageName}`);
      } else {
        router.push(`/${pageName}`);
      }
    } catch (error) {
      console.error("Domain creation failed:", error);
      if (error?.code === "permission-denied") {
        toast.error("Firebase blocked this request. Add your Vercel domain to API key restrictions and Firestore rules.");
      } else {
        toast.error("Error setting document settings.");
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const cleanupExpiredDomains = useCallback(async () => {
    try {
      await cleanupAllExpiredDocuments(storage, firestore);
    } catch {
      // Silent cleanup failures.
    }
  }, []);

  useEffect(() => {
    cleanupExpiredDomains();
    const cleanupInterval = setInterval(() => {
      cleanupExpiredDomains();
    }, 5 * 60 * 1000);

    return () => clearInterval(cleanupInterval);
  }, [cleanupExpiredDomains]);

  useEffect(() => {
    if (!aboutStatsRef.current || aboutStatsStarted) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAboutStatsStarted(true);
          }
        });
      },
      { threshold: 0.35 },
    );

    observer.observe(aboutStatsRef.current);
    return () => observer.disconnect();
  }, [aboutStatsStarted]);

  useEffect(() => {
    if (!aboutStatsStarted) {
      return;
    }

    const durationMs = 1400;
    const startTime = performance.now();
    let frameId = 0;

    const tick = (now) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      setAboutStatValues(HOME_ABOUT_STATS.map((item) => Math.round(item.target * easedProgress)));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [aboutStatsStarted]);

  useEffect(() => {
    const sections = document.querySelectorAll(".home-v2-page section.fade-up");
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

  useEffect(() => {
    if (passwordPanelOpen) {
      passwordInputRef.current?.focus();
    }
  }, [passwordPanelOpen]);

  useEffect(() => {
    if (timePanelOpen) {
      timeSelectRef.current?.focus();
    }
  }, [timePanelOpen]);

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
    <div className="home-v2-page">
      <ToastContainer />
      <section className="home-v2-shell">
        <div id="home-hero" className="home-v2-body">
          <p className="home-v2-badge">type a name. get a page.</p>
          <h1 className="home-v2-title">The fastest way to share</h1>

          <p className="home-v2-subtext-muted">
            Share text, code and files online instantly
            <br />
            Upload once and access from any device.
          </p>

          <div className={`home-v2-input-row ${domainName.trim() ? "home-v2-input-row-active" : ""}`}>
            <span className="home-v2-prefix">nologin.in/</span>
            <input
              type="text"
              id="domainNameInput"
              placeholder="Enter page name"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value.toLowerCase())}
              onKeyDown={handleKeyPress}
            />
          </div>
          <div className="home-v2-hero-actions">
            {/* Temporarily hidden — restore to show Set time + Set password
            <div className="home-v2-controls-row">
              <div
                className={`home-v2-control home-v2-time-control ${timePanelOpen ? "home-v2-time-control--open" : ""}`}
                role="group"
                aria-label="Page expiry time"
                aria-expanded={timePanelOpen}
              >
                {!timePanelOpen ? (
                  <button
                    type="button"
                    className="home-v2-time-collapsed"
                    onClick={() => setTimePanelOpen(true)}
                  >
                    <span className="home-v2-time-collapsed-main">Set time</span>
                    <span className="home-v2-time-collapsed-optional">(optional)</span>
                  </button>
                ) : (
                  <select
                    ref={timeSelectRef}
                    id="expirationSelect"
                    className="home-v2-time-select"
                    value={expirationTime}
                    aria-label="Choose how long the page stays online"
                    onChange={(e) => {
                      setExpirationTime(e.target.value);
                      setTimePanelOpen(false);
                    }}
                    onBlur={() => {
                      window.setTimeout(() => setTimePanelOpen(false), 180);
                    }}
                  >
                    {expirationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div
                className={`home-v2-control home-v2-password-control ${passwordPanelOpen ? "home-v2-password-control--open" : ""}`}
              >
                {!passwordPanelOpen ? (
                  <button
                    type="button"
                    className="home-v2-password-collapsed"
                    onClick={() => setPasswordPanelOpen(true)}
                  >
                    Set Password
                  </button>
                ) : (
                  <div className="home-v2-password-editor">
                    <div className="home-v2-password-input-wrap">
                      <input
                        ref={passwordInputRef}
                        type={passwordVisible ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="home-v2-password-input"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="home-v2-password-visibility-btn"
                        onClick={() => setPasswordVisible((v) => !v)}
                        aria-label={passwordVisible ? "Hide password" : "Show password"}
                      >
                        {passwordVisible ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path
                              d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path
                              d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        )}
                      </button>
                    </div>
                    <div className="home-v2-password-close-slot">
                      <button
                        type="button"
                        className="home-v2-password-close"
                        onClick={() => {
                          setPasswordPanelOpen(false);
                          setPassword("");
                          setPasswordVisible(false);
                        }}
                        aria-label="Cancel password"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            */}
            <div className="home-v2-submit-row">
              <button
                onClick={handleSubmit}
                className={`home-v2-submit-btn ${domainName.trim() ? "home-v2-submit-btn-active" : ""}`}
                type="button"
              >
                Submit
              </button>
            </div>
            {/* <p className="home-v2-hero-expiry-hint">
              Default <strong>48 hours</strong>. Open Set time only if you want a different expiry.
            </p> */}
          </div>
        </div>

        <section id="about-home" className="home-v2-section home-v2-about">
          <p className="home-v2-section-kicker">ABOUT</p>
          <h2 className="home-v2-section-title">Built out of a real frustration.</h2>
          <p className="home-v2-about-copy">
            NoLogin was born in a college computer lab. A friend wrote the code I needed so I asked him to email it.
            Later I needed a file from my phone on the lab system so I emailed it to myself and logged into Gmail on a
            shared computer. Both times it worked. Both times it felt ridiculous. NoLogin exists so neither ever happens
            again.
          </p>

          <div ref={aboutStatsRef} className="home-v2-about-stats">
            {HOME_ABOUT_STATS.map((item, index) => (
              <article
                key={item.label}
                className="home-v2-about-stat"
                role="presentation"
                onClick={playCardLift}
                onAnimationEnd={endCardLift}
              >
                <h3>
                  {aboutStatValues[index]}
                  {item.suffix}
                </h3>
                <p>{item.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="features" className="home-v2-section home-v2-features-section fade-up">
          <p className="home-v2-section-kicker">FEATURES</p>
          <h2 className="home-v2-section-title">NoLogin Features</h2>

          <div className="home-v2-features-cards-grid">
            {HOME_FEATURE_ITEMS.map((item) => (
              <article
                key={item.title}
                className="home-v2-features-box-card"
                role="presentation"
                onClick={playCardLift}
                onAnimationEnd={endCardLift}
              >
                <div className="home-v2-features-box-icon-wrap">
                  <Image
                    src={item.iconSrc}
                    alt=""
                    width={40}
                    height={40}
                    className="home-v2-features-box-icon-img"
                    unoptimized
                  />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="why-nologin" className="home-v2-section home-v2-why fade-up">
          <p className="home-v2-section-kicker">WHY NOLOGIN</p>
          <h2 className="home-v2-section-title">How NoLogin helps</h2>

          <div className="home-v2-why-columns-grid">
            {HOME_WHY_ITEMS.map((item) => (
              <article
                key={item.title}
                className="home-v2-why-column-card"
                role="presentation"
                onClick={playCardLift}
                onAnimationEnd={endCardLift}
              >
                <div className="home-v2-why-rail" aria-hidden />
                <span className="home-v2-why-audience-pill">{item.pill}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="resources" className="home-v2-section home-v2-resources fade-up">
          <p className="home-v2-section-kicker">RESOURCES</p>
          <div className="home-v2-resource-list">
            <Link href="/share-text-online" className="home-v2-resource-chip">Share Text Online</Link>
            <Link href="/upload-files-online" className="home-v2-resource-chip">Upload Files Online</Link>
            <Link href="/instant-sharing" className="home-v2-resource-chip">Instant Sharing</Link>
            <Link href="/features-of-nologin" className="home-v2-resource-chip">Features of NoLogin</Link>
            <Link href="/best-online-sharing" className="home-v2-resource-chip">Best Online Sharing</Link>
            <Link href="/dontpad-alternative" className="home-v2-resource-chip">Dontpad Alternative</Link>
            <Link href="/pastebin-alternative" className="home-v2-resource-chip">Pastebin Alternative</Link>
            <Link href="/hastebin-alternative" className="home-v2-resource-chip">Hastebin Alternative</Link>
            <Link href="/online-clipboard" className="home-v2-resource-chip">Online Clipboard</Link>
            <Link href="/cross-device-sharing" className="home-v2-resource-chip">Cross Device Sharing</Link>
            <Link href="/share-code-online" className="home-v2-resource-chip">Share Code Online</Link>
            <Link href="/why-nologin" className="home-v2-resource-chip">Why NoLogin</Link>
          </div>
        </section>

        <section id="home-faq" className="home-v2-section home-v2-faq fade-up">
          <p className="home-v2-section-kicker">FAQ</p>
          <div className="home-v2-faq-list">
            <details className="home-v2-faq-item">
              <summary>What is a page name?</summary>
              <p>
                A unique word or combination of letters and numbers you choose (nologin.in/yourpagename). Choose
                something memorable if the name you want is already taken, pick a different one.
              </p>
            </details>
            <details className="home-v2-faq-item">
              <summary>Why is there a password option if NoLogin does not require login?</summary>
              <p>
                Password is optional. Set one if you want to restrict who can view your page. Without it, anyone with
                your page name can open it.
              </p>
            </details>
            <details className="home-v2-faq-item">
              <summary>What is Edit Lock?</summary>
              <p>
                Edit Lock makes your page read-only. Visitors can view and copy text or download files, but cannot
                edit, delete, or upload anything.
              </p>
            </details>
            <details className="home-v2-faq-item">
              <summary>What is the Set time?</summary>
              <p>
                Controls how long your content stays on the page. Once time runs out, all text and files are
                automatically and permanently deleted. Default is 48 hours.
              </p>
            </details>
            <details className="home-v2-faq-item">
              <summary>How many files can I upload and what is the size limit?</summary>
              <p>Up to 5 files per page, maximum 100MB per file.</p>
            </details>
            <details className="home-v2-faq-item">
              <summary>My content got deleted. What to do?</summary>
              <p>
                Either the timer expired or someone deleted it before you enabled Edit Lock. We do not store previous
                versions, content cannot be recovered.
              </p>
            </details>
          </div>
        </section>

      </section>
    </div>
  );
}
