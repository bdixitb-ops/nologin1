"use client";

export default function HastebinAlternative() {
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
        <h1 style={{ textAlign: "center", marginBottom: 14, color: "#c4b5fd" }}>The Best Hastebin Alternative</h1>
        <p style={{ ...paragraphStyle, textAlign: "center", marginBottom: 26 }}>
          Hastebin is gone. NoLogin gives you everything Hastebin offered and more - instant sharing, no login, custom
          page names, file uploads and expiry control. Free. No account needed.
        </p>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>What happened to Hastebin</h2>
          <p style={paragraphStyle}>
            Hastebin was a clean, minimal code sharing tool built by John Chmura and later acquired by Toptal. For
            years it was one of the most popular tools for sharing code snippets quickly - developers loved it because
            it was fast, had no ads, required no login and generated a clean short link.
          </p>
          <p style={paragraphStyle}>
            In January 2025 Toptal archived Hastebin. The service is no longer available. Links that used to point to
            hastebin.com now return nothing. Years of shared snippets, documentation links, README references and
            bookmarks are now broken.
          </p>
          <p style={paragraphStyle}>
            If you are here because you used Hastebin and are looking for something that works the same way, this page
            is for you.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>What made Hastebin good</h2>
          <p style={paragraphStyle}>
            Before looking at alternatives it is worth understanding what made Hastebin worth using in the first place:
          </p>
          <h3 style={subHeadingStyle}>No login required</h3>
          <p style={paragraphStyle}>
            You opened the site, pasted your code and got a link. No account, no email, no verification.
          </p>
          <h3 style={subHeadingStyle}>Clean minimal interface</h3>
          <p style={paragraphStyle}>
            No ads, no clutter, no navigation getting in the way. Just a text editor and a save button.
          </p>
          <h3 style={subHeadingStyle}>Syntax highlighting</h3>
          <p style={paragraphStyle}>
            Code was displayed with proper highlighting depending on the language. Made shared snippets readable
            immediately.
          </p>
          <h3 style={subHeadingStyle}>Short links</h3>
          <p style={paragraphStyle}>
            hastebin.com/xyzabc. Short enough to share in a chat or a commit message without wrapping.
          </p>
          <h3 style={subHeadingStyle}>Fast</h3>
          <p style={paragraphStyle}>
            The site loaded instantly and saved instantly. No spinner, no processing screen.
          </p>
          <p style={paragraphStyle}>
            Any good Hastebin alternative needs to match these qualities. The bar is not complicated but many tools
            fail to meet it.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Where most Hastebin alternatives fall short</h2>
          <h3 style={subHeadingStyle}>Pastebin</h3>
          <p style={paragraphStyle}>
            Requires an account for most useful features, generates long URLs, has heavy ads on the free tier and has
            no file upload support.
          </p>
          <h3 style={subHeadingStyle}>GitHub Gist</h3>
          <p style={paragraphStyle}>
            Requires a GitHub account. Fast for developers who already use GitHub but completely unsuitable for quick
            anonymous sharing.
          </p>
          <h3 style={subHeadingStyle}>Rentry.co</h3>
          <p style={paragraphStyle}>Text only, no file uploads, not suitable for sharing anything beyond formatted text.</p>
          <h3 style={subHeadingStyle}>Ghostbin</h3>
          <p style={paragraphStyle}>Shut down in 2019. Still referenced across the web but no longer accessible.</p>
          <h3 style={subHeadingStyle}>Termbin</h3>
          <p style={paragraphStyle}>Terminal only. Not useful for anyone who wants a browser-based tool.</p>
          <h3 style={subHeadingStyle}>Self-hosted options like PrivateBin or Privatebin</h3>
          <p style={paragraphStyle}>
            Require technical setup and your own server. Not practical for most people who just need a quick link.
          </p>
          <p style={paragraphStyle}>
            The problem with most Hastebin alternatives is that they either require login, generate ugly URLs, support
            only text, or need technical setup. None of them are as simple as Hastebin was.
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
          <h2 style={{ ...sectionTitleStyle, marginBottom: 10 }}>What NoLogin offers as a Hastebin alternative</h2>
          <p style={paragraphStyle}>
            NoLogin matches everything Hastebin did well and adds features Hastebin never had.
          </p>
          <h3 style={subHeadingStyle}>No login required</h3>
          <p style={paragraphStyle}>
            Open a page, paste your code or text, share the link. No account, no email, no verification on either end.
          </p>
          <h3 style={subHeadingStyle}>Custom page names</h3>
          <p style={paragraphStyle}>
            Instead of a randomly generated string, you choose the link. Short, readable, easy to share in a chat or a
            commit message.
          </p>
          <div style={{ marginBottom: 10 }}>
            <span style={linkPillStyle}>nologin.in/snippet</span>
            <span style={linkPillStyle}>nologin.in/config</span>
            <span style={linkPillStyle}>nologin.in/fix</span>
          </div>
          <h3 style={subHeadingStyle}>File uploads</h3>
          <p style={paragraphStyle}>
            Upload actual files alongside your text. Up to 5 files per page, up to 100MB each. Hastebin was text only.
            NoLogin handles code files, logs, configs, binaries and documents.
          </p>
          <h3 style={subHeadingStyle}>Expiry control</h3>
          <p style={paragraphStyle}>
            Set your content to automatically delete after 1 hour, 24 hours, 7 days or up to 30 days. Hastebin had no
            expiry control.
          </p>
          <h3 style={subHeadingStyle}>Edit lock</h3>
          <p style={paragraphStyle}>
            Make your page read-only so nobody can modify or delete your content after you share it.
          </p>
          <h3 style={subHeadingStyle}>Password protection</h3>
          <p style={paragraphStyle}>
            Restrict access to your page with a password. Hastebin had no privacy controls.
          </p>
          <h3 style={subHeadingStyle}>No ads</h3>
          <p style={paragraphStyle}>The interface is clean and fast. No banners, no popups.</p>
          <h3 style={subHeadingStyle}>Works on any device</h3>
          <p style={paragraphStyle}>Phone, laptop, lab computer, anything with a browser. No app required.</p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Side by side comparison</h2>
          <div style={{ marginTop: 8 }}>
            <div style={compareHeader}>
              <span>Feature</span>
              <span>Hastebin</span>
              <span>NoLogin</span>
            </div>
            <div style={compareRow}>
              <span>Text and code sharing</span>
              <span>yes</span>
              <span>yes</span>
            </div>
            <div style={compareRow}>
              <span>File uploads</span>
              <span>no</span>
              <span>yes, up to 5 files, 100MB each</span>
            </div>
            <div style={compareRow}>
              <span>No login required</span>
              <span>yes</span>
              <span>yes</span>
            </div>
            <div style={compareRow}>
              <span>Custom page name</span>
              <span>no, randomly generated</span>
              <span>yes, you choose it</span>
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
              <span>Expiry control</span>
              <span>no</span>
              <span>yes, 1 hour to 30 days</span>
            </div>
            <div style={compareRow}>
              <span>Ad free</span>
              <span>yes</span>
              <span>yes</span>
            </div>
            <div style={{ ...compareRow, borderBottom: "none" }}>
              <span>Currently available</span>
              <span>no, archived January 2025</span>
              <span>yes</span>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>For developers specifically</h2>
          <p style={paragraphStyle}>
            Hastebin was used heavily by developers for sharing code in a hurry. NoLogin fits the same workflow.
          </p>
          <p style={paragraphStyle}>
            Paste a function, a class, an error log or a full script. Share the link in a chat, a pull request
            comment, a commit message or a README. Your recipient opens it instantly without needing an account.
          </p>
          <p style={paragraphStyle}>
            If you need to share an actual file - a .py, .json, .yaml, .log or anything else - upload it alongside
            your text on the same page. One link for everything.
          </p>
          <p style={paragraphStyle}>
            Set edit lock so the content cannot be modified after you share it. Set an expiry so credentials or
            sensitive configs do not sit online indefinitely.
          </p>
          <p style={{ ...paragraphStyle, color: "#fff", fontWeight: 600 }}>
            All of this without creating an account or paying for anything.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Broken Hastebin links</h2>
          <p style={paragraphStyle}>
            If you have documentation, READMEs, internal wikis or bookmarks that point to hastebin.com URLs, those
            links are now broken and cannot be recovered. The content is gone.
          </p>
          <p style={paragraphStyle}>
            Going forward, links to nologin.in will not disappear because a company decided to archive the product. You
            control the expiry. Your content stays up exactly as long as you want it to.
          </p>
        </section>

        <section style={{ marginBottom: 6 }}>
          <h2 style={sectionTitleStyle}>Start sharing now</h2>
          <p style={paragraphStyle}>
            Type a page name at nologin.in and paste your code or text. No account needed. No login on either end.
            Your content is live in seconds.
          </p>
          <p style={{ ...paragraphStyle, color: "#fff", fontWeight: 600 }}>
            If Hastebin worked for you, NoLogin will feel familiar - and give you the controls Hastebin never had.
          </p>
        </section>
      </div>
    </main>
  );
}
