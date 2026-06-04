"use client";

import ResourceMarketingPage from "@/components/resource/ResourceMarketingPage";
import { withResourceHowSteps } from "@/components/resource/resourceHowSteps";

export default function ShareCodeOnline() {
  return (
    <ResourceMarketingPage
      pageClass="share-code-page"
      faqId="share-code-faq"
      hero={{
        badge: "One page. Your code.",
        title: "Share Code Online",
        subtext: (
          <>
            pick a page name, paste your code,share the link.
            <br />
            No login. No GitHub. No account. Live in seconds.
          </>
        ),
      }}
      intro={{
        kicker: "WHEN YOU NEED TO SHARE CODE WITHOUT THE OVERHEAD",
        title: "Not every snippet needs a repository.",
        paragraphs: [
          "Sometimes you need to share code quickly — a fix, a snippet, a config, a debug log — without creating a repo, opening a pull request, or generating a random Pastebin URL.",
          "NoLogin lets you paste code, upload code files, pick a page name you choose, and share the link. Anyone with the page name opens it instantly on any device.",
          "No account on either end. No GitHub required. No ugly URLs.",
        ],
        urlLabel: "Links that are easy to say out loud:",
        urls: ["nologin.in/snippet", "nologin.in/fix", "nologin.in/review", "nologin.in/hackathon"],
      }}
      cardGrid={{
        kicker: "FEATURES THAT MATTER FOR SHARING CODE",
        title: "Built for developers who need speed.",
        items: [
          {
            title: "Upload actual code files",
            body: "Share complete files when plain text is not enough — .py, .java, .cpp, configs, and more.",
          },
          {
            title: "Up to 5 files per page",
            body: "Keep related snippets and assets together on one link.",
          },
          {
            title: "Edit lock",
            body: "Protect content from accidental edits once shared.",
          },
          {
            title: "Expiry control",
            body: "Auto-delete temporary code pages after they are no longer needed. Default is 48 hours.",
          },
          {
            title: "Password protection",
            body: "Restrict access to people who have the password.",
          },
          {
            title: "Custom page names",
            body: "Use readable links that are easy to type and remember — not random strings.",
          },
        ],
      }}
      how={{
        kicker: "HOW TO SHARE CODE ONLINE WITH NOLOGIN",
        title: "Four steps. No verification. No permissions.",
        steps: withResourceHowSteps(
          {
            num: 1,
            title: "Type a page name",
            body: "Open nologin.in and choose a page name — nologin.in/snippet, nologin.in/fix, anything you want.",
            url: "nologin.in/snippet",
          },
          {
            num: 2,
            title: "Paste or upload",
            body: "Paste your code into the editor or upload your code files.",
          },
        ),
      }}
      situations={{
        kicker: "REAL SITUATIONS WHERE THIS SAVES TIME",
        title: "Every developer workflow that needs a fast link.",
        items: [
          {
            pill: "STUDENTS",
            title: "College lab",
            body: "Share code with your partner two seats away. Say the page name, they have it in under ten seconds. No email, no pendrive.",
            urls: ["nologin.in/labcode"],
          },
          {
            pill: "HACKATHONS",
            title: "Temporary code before a decision",
            body: "Pass snippets, configs, and files before deciding what goes into the main repository.",
          },
          {
            pill: "TEAMS",
            title: "Pair programming across devices",
            body: "Share rough code that is not push-repo worthy. Teammate has it instantly. Set expiry, it disappears.",
          },
          {
            pill: "EVENTS",
            title: "Conferences and meetups",
            body: "Put example code on the projector. Everyone in the room opens the same page name on their devices.",
            urls: ["nologin.in/workshop"],
          },
        ],
      }}
      bulletSection={{
        kicker: "WHEN TO USE NOLOGIN VS GITHUB",
        title: "Different tools for different moments.",
        lead: "GitHub is essential for version control and collaboration on real projects. NoLogin is for the moments before that — when speed matters more than history.",
        items: [
          {
            title: "Quick snippets and fixes",
            body: "Share a function, a patch, or a debug output without opening a repo.",
          },
          {
            title: "Code reviews outside the repository",
            body: "Get feedback on a small chunk before it becomes a commit.",
          },
          {
            title: "Sharing with non-developers",
            body: "Send code or logs to someone who does not have GitHub — they just need a browser.",
          },
          {
            title: "Temporary sharing with expiry",
            body: "Credentials, configs, and sensitive snippets disappear automatically when the timer runs out.",
          },
        ],
      }}
    />
  );
}
