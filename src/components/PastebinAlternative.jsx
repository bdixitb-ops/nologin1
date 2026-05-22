"use client";

export default function PastebinAlternative() {
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
        <h1 style={{ textAlign: "center", marginBottom: 14, color: "#c4b5fd" }}>The Best Pastebin Alternative</h1>
        <p style={{ ...paragraphStyle, textAlign: "center", marginBottom: 26 }}>
          Instant text and file sharing with no login, custom page names, password protection and expiry control.
          Free. No account needed.
        </p>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>What is Pastebin</h2>
          <p style={paragraphStyle}>
            Pastebin is one of the oldest text sharing tools on the internet. Launched in 2002, it became the default
            place for developers to share code snippets, error logs, config files and plain text. The idea was simple
            - paste your text, get a link, share it.
          </p>
          <p style={paragraphStyle}>
            For a long time it was the go-to tool for this. But Pastebin has changed significantly over the years, and
            many of those changes have made it harder to use for the simple sharing tasks it was originally built for.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Where Pastebin falls short</h2>

          <h3 style={subHeadingStyle}>Account required for most features</h3>
          <p style={paragraphStyle}>
            On Pastebin, anonymous pastes are limited. You cannot set a paste to private without an account. You
            cannot manage or edit your pastes without an account. The free tier is increasingly restricted to push you
            toward a paid plan.
          </p>

          <h3 style={subHeadingStyle}>No file uploads</h3>
          <p style={paragraphStyle}>
            Pastebin is text only. You cannot share a PDF, an image, a build output or any binary file. If you need to
            share a file alongside your code or notes, you need a second tool.
          </p>

          <h3 style={subHeadingStyle}>Random generated URLs</h3>
          <p style={paragraphStyle}>
            Pastebin generates URLs like pastebin.com/xK8pQm3r. You cannot choose your own link. This makes it harder
            to share verbally, write on a board or remember later.
          </p>

          <h3 style={subHeadingStyle}>Ads everywhere</h3>
          <p style={paragraphStyle}>
            The free Pastebin experience is heavily monetised with ads. The interface is cluttered and slow compared
            to what you get from newer tools.
          </p>

          <h3 style={subHeadingStyle}>Pastes are permanent by default</h3>
          <p style={paragraphStyle}>
            Unless you manually set an expiry, your paste stays up indefinitely. For sensitive or temporary content
            this is a problem.
          </p>

          <h3 style={subHeadingStyle}>Limited on mobile</h3>
          <p style={paragraphStyle}>
            Pastebin was built for desktop and the mobile experience reflects that. Creating and sharing pastes on a
            phone is clunky.
          </p>

          <h3 style={subHeadingStyle}>Privacy concerns</h3>
          <p style={paragraphStyle}>
            Public pastes on Pastebin are indexed by Google. Anyone searching the right terms can find your paste. If
            you accidentally paste something sensitive without setting it to private, it is now searchable.
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
            NoLogin is built around the same core idea as Pastebin - get your text from one place to another quickly.
            But it solves the problems that Pastebin has accumulated over two decades.
          </p>

          <h3 style={subHeadingStyle}>No account required for anything</h3>
          <p style={paragraphStyle}>
            Every feature on NoLogin works without creating an account. Password protection, edit lock, expiry, file
            uploads - all free, all available without login.
          </p>

          <h3 style={subHeadingStyle}>Custom page names</h3>
          <p style={paragraphStyle}>
            You choose your link. Short, readable, easy to share out loud or type from memory.
          </p>
          <div style={{ marginBottom: 10 }}>
            <span style={linkPillStyle}>nologin.in/snippet</span>
            <span style={linkPillStyle}>nologin.in/config</span>
            <span style={linkPillStyle}>nologin.in/errorlog</span>
          </div>

          <h3 style={subHeadingStyle}>File uploads</h3>
          <p style={paragraphStyle}>
            Upload up to 5 files per page, up to 100MB each. Text and files live together on the same page. One link
            for your code and the files it depends on.
          </p>

          <h3 style={subHeadingStyle}>Password protection</h3>
          <p style={paragraphStyle}>
            Restrict who can view your page. Set a password and only people with it can open your content. No account
            needed to do this.
          </p>

          <h3 style={subHeadingStyle}>Edit lock</h3>
          <p style={paragraphStyle}>
            Make your page read-only. Visitors can view and copy your text or download files but cannot edit or delete
            anything. Essential for sharing content you do not want modified.
          </p>

          <h3 style={subHeadingStyle}>Expiry control</h3>
          <p style={paragraphStyle}>
            Set your content to automatically delete after 1 hour, 24 hours, 7 days or up to 30 days. Nothing stays
            up longer than you want it to.
          </p>

          <h3 style={subHeadingStyle}>No ads</h3>
          <p style={paragraphStyle}>
            NoLogin has no ads cluttering the interface. The page loads fast and gets out of your way.
          </p>

          <h3 style={subHeadingStyle}>Works perfectly on mobile</h3>
          <p style={paragraphStyle}>
            Open NoLogin on your phone, create a page and share the link in under a minute.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Side by side comparison</h2>
          <div style={{ marginTop: 8 }}>
            <div style={compareHeader}>
              <span>Feature</span>
              <span>Pastebin</span>
              <span>NoLogin</span>
            </div>
            <div style={compareRow}>
              <span>Text sharing</span>
              <span>yes, with limits on free tier</span>
              <span>yes, unlimited</span>
            </div>
            <div style={compareRow}>
              <span>File uploads</span>
              <span>no</span>
              <span>yes, up to 5 files, 100MB each</span>
            </div>
            <div style={compareRow}>
              <span>Custom link</span>
              <span>no, randomly generated</span>
              <span>yes, you choose the page name</span>
            </div>
            <div style={compareRow}>
              <span>No login required</span>
              <span>partial, most features need account</span>
              <span>yes, everything works without login</span>
            </div>
            <div style={compareRow}>
              <span>Password protection</span>
              <span>yes, but requires account</span>
              <span>yes, no account needed</span>
            </div>
            <div style={compareRow}>
              <span>Edit lock</span>
              <span>no</span>
              <span>yes, optional</span>
            </div>
            <div style={compareRow}>
              <span>Expiry timer</span>
              <span>yes</span>
              <span>yes, 1 hour to 30 days</span>
            </div>
            <div style={compareRow}>
              <span>Ad free</span>
              <span>no, heavily ads on free tier</span>
              <span>yes</span>
            </div>
            <div style={{ ...compareRow, borderBottom: "none" }}>
              <span>Free to use</span>
              <span>partial, paid plan for full access</span>
              <span>yes, fully free</span>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Who should switch to NoLogin</h2>
          <p style={paragraphStyle}>
            If you are a developer who uses Pastebin occasionally for quick public snippets and finds it works fine,
            that is reasonable. Pastebin still does that basic job.
          </p>
          <p style={{ ...paragraphStyle, marginBottom: 8 }}>
            But if any of these sound familiar, NoLogin is worth trying:
          </p>
          <ul className="resource-longform-list">
            <li>You needed to share a file alongside your code but could not. NoLogin puts text and files on the same page.</li>
            <li>You wanted a link you could say out loud but got a random string instead. NoLogin lets you choose the link.</li>
            <li>You hit a feature wall on the free tier and did not want to pay for a paste tool. Everything on NoLogin is free.</li>
            <li>
              You accidentally made something public that should have been private. Password protection on NoLogin is
              free and takes two seconds.
            </li>
            <li>
              You shared a paste link in a group and someone edited or deleted it. Edit lock prevents this entirely.
            </li>
            <li>
              You forgot to delete an old paste with sensitive content. Expiry timers handle this automatically.
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: 6 }}>
          <h2 style={sectionTitleStyle}>NoLogin for developers specifically</h2>
          <p style={paragraphStyle}>
            Pastebin was built by and for developers. NoLogin is not exclusively a developer tool but it handles
            developer use cases well.
          </p>
          <p style={paragraphStyle}>
            Share a code snippet with a colleague using a memorable link. Upload a build output, a log file or a
            config alongside the code that generated it. Set edit lock so the recipient gets exactly what you sent. Set
            an expiry so credentials or sensitive configs do not sit online indefinitely.
          </p>
          <p style={{ ...paragraphStyle, color: "#fff", fontWeight: 600 }}>
            All of this without creating an account, logging in, or paying for a plan.
          </p>
          <p style={{ ...paragraphStyle, color: "#fff", fontWeight: 600 }}>
            Type a page name at nologin.in to get started. No account needed.
          </p>
        </section>
      </div>
    </main>
  );
}
