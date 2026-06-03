"use client";

import ResourceMarketingPage from "@/components/resource/ResourceMarketingPage";

export default function DontpadAlternative() {
  return (
    <ResourceMarketingPage
      pageClass="dontpad-page"
      faqId="dontpad-faq"
      hero={{
        badge: "Everything Dontpad does. And more.",
        title: "The Best Dontpad Alternative",
        subtext: (
          <>
            File uploads, password protection, edit lock and expiry control.
            <br />
            Free. No login. No signup.
          </>
        ),
      }}
      intro={{
        kicker: "WHAT IS DONTPAD",
        title: "Simple idea. Stuck in 2011.",
        paragraphs: [
          "Dontpad is a Brazilian text-sharing tool built around a simple idea — type a word after dontpad.com/ and you get a shared notepad. No login required. Anyone with the URL can read and edit the content.",
          "It became popular in colleges and classrooms across Brazil and India for exactly that reason. Fast, simple, no friction.",
          "But Dontpad has not changed much since it launched in 2011. And the gaps in what it offers have become more obvious as people try to use it for more than basic text sharing.",
        ],
      }}
      cardGrid={{
        kicker: "WHERE DONTPAD FALLS SHORT",
        title: "Six gaps that matter in real use.",
        items: [
          {
            title: "No file uploads",
            body: "Dontpad is text only. If you need to share a PDF, an image, a code file or any other file alongside your text, Dontpad cannot help you.",
          },
          {
            title: "No password protection",
            body: "Every Dontpad page is completely public. Anyone who guesses or finds your URL can read everything on it.",
          },
          {
            title: "No edit lock",
            body: "Anyone who opens your Dontpad page can delete or overwrite your content. There is no way to make a page read-only.",
          },
          {
            title: "No expiry control",
            body: "Content on Dontpad stays up indefinitely unless someone manually deletes it. You cannot set a timer and have it disappear automatically.",
          },
          {
            title: "Guessable URLs",
            body: "Because Dontpad uses simple words as page names, pages are easy to stumble across. Common names are often already taken.",
          },
          {
            title: "No file support for developers",
            body: "Sharing code as plain text works but sharing actual files, configs or builds is not possible.",
          },
        ],
      }}
      how={{
        kicker: "WHAT NOLOGIN DOES DIFFERENTLY",
        title: "Same principle. Every gap filled.",
        lead: "NoLogin started from the same principle as Dontpad — no login, a simple page name, instant access. But it solves every gap that Dontpad leaves open.",
        steps: [
          {
            num: 1,
            title: "File uploads",
            body: "Upload up to 5 files per page, up to 100MB each. Text and files live together on the same page.",
          },
          {
            num: 2,
            title: "Password protection",
            body: "Set a password on any page to restrict who can view it. Optional, takes just 5 seconds.",
          },
          {
            num: 3,
            title: "Edit lock",
            body: "Make your page read-only. Visitors can view and copy but cannot edit, delete or upload anything.",
          },
          {
            num: 4,
            title: "Expiry control",
            body: "Set your page to automatically delete after 1 hour, 48 hours, or 7 days. No cleanup needed.",
            url: "nologin.in/notes",
          },
        ],
      }}
      situations={{
        kicker: "WHO SHOULD SWITCH TO NOLOGIN",
        title: "If any of these sound familiar.",
        items: [
          {
            pill: "SECURITY",
            title: "Sensitive content was public",
            body: "You shared something sensitive and anyone with a guessed URL could read it. Password protection solves this.",
          },
          {
            pill: "FILES",
            title: "You needed files alongside text",
            body: "Dontpad could not handle PDFs, images, or code files. NoLogin puts text and files on the same page.",
          },
          {
            pill: "EDIT LOCK",
            title: "Someone deleted your content",
            body: "Edit lock prevents others from overwriting or deleting what you shared.",
            urls: ["nologin.in/labcode"],
          },
          {
            pill: "EXPIRY",
            title: "Old content stayed up too long",
            body: "Expiry timers handle cleanup automatically — nothing sits online longer than you need.",
            urls: ["nologin.in/slides"],
          },
        ],
      }}
      bulletSection={{
        kicker: "BUILT FOR THE SAME PEOPLE WHO LOVE DONTPAD",
        title: "Students, teachers, developers, organisers.",
        lead: "If you use Dontpad only for quick text sharing and it works fine for you, that is a perfectly reasonable choice. Dontpad does that one thing well.",
        items: [
          {
            title: "Custom page names",
            body: "Just like Dontpad, you choose your own page name. Short, readable, easy to share out loud or write on a board.",
          },
          {
            title: "No login on either end",
            body: "The person receiving your link does not need a NoLogin account. They open the link and get instant access.",
          },
          {
            title: "Password, edit lock, file uploads, expiry",
            body: "Features that matter the moment you try to use a no-login sharing tool for anything beyond the simplest text paste.",
          },
          {
            title: "Free forever",
            body: "No trial period, no paid tier, no credit card. Everything works without an account.",
          },
        ],
      }}
    />
  );
}
