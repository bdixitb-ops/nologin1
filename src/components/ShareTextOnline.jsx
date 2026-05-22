"use client";

export default function ShareTextOnline() {
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
        <h1 style={{ textAlign: "center", marginBottom: 14, color: "#c4b5fd" }}>Share Text Online</h1>
        <p style={{ ...paragraphStyle, textAlign: "center", marginBottom: 26 }}>
          Paste your text, pick a page name, share the link. No login. No signup. No account. Done in seconds.
        </p>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>The simplest way to share text online</h2>
          <p style={paragraphStyle}>
            Most tools that let you share text online ask you to create an account first. Or they generate a long ugly
            URL you have to copy and send. Or they only work if the other person also has the app installed.
          </p>
          <p style={paragraphStyle}>NoLogin does none of that.</p>
          <p style={paragraphStyle}>
            You open nologin.in, type a page name you choose yourself, paste your text, and share the link. The link
            is just:
          </p>
          <div style={{ marginBottom: 10 }}>
            <span style={linkPillStyle}>nologin.in/yourpagename</span>
          </div>
          <p style={paragraphStyle}>
            Short. Clean. Easy to say out loud or write on a board. Anyone opens it instantly on any device - no login
            required on either end.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>What kind of text can you share</h2>

          <h3 style={subHeadingStyle}>Code</h3>
          <p style={paragraphStyle}>
            Paste a function, a script, or an entire file. Your recipient gets it formatted and ready to copy. No
            email thread, no attachment, no download required.
          </p>

          <h3 style={subHeadingStyle}>Notes</h3>
          <p style={paragraphStyle}>
            Lecture notes, meeting notes, study material, quick summaries. Create a page, paste the content, share the
            name. Everyone who needs it can open it.
          </p>

          <h3 style={subHeadingStyle}>Messages and announcements</h3>
          <p style={paragraphStyle}>
            Need to share something with a group without setting up a group chat? Put it on a NoLogin page and share
            the name once.
          </p>

          <h3 style={subHeadingStyle}>Drafts and documents</h3>
          <p style={paragraphStyle}>
            Write something, share the link for feedback, update the content without sending a new version. Everyone
            with the link always sees the latest version.
          </p>

          <h3 style={subHeadingStyle}>Credentials and instructions</h3>
          <p style={paragraphStyle}>
            Share a config, an API key, setup instructions, or onboarding notes. Set an expiry so it disappears after
            the right person has read it.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>How to share text online with NoLogin</h2>
          <ol className="resource-longform-list">
            <li>Go to nologin.in and type a page name</li>
            <li>Paste your text into the editor</li>
            <li>Set an expiry if you want it temporary</li>
            <li>Share the page name or link</li>
          </ol>
          <p style={paragraphStyle}>
            That is the entire process. No verification email. No permissions to configure. No app to install. The
            person receiving it just opens the link.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Real situations where this saves time</h2>

          <h3 style={subHeadingStyle}>In a college lab</h3>
          <p style={paragraphStyle}>
            You finish writing a program and need to share it with your partner two seats away. Instead of emailing
            yourself or carrying a pendrive, you paste it to nologin.in/labcode and say the page name out loud. Ten
            seconds.
          </p>

          <h3 style={subHeadingStyle}>In a classroom</h3>
          <p style={paragraphStyle}>
            A teacher wants to share the day's notes with students. Write the page name on the board. Students open it
            on their phones. No WhatsApp group, no email list, no file attachment.
          </p>

          <h3 style={subHeadingStyle}>In a team</h3>
          <p style={paragraphStyle}>
            Someone needs to share a quick draft or checklist without creating a shared document and managing
            permissions. One NoLogin page, one link in the chat, done.
          </p>

          <h3 style={subHeadingStyle}>At an event</h3>
          <p style={paragraphStyle}>
            Paste the schedule, speaker links or resources onto a page. Show the name on the projector. Everyone in
            the room has it instantly.
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
          <h2 style={{ ...sectionTitleStyle, marginBottom: 10 }}>Why people switch to NoLogin for text sharing</h2>
          <p style={paragraphStyle}>
            Pastebin requires an account for most features and generates random URLs you cannot control. Dontpad is
            text-only with no file support and no password protection. Google Docs needs everyone to have a Google
            account and understand sharing permissions.
          </p>
          <p style={{ ...paragraphStyle, marginBottom: 8 }}>NoLogin is different in a few specific ways:</p>

          <h3 style={subHeadingStyle}>The page name is yours</h3>
          <p style={paragraphStyle}>
            You choose it, you remember it, you control it. There are no randomly generated strings.
          </p>

          <h3 style={subHeadingStyle}>Text and files live together</h3>
          <p style={paragraphStyle}>
            Paste your notes and upload the related files on the same page. One link for everything.
          </p>

          <h3 style={subHeadingStyle}>No account on either end</h3>
          <p style={paragraphStyle}>
            The person receiving your link does not need NoLogin. They just need a browser.
          </p>

          <h3 style={subHeadingStyle}>Edit anytime</h3>
          <p style={paragraphStyle}>
            Come back to the same page and update your text. Everyone with the link sees the latest version
            automatically.
          </p>

          <h3 style={subHeadingStyle}>Optional protections</h3>
          <p style={paragraphStyle}>
            Add a password if you want to restrict who can view it. Add edit lock if you want to prevent others from
            modifying it. Both are optional.
          </p>

          <h3 style={subHeadingStyle}>Automatic expiry</h3>
          <p style={paragraphStyle}>
            Set your text to disappear after 1 hour, 24 hours, or up to 30 days. Useful for temporary sharing where
            you do not want content sitting online permanently.
          </p>
        </section>

        <section style={{ marginBottom: 6 }}>
          <h2 style={sectionTitleStyle}>Share text online, free, no account needed</h2>
          <p style={paragraphStyle}>
            NoLogin is free to use. There is no free tier with limits, no trial that expires, no credit card required.
            Open a page, paste your text, share the link.
          </p>
          <p style={paragraphStyle}>
            If you have been looking for a fast way to share text online without login, without signup, and without the
            friction that comes with most sharing tools - this is it.
          </p>
          <p style={{ ...paragraphStyle, color: "#fff", fontWeight: 600 }}>
            Type a page name at nologin.in to get started.
          </p>
        </section>
      </div>
    </main>
  );
}
