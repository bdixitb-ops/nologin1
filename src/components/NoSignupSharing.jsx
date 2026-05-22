"use client";

export default function NoSignupSharing() {
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
        <h1 style={{ textAlign: "center", marginBottom: 14, color: "#c4b5fd" }}>Share Without Signup</h1>
        <p style={{ ...paragraphStyle, textAlign: "center", marginBottom: 26 }}>
          Share text, code and files online without signup, without login, without any account. Pick a page name, drop
          your content, share the link.
        </p>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Why signup walls exist and why they are a problem for sharing</h2>
          <p style={paragraphStyle}>
            Most sharing tools are built around user accounts because accounts make analytics, retention and upsells
            easier for the platform. That design may work for products, but it slows down people who simply need to
            send content now.
          </p>
          <p style={paragraphStyle}>
            Signup walls add friction at the worst moment: when you are in the middle of work and need to share quickly.
            Email verification, password setup, app installs and permission prompts turn a ten-second task into a full
            process.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>What no signup sharing actually means</h2>
          <h3 style={subHeadingStyle}>No account creation step</h3>
          <p style={paragraphStyle}>
            You should be able to open a page, add your text or files, and share immediately. No profile setup, no OTP,
            no waiting to unlock basic actions.
          </p>
          <h3 style={subHeadingStyle}>No onboarding overhead</h3>
          <p style={paragraphStyle}>
            Sharing should not require tutorials or dashboard setup. If you can type a page name, you can share.
          </p>
          <h3 style={subHeadingStyle}>No hidden conversion traps</h3>
          <p style={paragraphStyle}>
            No signup sharing means the core flow stays usable without forcing registration halfway through.
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
          <h2 style={{ ...sectionTitleStyle, marginBottom: 10 }}>No signup on either end</h2>
          <p style={paragraphStyle}>
            True no signup sharing is not only about the sender. The person receiving your link should also open it
            instantly without creating an account. When both sides can use the same page with just a browser, sharing is
            actually instant.
          </p>
          <p style={paragraphStyle}>
            This is where most tools break: they let one side upload but require the other side to sign in, install an
            app, or request access. No signup on either end removes all that friction.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Real situations where no signup matters most</h2>
          <h3 style={subHeadingStyle}>College labs and classrooms</h3>
          <p style={paragraphStyle}>
            Students and teachers need fast sharing on shared systems. Asking everyone to create accounts wastes class
            time and creates unnecessary confusion.
          </p>
          <h3 style={subHeadingStyle}>Client and vendor handoffs</h3>
          <p style={paragraphStyle}>
            When delivering files or notes to external people, account requirements become blockers. A simple open link
            keeps communication moving.
          </p>
          <h3 style={subHeadingStyle}>Cross-device personal transfer</h3>
          <p style={paragraphStyle}>
            Moving content from phone to laptop should not require logging in twice. No signup sharing keeps it quick
            and practical.
          </p>
          <h3 style={subHeadingStyle}>Workshops, events and support sessions</h3>
          <p style={paragraphStyle}>
            In time-sensitive sessions, every participant needs immediate access. Signup steps create delay and drop-off.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>What you can share without signup</h2>
          <p style={paragraphStyle}>
            No signup sharing is not limited to plain notes. You can share text instructions, code snippets, documents,
            screenshots, and other files from the same page.
          </p>
          <p style={paragraphStyle}>
            Keeping text and files together in one link avoids scattered threads and missing context.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Controls you get without an account</h2>
          <h3 style={subHeadingStyle}>Page name control</h3>
          <p style={paragraphStyle}>Choose a clean page name that is easy to remember and share.</p>
          <h3 style={subHeadingStyle}>Expiry control</h3>
          <p style={paragraphStyle}>Set content to auto-delete after the time you choose.</p>
          <h3 style={subHeadingStyle}>Password protection</h3>
          <p style={paragraphStyle}>Add a password when you need restricted access.</p>
          <h3 style={subHeadingStyle}>Edit lock</h3>
          <p style={paragraphStyle}>Lock changes when you want the shared page to stay exactly as posted.</p>
        </section>

        <section style={{ marginBottom: 6 }}>
          <h2 style={sectionTitleStyle}>No signup. No login. No catch.</h2>
          <p style={paragraphStyle}>
            The point is simple: sharing online should feel instant again. Pick a page name, drop your content, and
            share the link.
          </p>
          <p style={{ ...paragraphStyle, color: "#fff", fontWeight: 600 }}>
            No signup. No login. No catch.
          </p>
        </section>
      </div>
    </main>
  );
}
