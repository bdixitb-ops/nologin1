"use client";

export default function InstantSharing() {
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
        <h1 style={{ textAlign: "center", marginBottom: 14, color: "#c4b5fd" }}>Instant Sharing Online</h1>
        <p style={{ ...paragraphStyle, textAlign: "center", marginBottom: 26 }}>
          The fastest way to share text, code and files - no login, no signup, no account. Just a page name and a
          link.
        </p>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>What is instant sharing?</h2>
          <p style={paragraphStyle}>
            Instant sharing means getting your content in front of someone else in the fewest steps possible. No login
            screens. No account creation. No waiting for a verification email. No fumbling with permissions or long
            cloud drive URLs.
          </p>
          <p style={paragraphStyle}>
            NoLogin is built specifically for this. You choose a short page name, drop in your text, code or files,
            and share the link. Anyone with the link opens it instantly from any device - phone, laptop, lab computer,
            anything with a browser.
          </p>
          <p style={{ ...paragraphStyle, marginBottom: 8 }}>That link looks like this:</p>
          <div style={{ marginBottom: 10 }}>
            <span style={linkPillStyle}>nologin.in/labcode</span>
            <span style={linkPillStyle}>nologin.in/slides</span>
            <span style={linkPillStyle}>nologin.in/notes</span>
          </div>
          <p style={paragraphStyle}>
            Short. Human-readable. No random characters. No expiring tokens. Just a word you choose.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>How instant sharing works on NoLogin</h2>
          <ol className="resource-longform-list">
            <li>Type a page name at nologin.in/yourpagename</li>
            <li>Paste your text, code or upload your files</li>
            <li>Share the link - verbally, on a board, or in a message</li>
            <li>Anyone opens it instantly, no login required</li>
          </ol>
          <p style={paragraphStyle}>
            There is no step where someone has to create an account, verify an email, or request access. The link
            works for everyone, immediately.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Who uses instant sharing on NoLogin</h2>

          <h3 style={subHeadingStyle}>Students and lab partners</h3>
          <p style={paragraphStyle}>
            In a computer lab, sharing code between systems usually means emailing yourself, using a pendrive, or
            logging into a cloud drive. None of those are fast. With NoLogin, you upload your code, tell your partner
            the page name, and they have it in under ten seconds.
          </p>
          <div style={{ marginBottom: 10 }}>
            <span style={linkPillStyle}>nologin.in/dslab1</span>
            <span style={linkPillStyle}>nologin.in/cnunit4</span>
            <span style={linkPillStyle}>nologin.in/oopspractical</span>
          </div>
          <p style={paragraphStyle}>No login. No pendrive. No email chain.</p>

          <h3 style={subHeadingStyle}>Teachers and classrooms</h3>
          <p style={paragraphStyle}>
            Write one link on the board at the start of class. Students open it on their phones or laptops and get
            instant access to notes, slides or assignments. No WhatsApp group needed. No email list. No "can you
            resend that" messages.
          </p>

          <h3 style={subHeadingStyle}>Event organisers and speakers</h3>
          <p style={paragraphStyle}>
            Put a single link on the projector - nologin.in/workshop or nologin.in/resources - and your entire
            audience gets instant access to everything you want to share. No one needs to take a photo of a QR code or
            type a long URL.
          </p>

          <h3 style={subHeadingStyle}>Developers and teams</h3>
          <p style={paragraphStyle}>
            Paste a snippet, a config file, a quick note, or a draft document. Share the link in the team chat. Anyone
            opens it without logging into anything. Keep editing the same page - no need to send a new file every
            time.
          </p>

          <h3 style={subHeadingStyle}>Cross-device transfer</h3>
          <p style={paragraphStyle}>
            Copy something on your phone that you need on your laptop. Upload it to NoLogin, open the same page name
            on your laptop, done. No cable. No Bluetooth. No signing into cloud storage.
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
          <h2 style={{ ...sectionTitleStyle, marginBottom: 10 }}>Why NoLogin for instant sharing</h2>
          <p style={paragraphStyle}>
            Most tools that handle sharing introduce friction somewhere. Email needs accounts on both sides. Cloud
            drives need permissions and long URLs. Messaging apps need phone numbers or group memberships. Pastebin and
            Dontpad support text but not files.
          </p>
          <p style={{ ...paragraphStyle, marginBottom: 8 }}>NoLogin removes all of that:</p>
          <ul className="resource-longform-list">
            <li>Instant text sharing without login</li>
            <li>Instant file sharing without signup</li>
            <li>Short, custom, memorable links</li>
            <li>Text and files together on the same page</li>
            <li>Works on every device with a browser</li>
            <li>Optional password protection when you need it</li>
            <li>Optional edit lock to protect your content</li>
            <li>Content expires automatically - no cleanup needed</li>
          </ul>
          <p style={paragraphStyle}>
            There is nothing to install, nothing to configure, and no account to manage.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Instant sharing without the usual problems</h2>
          <p style={paragraphStyle}>
            The reason people look for instant sharing tools is that existing solutions are too slow, too complicated,
            or require the other person to have an account. NoLogin solves all three:
          </p>
          <p style={paragraphStyle}>
            <strong style={{ color: "#fff" }}>Speed</strong> - your content is live the moment you save the page.
            There is no upload queue, no processing time, no approval.
          </p>
          <p style={paragraphStyle}>
            <strong style={{ color: "#fff" }}>Simplicity</strong> - the page name is the URL. You choose it, you
            remember it, you share it. That is the entire interface.
          </p>
          <p style={paragraphStyle}>
            <strong style={{ color: "#fff" }}>No account required</strong> - the person receiving your link does
            not need NoLogin, does not need to sign up, and does not need to do anything except open a browser.
          </p>
        </section>

        <section style={{ marginBottom: 6 }}>
          <h2 style={sectionTitleStyle}>Start instant sharing now</h2>
          <p style={paragraphStyle}>
            Type any page name at nologin.in to get started. Paste your text or upload your files. Share the link. No
            login, no signup, no friction.
          </p>
          <p style={{ ...paragraphStyle, color: "#fff", fontWeight: 600 }}>It takes about ten seconds.</p>
        </section>
      </div>
    </main>
  );
}
