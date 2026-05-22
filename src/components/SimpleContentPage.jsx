"use client";

export default function SimpleContentPage({ title, sections }) {
  return (
    <main className="resource-longform">
      <div className="resource-longform-inner" style={{ maxWidth: 900 }}>
        <h1 className="resource-longform-title" style={{ marginBottom: 28 }}>
          {title}
        </h1>
        {sections.map((section, idx) => (
          <section key={idx} style={{ marginBottom: 26 }}>
            {section.heading ? (
              <h2 style={{ fontSize: 24, marginBottom: 10, color: "#b8a3ff" }}>{section.heading}</h2>
            ) : null}
            {section.paragraphs?.map((p, pIdx) => (
              <p key={pIdx} style={{ color: "#d1d5db", lineHeight: 1.7, marginBottom: 10 }}>
                {p}
              </p>
            ))}
            {section.items?.length ? (
              <ul className="resource-longform-list">
                {section.items.map((item, iIdx) => (
                  <li key={iIdx}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </main>
  );
}
