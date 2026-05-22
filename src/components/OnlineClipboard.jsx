"use client";

export default function OnlineClipboard() {
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
        <h1 style={{ textAlign: "center", marginBottom: 14, color: "#c4b5fd" }}>Online Clipboard</h1>
        <p style={{ ...paragraphStyle, textAlign: "center", marginBottom: 26 }}>
          Copy something on your phone. Open it on your laptop. No cable. No app. No login. Just a page name.
        </p>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>The problem with moving content between devices</h2>
          <p style={paragraphStyle}>
            You are working on your phone and need something on your laptop. Or you are on one computer and need to get
            a file to another. The obvious solutions all have friction.
          </p>
          <h3 style={subHeadingStyle}>Email it to yourself</h3>
          <p style={paragraphStyle}>
            You need to open your email client, compose a message, attach the file or paste the text, send it, switch
            to the other device, open email again, find the message, download or copy the content. Six steps for
            something that should take ten seconds.
          </p>
          <h3 style={subHeadingStyle}>Bluetooth</h3>
          <p style={paragraphStyle}>
            Works sometimes, fails randomly, requires pairing, not reliable for files above a certain size, and
            completely useless between a phone and a desktop computer.
          </p>
          <h3 style={subHeadingStyle}>USB cable</h3>
          <p style={paragraphStyle}>
            You need the right cable for the right device, and in a lab or a shared workspace you often do not have
            one available.
          </p>
          <h3 style={subHeadingStyle}>AirDrop</h3>
          <p style={paragraphStyle}>Only works between Apple devices. Useless the moment one device is Android or Windows.</p>
          <h3 style={subHeadingStyle}>Cloud storage</h3>
          <p style={paragraphStyle}>
            Requires the same account logged in on both devices, sync to complete before you can access the file, and
            enough storage available. Too slow for a quick transfer.
          </p>
          <h3 style={subHeadingStyle}>Messaging apps</h3>
          <p style={paragraphStyle}>
            You need to be connected as contacts, in the same chat, and the file limits and compression on most
            messaging apps destroy the quality of images and documents.
          </p>
          <p style={paragraphStyle}>
            There is no built-in way to just move something from one device to another quickly without setup, cables or
            accounts.
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
          <h2 style={{ ...sectionTitleStyle, marginBottom: 10 }}>NoLogin as an online clipboard</h2>
          <p style={paragraphStyle}>
            NoLogin works like a clipboard that lives on the internet and is accessible from any device with a browser.
          </p>
          <p style={paragraphStyle}>
            You open nologin.in on your phone, type a page name you will remember, paste your text or upload your
            file, and open the same page name on your laptop. That is the entire process.
          </p>
          <div style={{ marginBottom: 10 }}>
            <span style={linkPillStyle}>nologin.in/clipboard</span>
            <span style={linkPillStyle}>nologin.in/transfer</span>
            <span style={linkPillStyle}>nologin.in/sync</span>
          </div>
          <p style={paragraphStyle}>
            The page name is whatever word you choose. Short, memorable, yours. No random characters, no long URLs, no
            link to copy and paste between devices.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>How it works in practice</h2>
          <h3 style={subHeadingStyle}>Moving text between devices</h3>
          <p style={paragraphStyle}>
            You copy a URL, a password, an address, a block of text or anything else on your phone. Open NoLogin, type
            your page name, paste the text, save. Switch to your laptop, open the same page name, copy. Done in under
            fifteen seconds.
          </p>
          <h3 style={subHeadingStyle}>Moving files between devices</h3>
          <p style={paragraphStyle}>
            You have a photo, a document, a PDF or a code file on your phone that you need on your laptop. Upload it
            to your NoLogin page, open the same page name on your laptop, download. No cable, no account, no app.
          </p>
          <h3 style={subHeadingStyle}>Moving content in a lab</h3>
          <p style={paragraphStyle}>
            In a college lab you often work across multiple computers in the same session. Upload your work to a
            NoLogin page at the start of the session. Access it from any computer in the lab by typing the page name.
            No pendrive, no email, no logging into cloud storage on a shared computer.
          </p>
          <h3 style={subHeadingStyle}>Sharing your clipboard with someone else</h3>
          <p style={paragraphStyle}>
            An online clipboard is not limited to your own devices. If you need someone else to quickly get something
            you copied, share the page name and they open it on their device. Instant. No contact exchange, no group
            setup.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Why NoLogin works better than dedicated online clipboard apps</h2>
          <p style={paragraphStyle}>
            There are apps specifically built for cross-device clipboard syncing. Most of them require:
          </p>
          <h3 style={subHeadingStyle}>Installing an app on every device you want to sync</h3>
          <p style={paragraphStyle}>
            Not practical on a shared lab computer, a borrowed device or someone else&apos;s phone.
          </p>
          <h3 style={subHeadingStyle}>Creating an account and logging in on every device</h3>
          <p style={paragraphStyle}>
            Defeats the purpose when you are trying to move something quickly.
          </p>
          <h3 style={subHeadingStyle}>Granting permissions to read your clipboard automatically</h3>
          <p style={paragraphStyle}>
            A privacy concern for content that includes passwords, credentials or sensitive text.
          </p>
          <h3 style={subHeadingStyle}>Keeping the app running in the background on every device</h3>
          <p style={paragraphStyle}>
            NoLogin requires none of this. It is a browser tab. You open it when you need it and close it when you are
            done. No installation, no account, no background process, no permissions.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Features that make NoLogin a better online clipboard</h2>
          <h3 style={subHeadingStyle}>Works on every device</h3>
          <p style={paragraphStyle}>
            Any phone, laptop, tablet or desktop with a browser. iOS, Android, Windows, Mac, Linux, Chromebook. No
            compatibility issues.
          </p>
          <h3 style={subHeadingStyle}>No login on any device</h3>
          <p style={paragraphStyle}>You do not need to be logged in to anything. Type the page name and you have access.</p>
          <h3 style={subHeadingStyle}>Text and files together</h3>
          <p style={paragraphStyle}>
            Paste text and upload files on the same page. One place for everything you are moving between devices.
          </p>
          <h3 style={subHeadingStyle}>Edit lock</h3>
          <p style={paragraphStyle}>
            Once you have saved your content, enable edit lock so nothing gets accidentally changed or deleted before
            you retrieve it on the other device.
          </p>
          <h3 style={subHeadingStyle}>Expiry control</h3>
          <p style={paragraphStyle}>
            Set the page to delete automatically after you are done. 1 hour is usually enough for a quick device
            transfer. No content left sitting online after you no longer need it.
          </p>
          <h3 style={subHeadingStyle}>Password protection</h3>
          <p style={paragraphStyle}>
            If you are using a shared page name that others might guess, add a password so only you can access the
            content.
          </p>
          <h3 style={subHeadingStyle}>Up to 5 files, up to 100MB each</h3>
          <p style={paragraphStyle}>
            Enough for most files you would want to move between devices quickly.
          </p>
          <h3 style={subHeadingStyle}>No compression</h3>
          <p style={paragraphStyle}>
            Files are stored and delivered exactly as you uploaded them. Unlike messaging apps that compress images and
            documents, NoLogin does not touch your files.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>A simple habit that saves time</h2>
          <p style={paragraphStyle}>
            Once you have a page name you use for device transfers, the process becomes automatic. Most people settle
            on something like:
          </p>
          <div style={{ marginBottom: 10 }}>
            <span style={linkPillStyle}>nologin.in/mine</span>
            <span style={linkPillStyle}>nologin.in/me</span>
            <span style={linkPillStyle}>nologin.in/transfer</span>
          </div>
          <p style={paragraphStyle}>
            You open it the same way every time. Type, paste or upload, switch device, done. No setup, no maintenance,
            no account to manage. Just a page name you remember.
          </p>
          <p style={paragraphStyle}>
            Set an expiry of a few hours so content clears itself. Enable edit lock if you do not want content changed
            between devices. That is the entire setup.
          </p>
        </section>

        <section style={{ marginBottom: 6 }}>
          <h2 style={sectionTitleStyle}>Start using NoLogin as your online clipboard</h2>
          <p style={paragraphStyle}>
            Type a short page name at nologin.in on your phone. Paste your text or upload your file. Open the same
            page name on your laptop. Done.
          </p>
          <p style={{ ...paragraphStyle, color: "#fff", fontWeight: 600 }}>
            No app. No login. No cable. No account on either device.
          </p>
        </section>
      </div>
    </main>
  );
}
