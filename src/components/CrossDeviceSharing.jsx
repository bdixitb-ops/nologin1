"use client";

export default function CrossDeviceSharing() {
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
        <h1 style={{ textAlign: "center", marginBottom: 14, color: "#c4b5fd" }}>Cross Device Sharing</h1>
        <p style={{ ...paragraphStyle, textAlign: "center", marginBottom: 26 }}>
          Share files and text across any devices instantly. Move from phone to laptop, Android to Mac, or any browser
          to any browser with no login, no app, no cable, and no account needed.
        </p>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>The cross device problem nobody has fully solved</h2>
          <p style={paragraphStyle}>
            Most people still use workarounds when they need to move content between devices. Emailing yourself,
            messaging yourself, cloud sync delays, platform lock-ins, or missing cables all turn a quick transfer into
            extra steps and waiting.
          </p>
          <p style={paragraphStyle}>
            The core issue is simple: sharing should work instantly between any two devices, but common tools depend on
            accounts, operating system compatibility, background apps, or setup you do not always have.
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
          <h2 style={{ ...sectionTitleStyle, marginBottom: 10 }}>How NoLogin handles cross device sharing</h2>
          <p style={paragraphStyle}>
            NoLogin gives you one page name that opens from any browser. Save text or upload files on one device, then
            open the same page name on another device to access everything immediately.
          </p>
          <p style={paragraphStyle}>
            There is no signup flow, no install process, and no device pairing. You just remember one page name and use
            it wherever you need to transfer.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Every device combination that works</h2>
          <h3 style={subHeadingStyle}>Phone to laptop</h3>
          <p style={paragraphStyle}>Move notes, links, images, or documents from your phone browser to your laptop browser in seconds.</p>
          <h3 style={subHeadingStyle}>Android to Mac</h3>
          <p style={paragraphStyle}>
            Share directly between different ecosystems without relying on platform-specific transfer tools.
          </p>
          <h3 style={subHeadingStyle}>Windows to iPhone</h3>
          <p style={paragraphStyle}>
            Access the same page from both devices and transfer text or files with the same flow every time.
          </p>
          <h3 style={subHeadingStyle}>Browser to browser</h3>
          <p style={paragraphStyle}>
            If both devices can open a browser, cross device sharing works. That includes desktops, tablets, phones,
            lab systems, and borrowed devices.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>What you can move between devices</h2>
          <p style={paragraphStyle}>
            Share text such as links, code snippets, addresses, commands, and notes. Share files such as images, PDFs,
            documents, and project artifacts. Keep both text and files together on one page so your transfer stays
            organized.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>A permanent cross device clipboard</h2>
          <p style={paragraphStyle}>
            Many users keep one memorable NoLogin page as their cross device clipboard. Instead of creating a new flow
            each time, they open the same page name from any device and continue sharing instantly.
          </p>
          <p style={paragraphStyle}>
            You can also apply expiry, password, and edit lock when needed, so fast sharing stays controlled.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Cross device sharing in specific situations</h2>
          <h3 style={subHeadingStyle}>College labs and shared computers</h3>
          <p style={paragraphStyle}>
            Transfer files between systems without logging into personal storage on public machines.
          </p>
          <h3 style={subHeadingStyle}>Work meetings and presentations</h3>
          <p style={paragraphStyle}>
            Move files from your phone to a presentation laptop quickly without stopping the flow.
          </p>
          <h3 style={subHeadingStyle}>Remote collaboration</h3>
          <p style={paragraphStyle}>
            Share a page name with teammates so they can open the same content from any device instantly.
          </p>
        </section>

        <section style={{ marginBottom: 26 }}>
          <h2 style={sectionTitleStyle}>Why not just use a dedicated sync app</h2>
          <p style={paragraphStyle}>
            Dedicated sync apps can work, but they usually require installation on every device, account login, and
            permission setup. They are harder to use on temporary or restricted devices and can be excessive for quick
            transfers.
          </p>
          <p style={paragraphStyle}>
            NoLogin keeps cross device sharing lightweight: open browser, type page name, transfer done.
          </p>
        </section>

        <section style={{ marginBottom: 6 }}>
          <h2 style={sectionTitleStyle}>Start sharing across devices now</h2>
          <p style={paragraphStyle}>
            Open nologin.in on one device, create or open your page name, and add your text or files. Open the same
            page on your other device and continue immediately.
          </p>
          <p style={{ ...paragraphStyle, color: "#fff", fontWeight: 600 }}>
            No login. No app. No cable. Just cross device sharing that works.
          </p>
        </section>
      </div>
    </main>
  );
}
