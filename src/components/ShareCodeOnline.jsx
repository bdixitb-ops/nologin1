"use client";

export default function ShareCodeOnline() {
  const sectionTitleStyle = {
    fontSize: 28,
    color: "#b8a3ff",
    marginBottom: 12,
  };

  const subHeadingStyle = {
    color: "#fff",
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 8,
  };

  const paragraphStyle = {
    color: "#d1d5db",
    lineHeight: 1.8,
    marginBottom: 12,
  };

  const linkPillStyle = {
    display: "inline-block",
    padding: "8px 12px",
    borderRadius: 999,
    border: "1px solid #6d28d9",
    background: "rgba(109, 40, 217, 0.18)",
    color: "#fff",
    marginRight: 10,
    marginBottom: 10,
    fontWeight: 600,
  };

  return (
    <main className="resource-longform">
      <div className="resource-longform-inner">
        <h1 style={{ textAlign: "center", marginBottom: 14, color: "#c4b5fd" }}>Share Code Online</h1>
        <p style={{ ...paragraphStyle, textAlign: "center", marginBottom: 26 }}>
          Paste your code, pick a page name, share the link. No login. No GitHub. No account. Live in seconds.
        </p>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>When you need to share code without the overhead</h2>
          <p style={paragraphStyle}>
            When you need to share code without the overhead.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>What developers actually use to share code quickly</h2>
          <p style={paragraphStyle}>
            What developers actually use to share code quickly.
          </p>
        </section>

        <section
          style={{
            marginBottom: 26,
            padding: "16px 18px",
            border: "1px solid #6d28d9",
            borderRadius: 14,
            background: "linear-gradient(180deg, rgba(109,40,217,0.16), rgba(109,40,217,0.04))",
          }}
        >
          <h2 style={{ ...sectionTitleStyle, marginBottom: 10 }}>How to share code online with NoLogin</h2>
          <ol className="resource-longform-list">
            <li>Open nologin.in and choose a page name.</li>
            <li>Paste your code or upload your code files.</li>
            <li>Set options like expiry, edit lock, or password if needed.</li>
            <li>Share the same link with anyone who needs access.</li>
          </ol>
          <div style={{ marginBottom: 10 }}>
            <span style={linkPillStyle}>nologin.in/snippet</span>
            <span style={linkPillStyle}>nologin.in/fix</span>
            <span style={linkPillStyle}>nologin.in/review</span>
            <span style={linkPillStyle}>nologin.in/hackathon</span>
          </div>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Real situations where this saves time</h2>

          <h3 style={subHeadingStyle}>Temporary code before a decision is made</h3>
          <p style={paragraphStyle}>Temporary code before a decision is made.</p>

          <h3 style={subHeadingStyle}>Hackathons</h3>
          <p style={paragraphStyle}>Hackathons.</p>

          <h3 style={subHeadingStyle}>Pair programming across devices</h3>
          <p style={paragraphStyle}>Pair programming across devices.</p>

          <h3 style={subHeadingStyle}>Sharing code with non-developers</h3>
          <p style={paragraphStyle}>Sharing code with non-developers.</p>

          <h3 style={subHeadingStyle}>Quick code reviews outside the repository</h3>
          <p style={paragraphStyle}>Quick code reviews outside the repository.</p>

          <h3 style={subHeadingStyle}>Sharing error logs and debug output</h3>
          <p style={paragraphStyle}>Sharing error logs and debug output.</p>

          <h3 style={subHeadingStyle}>Conferences, meetups and tech talks</h3>
          <p style={paragraphStyle}>Conferences, meetups and tech talks.</p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Features that matter for sharing code</h2>
          <h3 style={subHeadingStyle}>Upload actual code files</h3>
          <p style={paragraphStyle}>Share complete files when plain text is not enough.</p>
          <h3 style={subHeadingStyle}>Up to 5 files per page</h3>
          <p style={paragraphStyle}>Keep related snippets and assets together on one link.</p>
          <h3 style={subHeadingStyle}>Edit lock</h3>
          <p style={paragraphStyle}>Protect content from accidental edits once shared.</p>
          <h3 style={subHeadingStyle}>Expiry control</h3>
          <p style={paragraphStyle}>Auto-delete temporary code pages after they are no longer needed.</p>
          <h3 style={subHeadingStyle}>Password protection</h3>
          <p style={paragraphStyle}>Restrict access to people who have the password.</p>
          <h3 style={subHeadingStyle}>Custom page names</h3>
          <p style={paragraphStyle}>Use readable links that are easy to type and remember.</p>
          <h3 style={subHeadingStyle}>No account on either end</h3>
          <p style={paragraphStyle}>You can share and recipients can open without signup.</p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>When to use NoLogin vs GitHub</h2>
          <p style={paragraphStyle}>When to use NoLogin vs GitHub.</p>
        </section>

        <section style={{ marginBottom: 6 }}>
          <h2 style={sectionTitleStyle}>Start sharing code online</h2>
          <p style={paragraphStyle}>
            Start sharing code online.
          </p>
        </section>
      </div>
    </main>
  );
}
