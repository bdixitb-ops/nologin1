"use client";

export default function FastestOnlineSharing() {
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

  return (
    <main className="resource-longform">
      <div className="resource-longform-inner">
        <h1 style={{ textAlign: "center", marginBottom: 14, color: "#c4b5fd" }}>The Fastest Way to Share Online</h1>
        <p style={{ ...paragraphStyle, textAlign: "center", marginBottom: 26 }}>
          Share text, code and files online in seconds. No login, no signup, no waiting. Pick a page name, drop your
          content, share the link, and you are done in under ten seconds.
        </p>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>What makes online sharing slow</h2>
          <p style={paragraphStyle}>
            Most sharing tools add friction before you can send anything. You sign in, verify identity, navigate
            dashboards, create folders, set permissions, and then wait for uploads and link generation.
          </p>
          <h3 style={subHeadingStyle}>Too many setup steps</h3>
          <p style={paragraphStyle}>
            Traditional tools are built around accounts and workflows, not speed. Even quick sharing turns into a
            multi-step process that breaks momentum.
          </p>
          <h3 style={subHeadingStyle}>Delay at every stage</h3>
          <p style={paragraphStyle}>
            Slow interfaces, heavy pages, and extra confirmations create delay. When the task is simple, every
            additional click feels unnecessary.
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
          <h2 style={{ ...sectionTitleStyle, marginBottom: 10 }}>What fast online sharing actually looks like</h2>
          <p style={paragraphStyle}>
            Fast sharing means starting immediately. Open the page, choose a name, paste text or upload files, and
            share the URL. No onboarding and no account walls.
          </p>
          <p style={paragraphStyle}>
            The process is simple enough to repeat from memory every time, even on mobile, in labs, during meetings,
            or while switching devices.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>How fast is NoLogin in practice</h2>
          <p style={paragraphStyle}>
            In real usage, most shares take less than ten seconds when you know your page name. Open NoLogin, add the
            content, and the link is ready instantly.
          </p>
          <h3 style={subHeadingStyle}>Built for immediate use</h3>
          <p style={paragraphStyle}>
            You do not lose time creating an account or configuring settings before the first share. The flow is direct
            from the first click.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>The hidden cost of slow sharing tools</h2>
          <p style={paragraphStyle}>
            Slow sharing does not just waste seconds once. It interrupts focus, delays responses, and adds repeated
            friction across every handoff.
          </p>
          <p style={paragraphStyle}>
            Over days and weeks, those small delays stack up into lost time and unnecessary context switching.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Where fast sharing matters most</h2>
          <h3 style={subHeadingStyle}>Team collaboration</h3>
          <p style={paragraphStyle}>
            Quick link sharing keeps conversations moving when teammates need code, notes, files, or screenshots
            immediately.
          </p>
          <h3 style={subHeadingStyle}>Cross-device transfer</h3>
          <p style={paragraphStyle}>
            Move content between phone and laptop without cables, apps, or account sync delays.
          </p>
          <h3 style={subHeadingStyle}>Time-sensitive moments</h3>
          <p style={paragraphStyle}>
            During demos, interviews, classes, labs, and support calls, speed matters. Fast sharing helps you keep
            momentum when timing is tight.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Why speed and simplicity go together</h2>
          <p style={paragraphStyle}>
            The fastest tools are the simplest tools. Fewer steps mean fewer decisions, less confusion, and fewer
            failure points.
          </p>
          <p style={paragraphStyle}>
            NoLogin is designed around this principle: one page name, one action flow, and one link to share.
          </p>
        </section>

        <section style={{ marginBottom: 6 }}>
          <h2 style={sectionTitleStyle}>Start sharing in under ten seconds</h2>
          <p style={paragraphStyle}>
            Open NoLogin, type a page name, add your text or files, and share the link. That is it.
          </p>
          <p style={{ ...paragraphStyle, color: "#fff", fontWeight: 600 }}>
            No login. No signup. No waiting. Just fast online sharing.
          </p>
        </section>
      </div>
    </main>
  );
}
