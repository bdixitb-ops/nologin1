"use client";

import HomeHeroBlock from "@/components/HomeHeroBlock";
import { RESOURCE_PAGE_FAQ } from "@/components/resource/resourcePageFaq";
import UrlPill from "@/components/resource/UrlPill";
import { useCallback, useEffect } from "react";
import { ToastContainer } from "react-toastify";

/**
 * Shared marketing page template (hero, intro, card grid, how steps, situations, bullets, FAQ).
 */
export default function ResourceMarketingPage({
  pageClass,
  hero,
  intro,
  cardGrid,
  how,
  situations,
  bulletSection,
  faqId = "resource-faq",
  howBeforeCards = false,
}) {
  useEffect(() => {
    const sections = document.querySelectorAll(`.${pageClass} section.fade-up`);
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
  }, [pageClass]);

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

  const howSection = how ? (
    <section
      className="home-v2-section home-v2-why instant-page-how fade-up"
      aria-labelledby={`${pageClass}-how`}
    >
      <p className="home-v2-section-kicker">{how.kicker}</p>
      <h2 id={`${pageClass}-how`} className="home-v2-section-title">
        {how.title}
      </h2>
      {how.lead ? <p className="instant-page-section-lead">{how.lead}</p> : null}
      <div className="home-v2-why-columns-grid instant-page-how-grid">
        {how.steps.map((step) => (
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
  ) : null;

  const cardGridSection = cardGrid ? (
    <section
      className={`home-v2-section home-v2-features-section fade-up ${cardGrid.sectionClass || "instant-page-text-types"}`}
      aria-labelledby={`${pageClass}-cards`}
    >
      <p className="home-v2-section-kicker">{cardGrid.kicker}</p>
      <h2 id={`${pageClass}-cards`} className="home-v2-section-title">
        {cardGrid.title}
      </h2>
      {cardGrid.lead ? <p className="instant-page-section-lead">{cardGrid.lead}</p> : null}
      <div className={`home-v2-features-cards-grid ${cardGrid.gridClass || "instant-page-text-types-grid"}`}>
        {cardGrid.items.map((item) => (
          <article
            key={item.title}
            className="home-v2-features-box-card"
            role="presentation"
            onClick={playCardLift}
            onAnimationEnd={endCardLift}
          >
            {item.pill ? <span className="home-v2-why-audience-pill">{item.pill}</span> : null}
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
  ) : null;

  return (
    <div className={`home-v2-page resource-page ${pageClass}`}>
      <ToastContainer />
      <section className="home-v2-shell">
        <HomeHeroBlock badge={hero.badge} title={hero.title} subtext={hero.subtext} />

        {intro ? (
          <section className="home-v2-section instant-page-block fade-up" aria-labelledby={`${pageClass}-intro`}>
            <p className="home-v2-section-kicker">{intro.kicker}</p>
            <h2
              id={`${pageClass}-intro`}
              className={`home-v2-section-title${intro.brightTitle ? " instant-page-intro-title" : ""}`}
            >
              {intro.title}
            </h2>
            <div className="instant-page-prose">
              {intro.paragraphs.map((text) => (
                <p key={text.slice(0, 40)}>{text}</p>
              ))}
              {intro.urlLabel ? <p className="instant-page-prose-label">{intro.urlLabel}</p> : null}
              {intro.urls?.length ? (
                <div className="instant-page-url-pills">
                  {intro.urls.map((link) => (
                    <UrlPill key={link} href={link} />
                  ))}
                </div>
              ) : null}
              {intro.footerParagraphs?.map((text) => (
                <p key={text.slice(0, 40)}>{text}</p>
              ))}
            </div>
          </section>
        ) : null}

        {howBeforeCards ? howSection : null}
        {howBeforeCards ? cardGridSection : null}
        {!howBeforeCards ? cardGridSection : null}
        {!howBeforeCards ? howSection : null}

        {situations ? (
          <section
            className="home-v2-section home-v2-features-section instant-page-who fade-up"
            aria-labelledby={`${pageClass}-situations`}
          >
            <p className="home-v2-section-kicker">{situations.kicker}</p>
            <h2 id={`${pageClass}-situations`} className="home-v2-section-title">
              {situations.title}
            </h2>
            <div className="home-v2-features-cards-grid instant-page-who-grid">
              {situations.items.map((item) => (
                <article
                  key={item.title}
                  className="home-v2-features-box-card"
                  role="presentation"
                  onClick={playCardLift}
                  onAnimationEnd={endCardLift}
                >
                  {item.pill ? <span className="home-v2-why-audience-pill">{item.pill}</span> : null}
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
        ) : null}

        {bulletSection ? (
          <section className="home-v2-section instant-page-switch fade-up" aria-labelledby={`${pageClass}-bullets`}>
            <p className="home-v2-section-kicker">{bulletSection.kicker}</p>
            <h2 id={`${pageClass}-bullets`} className="home-v2-section-title">
              {bulletSection.title}
            </h2>
            {bulletSection.lead ? <p className="instant-page-section-lead">{bulletSection.lead}</p> : null}
            <ul className="instant-page-switch-list">
              {bulletSection.items.map((item) => (
                <li key={item.title || item.body.slice(0, 40)}>
                  {item.title ? <h3>{item.title}</h3> : null}
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section id={faqId} className="home-v2-section home-v2-faq fade-up">
          <p className="home-v2-section-kicker">FAQ</p>
          <div className="home-v2-faq-list">
            {RESOURCE_PAGE_FAQ.map((item) => (
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
