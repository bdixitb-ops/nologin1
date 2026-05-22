"use client";

export default function UploadFilesOnline() {
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
        <h1 style={{ textAlign: "center", marginBottom: 14, color: "#c4b5fd" }}>Upload Files Online</h1>
        <p style={{ ...paragraphStyle, textAlign: "center", marginBottom: 26 }}>
          Pick a page name, upload your file, share the link. No login. No signup. No account. Your file is live in
          seconds.
        </p>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Why uploading files online is still painful</h2>
          <p style={paragraphStyle}>
            Most file sharing tools get in the way before you can share anything. One asks for an email. Another sends
            an OTP. A third requires you to create an account, verify it, and then figure out permissions before the
            other person can even open the file.
          </p>
          <p style={paragraphStyle}>
            For a task as simple as getting a file from one person to another, this is too much.
          </p>
          <p style={paragraphStyle}>
            NoLogin removes every one of those steps. You open a page, upload your file, and share the link. The
            person receiving it opens a browser, types the link, and downloads the file. No account required on either
            end.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>How to upload files online with NoLogin</h2>
          <ol className="resource-longform-list">
            <li>Go to nologin.in and type a page name</li>
            <li>Upload your file - PDF, image, code, document, screenshot, anything</li>
            <li>Set an expiry if you want it temporary</li>
            <li>Share the page name or link</li>
          </ol>

          <p style={{ ...paragraphStyle, marginBottom: 8 }}>The link looks like this:</p>
          <div style={{ marginBottom: 10 }}>
            <span style={linkPillStyle}>nologin.in/unit3</span>
            <span style={linkPillStyle}>nologin.in/project1</span>
            <span style={linkPillStyle}>nologin.in/labfiles</span>
          </div>
          <p style={paragraphStyle}>
            Short, clean, easy to say out loud or write on a board. No random strings. No long URLs to copy and
            paste.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>What files can you upload</h2>
          <p style={paragraphStyle}>NoLogin works for any file you need to share quickly. Common use cases:</p>

          <h3 style={subHeadingStyle}>PDFs</h3>
          <p style={paragraphStyle}>
            Lecture notes, assignments, reference material, reports. Upload once, share the page name, everyone
            downloads it instantly.
          </p>

          <h3 style={subHeadingStyle}>Images and screenshots</h3>
          <p style={paragraphStyle}>
            Share a diagram, a screenshot of an error, a photo of notes from a whiteboard. Faster than sending it
            through a chat app.
          </p>

          <h3 style={subHeadingStyle}>Code files</h3>
          <p style={paragraphStyle}>
            Upload a .py, .java, .cpp or any other file. Your recipient gets the exact file without copy-paste errors.
          </p>

          <h3 style={subHeadingStyle}>Documents</h3>
          <p style={paragraphStyle}>
            Word files, spreadsheets, presentations. Upload the file and share one clean link instead of an email
            attachment.
          </p>

          <h3 style={subHeadingStyle}>Multiple files</h3>
          <p style={paragraphStyle}>
            Upload up to 5 files on a single page. Add notes or instructions alongside them in the same place.
          </p>

          <p style={{ ...paragraphStyle, color: "#fff", fontWeight: 600 }}>Up to 100MB per file, free, no account needed.</p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Real situations where this helps</h2>

          <h3 style={subHeadingStyle}>In a college lab</h3>
          <p style={paragraphStyle}>
            You have a working program and your partner needs it right now. Upload it to nologin.in/labcode, say the
            page name, they download it in seconds. No pendrive. No email. No logging into anything.
          </p>

          <h3 style={subHeadingStyle}>In a classroom</h3>
          <p style={paragraphStyle}>
            A teacher uploads slides or notes before class. Writes the page name on the board. Students open it on
            their phones and download directly. No WhatsApp group, no email list.
          </p>

          <h3 style={subHeadingStyle}>At a workshop or event</h3>
          <p style={paragraphStyle}>
            Put all your resources on one page. Show nologin.in/event on the projector. Every person in the room has
            instant access without sharing phone numbers or setting up anything.
          </p>

          <h3 style={subHeadingStyle}>Cross-device transfer</h3>
          <p style={paragraphStyle}>
            Need a file from your phone on your laptop? Upload it to NoLogin from your phone, open the same page name
            on your laptop, download. No cable. No Bluetooth. No cloud storage login.
          </p>

          <h3 style={subHeadingStyle}>In a team</h3>
          <p style={paragraphStyle}>
            Share a quick file in the chat without attaching it to an email. One link, always up to date, no version
            confusion.
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
          <h2 style={{ ...sectionTitleStyle, marginBottom: 10 }}>How NoLogin compares for file uploads</h2>
          <p style={paragraphStyle}>
            Google Drive needs everyone to have a Google account and understand sharing permissions. WeTransfer
            generates random URLs and limits you to 2GB on a time-restricted link. Telegram and WhatsApp need both
            people to have the app and be connected as contacts.
          </p>
          <p style={{ ...paragraphStyle, marginBottom: 8 }}>NoLogin is different in a few specific ways:</p>

          <h3 style={subHeadingStyle}>No account on either end</h3>
          <p style={paragraphStyle}>
            The person downloading your file does not need NoLogin. They open the link, they get the file.
          </p>

          <h3 style={subHeadingStyle}>Custom page names</h3>
          <p style={paragraphStyle}>
            You choose the link, not an algorithm. nologin.in/notes is easier to share than a 40-character random URL.
          </p>

          <h3 style={subHeadingStyle}>Text and files together</h3>
          <p style={paragraphStyle}>
            Add instructions, passwords or context alongside your file on the same page. One link for everything.
          </p>

          <h3 style={subHeadingStyle}>Automatic expiry</h3>
          <p style={paragraphStyle}>
            Set your file to disappear after 1 hour, 24 hours, or up to 30 days. No cleanup needed, no files sitting
            online longer than necessary.
          </p>

          <h3 style={subHeadingStyle}>Edit lock</h3>
          <p style={paragraphStyle}>
            Prevent others from uploading or deleting files on your page. Your content stays exactly as you left it.
          </p>

          <h3 style={subHeadingStyle}>Password protection</h3>
          <p style={paragraphStyle}>
            Restrict who can view and download your files. Optional, takes two seconds to set.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>A note on file safety</h2>
          <p style={paragraphStyle}>
            NoLogin does not scan uploaded files for malware or viruses. Only download files from pages shared by
            people you trust.
          </p>
        </section>

        <section style={{ marginBottom: 6 }}>
          <h2 style={sectionTitleStyle}>Upload files online, free, no account needed</h2>
          <p style={paragraphStyle}>
            NoLogin is free. No trial period, no upload limit on the number of pages, no credit card. Up to 5 files
            per page, up to 100MB each.
          </p>
          <p style={paragraphStyle}>
            If you need a fast, simple way to upload files online without login, without signup, and without the
            friction that comes with most sharing tools - type a page name at nologin.in and start.
          </p>
        </section>
      </div>
    </main>
  );
}
