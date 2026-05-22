"use client";

export default function Notepad() {
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
        <h1 style={{ textAlign: "center", marginBottom: 14, color: "#c4b5fd" }}>Online Notepad</h1>
        <p style={{ ...paragraphStyle, textAlign: "center", marginBottom: 26 }}>
          A free online notepad that requires no login and no signup. Type your notes, access them from any device
          using just a page name.
        </p>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Why most online notepads get in the way</h2>
          <p style={paragraphStyle}>
            Most online notepad tools add friction before you can even start writing. They ask for account creation,
            force app installs, or lock basic features behind signups.
          </p>
          <h3 style={subHeadingStyle}>Unnecessary login flow</h3>
          <p style={paragraphStyle}>
            You should not have to verify email, set a password, and log in every time you want to save a quick note.
          </p>
          <h3 style={subHeadingStyle}>Device restrictions</h3>
          <p style={paragraphStyle}>
            Some notepads work best only inside one app or one ecosystem, which breaks the moment you switch from phone
            to laptop or use a shared computer.
          </p>
          <h3 style={subHeadingStyle}>Too much setup for simple notes</h3>
          <p style={paragraphStyle}>
            For quick notes, copied text, or temporary writing, setup overhead kills speed. An online notepad should be
            instant.
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
          <h2 style={{ ...sectionTitleStyle, marginBottom: 10 }}>How NoLogin works as an online notepad</h2>
          <p style={paragraphStyle}>
            NoLogin gives you a browser-based notepad linked to a page name you choose. Open nologin.in, type a page
            name, and start writing.
          </p>
          <div style={{ marginBottom: 10 }}>
            <span style={linkPillStyle}>nologin.in/notes</span>
            <span style={linkPillStyle}>nologin.in/study</span>
            <span style={linkPillStyle}>nologin.in/meeting</span>
          </div>
          <p style={paragraphStyle}>
            Open the same page name on any device and your notes are there. No account, no app, and no install needed.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>What you can do with your online notepad</h2>
          <h3 style={subHeadingStyle}>Write and organize quick notes</h3>
          <p style={paragraphStyle}>
            Capture ideas, reminders, task lists, and rough drafts in seconds without switching tools.
          </p>
          <h3 style={subHeadingStyle}>Access notes from any device</h3>
          <p style={paragraphStyle}>
            Start writing on your phone and continue on your laptop by opening the same page name.
          </p>
          <h3 style={subHeadingStyle}>Share notes instantly</h3>
          <p style={paragraphStyle}>
            Share a page name with teammates, classmates, or friends so they can open the same content immediately.
          </p>
          <h3 style={subHeadingStyle}>Keep notes temporary when needed</h3>
          <p style={paragraphStyle}>
            Set expiry for temporary notes, and use edit lock or password protection when you need extra control.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Who uses NoLogin as an online notepad</h2>
          <p style={paragraphStyle}>
            Students use it for lecture notes and assignments. Teams use it for meeting points and quick collaboration.
            Developers use it for snippets, commands, and draft documentation. Anyone who needs a simple online notepad
            without signup can use it instantly.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>NoLogin vs other online notepads</h2>
          <ol className="resource-longform-list">
            <li>NoLogin works without login or signup.</li>
            <li>You choose your own page name instead of using random links.</li>
            <li>It runs in the browser on any device with no app install.</li>
            <li>Text and file support are available in one place.</li>
          </ol>
          <p style={paragraphStyle}>
            If you need speed and simplicity, NoLogin behaves like an online notepad should: open, type, and continue
            from anywhere.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>A note on privacy and security</h2>
          <p style={paragraphStyle}>
            NoLogin is built for convenience, and you still get practical controls. You can set passwords, lock edits,
            and configure expiry so notes do not stay online longer than needed. For sensitive information, always use a
            strong page name and password protection.
          </p>
        </section>

        <section style={{ marginBottom: 6 }}>
          <h2 style={sectionTitleStyle}>Start using your online notepad</h2>
          <p style={paragraphStyle}>
            Open nologin.in, pick a page name, and start typing. Access the same page from any device whenever you need
            it.
          </p>
          <p style={{ ...paragraphStyle, color: "#fff", fontWeight: 600 }}>
            Free. No login. No signup. Just your online notepad.
          </p>
        </section>
      </div>
    </main>
  );
}
