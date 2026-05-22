"use client";

const paragraphStyle = {
  color: "#d1d5db",
  lineHeight: 1.8,
  marginBottom: 12,
};

export default function WhyNoLogin() {
  return (
    <main className="resource-longform">
      <div className="resource-longform-inner">
        <h1 className="resource-longform-title">How does NoLogin help you?</h1>
        <p className="resource-longform-lead">
          Real examples of how students, teachers, developers, event organisers and teams use NoLogin to share instantly.
        </p>

        <ol className="resource-longform-sections">
          <li>
            <h2 className="resource-longform-block-title">Sharing code in a college lab</h2>
            <h3 className="resource-longform-subtitle">One page name instead of account setup</h3>
            <ul className="resource-longform-list">
              <li>
                In a college lab, time is short and systems are shared. Instead of signing in on every machine or
                handling USB transfers, students can create one page name and share code instantly with teammates and
                faculty.
              </li>
              <li>
                This keeps practical sessions fast, reduces interruptions, and works even when participants are using
                different systems.
              </li>
            </ul>
          </li>

          <li>
            <h2 className="resource-longform-block-title">Temporary code at a hackathon</h2>
            <h3 className="resource-longform-subtitle">Share quickly while ideas are moving</h3>
            <ul className="resource-longform-list">
              <li>
                Hackathons move fast, and teams often need to pass snippets, configs, and files before deciding what
                should go into a main repository. NoLogin gives teams a fast temporary sharing space with a simple link.
              </li>
              <li>You can keep shipping and iterating without pausing for account invites or repository setup.</li>
            </ul>
          </li>

          <li>
            <h2 className="resource-longform-block-title">Quick code review without GitHub</h2>
            <h3 className="resource-longform-subtitle">Send a link, get feedback immediately</h3>
            <ul className="resource-longform-list">
              <li>
                Not every review needs full repository overhead. When you want quick feedback on a fix, function, or
                small chunk of code, you can share it directly with NoLogin and get comments fast.
              </li>
              <li>This is useful for student projects, interview prep, pair programming, and small team handoffs.</li>
            </ul>
          </li>

          <li>
            <h2 className="resource-longform-block-title">Mass sharing at events and conferences</h2>
            <h3 className="resource-longform-subtitle">One URL for all attendees</h3>
            <ul className="resource-longform-list">
              <li>
                In workshops, meetups, and conferences, organizers can share resources with one easy URL. Attendees can
                open it instantly on their own devices without creating accounts.
              </li>
              <li>That makes session material distribution smoother and avoids delays during live presentations.</li>
            </ul>
          </li>

          <li>
            <h2 className="resource-longform-block-title">Teaching without interruptions</h2>
            <h3 className="resource-longform-subtitle">Keep the class focused on learning</h3>
            <ul className="resource-longform-list">
              <li>
                Teachers can share code, assignments, PDFs, and notes in seconds. Students access the same page
                directly, so class time is spent on explanation and discussion instead of login recovery and access
                issues.
              </li>
              <li>It works well for classroom sessions, labs, and remote or hybrid teaching setups.</li>
            </ul>
          </li>

          <li>
            <h2 className="resource-longform-block-title">Getting files off a shared computer without leaving anything behind</h2>
            <h3 className="resource-longform-subtitle">Move files safely and walk away clean</h3>
            <ul className="resource-longform-list">
              <li>
                On public or shared systems, users often need to move files to a personal device quickly. NoLogin allows
                this with a temporary page, then content can expire automatically so nothing is left behind.
              </li>
              <li>This helps reduce risk when using lab machines, library computers, and temporary workstations.</li>
            </ul>
          </li>

          <li>
            <h2 className="resource-longform-block-title">Moving content between your own devices</h2>
            <h3 className="resource-longform-subtitle">Phone to laptop, laptop to desktop, instantly</h3>
            <ul className="resource-longform-list">
              <li>
                Need to move text, files, or code between your own devices? Upload once and open the same page
                everywhere. No cables, no account sync, and no additional app setup.
              </li>
              <li>It is a fast everyday workflow for students, creators, and developers.</li>
            </ul>
          </li>

          <li>
            <h2 className="resource-longform-block-title">Sharing with people who don&apos;t have the app or the account</h2>
            <h3 className="resource-longform-subtitle">No forced signup for recipients</h3>
            <ul className="resource-longform-list">
              <li>
                Many tools assume both sender and receiver already have accounts. NoLogin removes that dependency. If
                someone has a browser, they can access the shared page.
              </li>
              <li>This is especially useful when sharing with clients, external collaborators, and first-time users.</li>
            </ul>
          </li>

          <li>
            <h2 className="resource-longform-block-title">Study groups before an exam</h2>
            <h3 className="resource-longform-subtitle">One shared page for final prep</h3>
            <ul className="resource-longform-list">
              <li>
                Study groups can keep notes, formulas, references, and solved examples in one place. Everyone opens the
                same link and stays aligned during revision sessions.
              </li>
              <li>It makes collaboration simpler when time is limited and coordination matters.</li>
            </ul>
          </li>
        </ol>

        <section
          style={{
            marginBottom: 6,
            padding: "16px 18px",
            border: "1px solid #6d28d9",
            borderRadius: 14,
            background: "linear-gradient(180deg, rgba(109,40,217,0.16), rgba(109,40,217,0.04))",
          }}
        >
          <h2 className="resource-longform-block-title" style={{ marginBottom: 10 }}>
            Start sharing now
          </h2>
          <p style={{ ...paragraphStyle, marginBottom: 0 }}>
            NoLogin is built for moments where speed matters. Create a page name, add your content, and share instantly.
            No login needed.
          </p>
        </section>
      </div>
    </main>
  );
}
