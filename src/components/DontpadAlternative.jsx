"use client";

export default function DontpadAlternative() {
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

  const compareRow = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 12,
    padding: "10px 0",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    color: "#d1d5db",
    fontSize: 15,
  };

  const compareHeader = {
    ...compareRow,
    color: "#fff",
    fontWeight: 600,
    borderBottom: "1px solid rgba(184,163,255,0.35)",
  };

  return (
    <main className="resource-longform">
      <div className="resource-longform-inner">
        <h1 style={{ textAlign: "center", marginBottom: 14, color: "#c4b5fd" }}>The Best Dontpad Alternative</h1>
        <p style={{ ...paragraphStyle, textAlign: "center", marginBottom: 26 }}>
          Everything Dontpad does, plus file uploads, password protection, edit lock and expiry control. Free. No
          login. No signup.
        </p>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>What is Dontpad</h2>
          <p style={paragraphStyle}>
            Dontpad is a Brazilian text-sharing tool built around a simple idea - type a word after dontpad.com/ and
            you get a shared notepad. No login required. Anyone with the URL can read and edit the content.
          </p>
          <p style={paragraphStyle}>
            It became popular in colleges and classrooms across Brazil and India for exactly that reason. Fast,
            simple, no friction.
          </p>
          <p style={paragraphStyle}>
            But Dontpad has not changed much since it launched in 2011. And the gaps in what it offers have become
            more obvious as people try to use it for more than basic text sharing.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Where Dontpad falls short</h2>

          <h3 style={subHeadingStyle}>No file uploads</h3>
          <p style={paragraphStyle}>
            Dontpad is text only. If you need to share a PDF, an image, a code file or any other file alongside your
            text, Dontpad cannot help you. You end up using two separate tools.
          </p>

          <h3 style={subHeadingStyle}>No password protection</h3>
          <p style={paragraphStyle}>
            Every Dontpad page is completely public. Anyone who guesses or finds your URL can read everything on it.
            There is no way to restrict access.
          </p>

          <h3 style={subHeadingStyle}>No edit lock</h3>
          <p style={paragraphStyle}>
            Anyone who opens your Dontpad page can delete or overwrite your content. There is no way to make a page
            read-only. This has caused real problems for people who share important content only to find it deleted by
            someone else.
          </p>

          <h3 style={subHeadingStyle}>No expiry control</h3>
          <p style={paragraphStyle}>
            Content on Dontpad stays up indefinitely unless someone manually deletes it. You cannot set a timer and
            have it disappear automatically.
          </p>

          <h3 style={subHeadingStyle}>Guessable URLs</h3>
          <p style={paragraphStyle}>
            Because Dontpad uses simple words as page names, pages are easy to stumble across. If your page name is
            common, someone else has probably already used it or will find it.
          </p>

          <h3 style={subHeadingStyle}>No file support means no real use for developers</h3>
          <p style={paragraphStyle}>
            Sharing code as plain text works but sharing actual files, configs or builds is not possible.
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
          <h2 style={{ ...sectionTitleStyle, marginBottom: 10 }}>What NoLogin does differently</h2>
          <p style={paragraphStyle}>
            NoLogin started from the same principle as Dontpad - no login, a simple page name, instant access. But it
            solves every gap that Dontpad leaves open.
          </p>

          <h3 style={subHeadingStyle}>File uploads</h3>
          <p style={paragraphStyle}>
            Upload up to 5 files per page, up to 100MB each. Text and files live together on the same page. One link
            for everything.
          </p>

          <h3 style={subHeadingStyle}>Password protection</h3>
          <p style={paragraphStyle}>
            Set a password on any page to restrict who can view it. The link still works for anyone with the password,
            but no one else can read your content.
          </p>

          <h3 style={subHeadingStyle}>Edit lock</h3>
          <p style={paragraphStyle}>
            Make your page read-only. Visitors can view and copy text or download files but cannot edit, delete or
            upload anything. Your content stays exactly as you left it.
          </p>

          <h3 style={subHeadingStyle}>Expiry control</h3>
          <p style={paragraphStyle}>
            Set your page to automatically delete after 1 hour, 24 hours, 7 days or up to 30 days. No cleanup needed.
            Content disappears on its own.
          </p>

          <h3 style={subHeadingStyle}>Custom page names</h3>
          <p style={paragraphStyle}>
            Just like Dontpad, you choose your own page name. Short, readable, easy to share out loud or write on a
            board.
          </p>
          <div style={{ marginBottom: 10 }}>
            <span style={linkPillStyle}>nologin.in/notes</span>
            <span style={linkPillStyle}>nologin.in/labcode</span>
            <span style={linkPillStyle}>nologin.in/slides</span>
          </div>

          <h3 style={subHeadingStyle}>No login on either end</h3>
          <p style={paragraphStyle}>
            The person receiving your link does not need a NoLogin account. They open the link and get instant access.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Side by side comparison</h2>
          <div style={{ marginTop: 8 }}>
            <div style={compareHeader}>
              <span>Feature</span>
              <span>Dontpad</span>
              <span>NoLogin</span>
            </div>
            <div style={compareRow}>
              <span>Text sharing</span>
              <span>yes</span>
              <span>yes</span>
            </div>
            <div style={compareRow}>
              <span>File uploads</span>
              <span>no</span>
              <span>yes, up to 5 files, 100MB each</span>
            </div>
            <div style={compareRow}>
              <span>Password protection</span>
              <span>no</span>
              <span>yes, optional</span>
            </div>
            <div style={compareRow}>
              <span>Edit lock</span>
              <span>no</span>
              <span>yes, optional</span>
            </div>
            <div style={compareRow}>
              <span>Expiry timer</span>
              <span>no</span>
              <span>yes, 1 hour to 30 days</span>
            </div>
            <div style={compareRow}>
              <span>Custom page name</span>
              <span>yes</span>
              <span>yes</span>
            </div>
            <div style={compareRow}>
              <span>No login required</span>
              <span>yes</span>
              <span>yes</span>
            </div>
            <div style={{ ...compareRow, borderBottom: "none" }}>
              <span>Free to use</span>
              <span>yes</span>
              <span>yes</span>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Who should switch to NoLogin</h2>
          <p style={paragraphStyle}>
            If you use Dontpad only for quick text sharing and it works fine for you, that is a perfectly reasonable
            choice. Dontpad does that one thing well.
          </p>
          <p style={{ ...paragraphStyle, marginBottom: 8 }}>
            But if you have ever run into any of these situations with Dontpad, NoLogin is worth trying:
          </p>
          <ul className="resource-longform-list">
            <li>
              Someone deleted or overwrote your content before you were done with it. Edit lock prevents this.
            </li>
            <li>You needed to share a file alongside your text but could not. NoLogin handles both on the same page.</li>
            <li>
              You shared something sensitive and anyone with a guessed URL could read it. Password protection solves
              this.
            </li>
            <li>You forgot to delete old content and it stayed up longer than you wanted. Expiry timers handle this automatically.</li>
            <li>
              You tried to use a simple page name and found it was already taken or had someone else&apos;s content on
              it. This happens on Dontpad constantly because of guessable URLs - use a more specific page name on NoLogin
              and set edit lock immediately.
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: 6 }}>
          <h2 style={sectionTitleStyle}>NoLogin is built for the same people who love Dontpad</h2>
          <p style={paragraphStyle}>
            Students, teachers, developers, event organisers, lab partners. Anyone who needs to share something quickly
            without the friction of login, accounts or long URLs.
          </p>
          <p style={paragraphStyle}>
            The difference is NoLogin gives you the controls that Dontpad never added. Password, edit lock, file
            uploads, expiry. Features that matter the moment you try to use a no-login sharing tool for anything beyond
            the simplest text paste.
          </p>
          <p style={{ ...paragraphStyle, color: "#fff", fontWeight: 600 }}>
            Type a page name at nologin.in to get started. No account needed.
          </p>
        </section>
      </div>
    </main>
  );
}
