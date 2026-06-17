"use client";

import ResourceMarketingPage from "@/components/resource/ResourceMarketingPage";

export default function BestOnlineSharing() {
  return (
    <ResourceMarketingPage
      pageClass="best-sharing-page"
      faqId="best-sharing-faq"
      hero={{
        badge: "Text, files, and control — without login.",
        title: "Best Online Sharing",
        subtext: (
          <>
            How NoLogin compares to DontPad, Pastebin,
            <br />
            Dropbox and other popular sharing tools.
          </>
        ),
      }}
      intro={{
        kicker: "INSTANT SHARING TODAY",
        title: "Most tools only solve part of the problem.",
        paragraphs: [
          "Online instant sharing tools have existed for years, but most were built with limitations that no longer fit how people actually work today. Tools like DontPad, Pastebin, JustPaste.it, and Dropbox each solve part of the problem — but none of them solve it completely.",
          "NoLogin was built to fix exactly that.",
          "This page explains how NoLogin compares to DontPad and other popular sharing tools, and why many users are switching.",
        ],
      }}
      cardGrid={{
        kicker: "WHERE MOST TOOLS FALL SHORT",
        title: "Built for pasting, not real workflows.",
        lead: "Most people searching for tools like DontPad or Pastebin want one simple thing — share something quickly without friction. Here is where most tools fall short.",
        items: [
          {
            title: "DontPad: text only",
            body: "DontPad is simple and fast, but it only supports text. No file uploads, no access control, and no structure for long-term or reusable sharing.",
          },
          {
            title: "JustPaste.it: limited control",
            body: "No custom page-name sharing, limited visibility control, and focused mainly on text content rather than full sharing workflows.",
          },
          {
            title: "Pastebin: public by default",
            body: "Content is public unless you upgrade. Account creation is encouraged and privacy control on free plans is limited.",
          },
          {
            title: "Dropbox: login required",
            body: "Powerful for storage, but login is required, setup takes longer, and it is not ideal for quick public or temporary sharing.",
          },
        ],
      }}
      how={{
        kicker: "WHERE NOLOGIN IS DIFFERENT",
        title: "One platform. Every gap filled.",
        lead: "NoLogin combines text and file sharing in one place — with custom page names, privacy controls, and zero login on either end.",
        steps: [
          {
            num: 1,
            title: "Text and files together",
            body: "Paste notes, share code, and upload files on the same page. Up to 5 files, 100MB each — no separate link for attachments.",
          },
          {
            num: 2,
            title: "Custom page names",
            body: "Share a page name like nologin.in/notes instead of a long random link. Easy to say out loud, write on a board, or remember.",
          },
          {
            num: 3,
            title: "Password and edit lock",
            body: "Restrict who can view your page or make it read-only so visitors cannot edit, delete, or upload anything.",
          },
          {
            num: 4,
            title: "No login, any device",
            body: "Works instantly across phone, laptop, and lab computers. No account, no app install, no email handoff.",
          },
        ],
      }}
      situations={{
        kicker: "BUILT FOR REAL USE",
        title: "Labs, classrooms, events, daily workflows.",
        items: [
          {
            pill: "LABS",
            title: "Engineering lab sharing",
            body: "Share lab practicals, debugging sessions, and group assignments with a page name your whole batch can open instantly.",
          },
          {
            pill: "PAGE NAMES",
            title: "Domain names, not long links",
            body: "Most tools rely on links. NoLogin uses page names — share nologin.in/yourname and anyone who types it gets the content.",
          },
          {
            pill: "FILES",
            title: "Uploads without cloud login",
            body: "Unlike DontPad and many paste tools, NoLogin supports file uploads without logging into email or cloud storage.",
          },
          {
            pill: "ALTERNATIVES",
            title: "A true DontPad alternative",
            body: "Pastebin alternative, instant pasting tool, no-login sharing site, and online file sharing without signup — all in one.",
          },
        ],
      }}
      bulletSection={{
        kicker: "WHY PEOPLE SWITCH",
        title: "Not just a paste tool. A sharing platform.",
        lead: "NoLogin is not just a paste tool. It is a complete instant sharing platform designed for labs, classrooms, events, and daily workflows.",
        items: [
          {
            title: "Text and file sharing in one place",
            body: "Everything lives on the same page — notes, code, PDFs, images, and zip files together with one link.",
          },
          {
            title: "Public and private options",
            body: "Share openly for classrooms and events, or password-protect sensitive content when you need control.",
          },
          {
            title: "Works across devices instantly",
            body: "Upload from your phone, open on your laptop. Any browser, any OS — no cable, no cloud login, no friction.",
          },
        ],
      }}
    />
  );
}
