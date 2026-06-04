"use client";

import ResourceMarketingPage from "@/components/resource/ResourceMarketingPage";

export default function PastebinAlternative() {
  return (
    <ResourceMarketingPage
      pageClass="pastebin-page"
      faqId="pastebin-faq"
      hero={{
        badge: "Pastebin. Without the baggage.",
        title: "Pastebin Alternative",
        subtext: (
          <>
            Pastebin got complicated. This didn't
            <br />
            Custom page names, file uploads, passwords and expiry
          </>
        ),
      }}
      intro={{
        kicker: "WHAT IS PASTEBIN",
        title: "Built in 2002. Showing its age.",
        paragraphs: [
          "Pastebin is one of the oldest text sharing tools on the internet. Launched in 2002, it became the default place for developers to share code snippets, error logs, config files and plain text.",
          "For a long time it was the go-to tool for this. But Pastebin has changed significantly over the years, and many of those changes have made it harder to use for the simple sharing tasks it was originally built for.",
          "Account requirements, random URLs, ads, no file uploads, and public indexing — Pastebin accumulated friction that newer tools like NoLogin were built to remove.",
        ],
      }}
      cardGrid={{
        kicker: "WHERE PASTEBIN FALLS SHORT",
        title: "Seven problems developers hit every day.",
        items: [
          {
            title: "Account required for most features",
            body: "Anonymous pastes are limited. You cannot set a paste to private without an account. The free tier is increasingly restricted.",
          },
          {
            title: "No file uploads",
            body: "Pastebin is text only. You cannot share a PDF, image, build output or any binary file alongside your code.",
          },
          {
            title: "Random generated URLs",
            body: "Pastebin generates URLs like pastebin.com/xK8pQm3r. You cannot choose your own link or share it verbally.",
          },
          {
            title: "Ads everywhere",
            body: "The free Pastebin experience is heavily monetised with ads. The interface is cluttered and slow.",
          },
          {
            title: "Pastes are permanent by default",
            body: "Unless you manually set an expiry, your paste stays up indefinitely. For sensitive or temporary content this is a problem.",
          },
          {
            title: "Limited on mobile",
            body: "Pastebin was built for desktop and the mobile experience reflects that.",
          },
        ],
      }}
      how={{
        kicker: "WHAT NOLOGIN DOES DIFFERENTLY",
        title: "Same core idea. None of the friction.",
        lead: "NoLogin is built around the same core idea as Pastebin — get your text from one place to another quickly. But it solves the problems Pastebin has accumulated over two decades.",
        steps: [
          {
            num: 1,
            title: "No account required",
            body: "Every feature works without creating an account. Password, edit lock, expiry, file uploads — all free, all without login.",
          },
          {
            num: 2,
            title: "Custom page names",
            body: "You choose your link. Short, readable, easy to share out loud or type from memory.",
            url: "nologin.in/snippet",
          },
          {
            num: 3,
            title: "File uploads",
            body: "Upload up to 5 files per page, up to 100MB each. Text and files on the same page.",
          },
          {
            num: 4,
            title: "Clean by design.",
            body: "Open the page, paste your content, share the link. That's it.",
          },
        ],
      }}
      situations={{
        kicker: "WHO SHOULD SWITCH TO NOLOGIN",
        title: "If any of these sound familiar.",
        items: [
          {
            pill: "DEVELOPERS",
            title: "Files alongside code",
            body: "You needed to share a file alongside your code but could not. NoLogin puts text and files on the same page.",
            urls: ["nologin.in/config"],
          },
          {
            pill: "TEAMS",
            title: "Links you can say out loud",
            body: "You wanted a link you could say in a meeting but got a random string instead. NoLogin lets you choose the link.",
          },
          {
            pill: "SECURITY",
            title: "Accidentally public pastes",
            body: "Password protection on NoLogin is free and takes just 5 seconds. Edit lock prevents unwanted edits.",
          },
          {
            pill: "TEMPORARY",
            title: "Forgotten sensitive content",
            body: "Expiry timers handle cleanup automatically — credentials and configs do not sit online indefinitely.",
            urls: ["nologin.in/errorlog"],
          },
        ],
      }}
      bulletSection={{
        kicker: "NOLOGIN FOR DEVELOPERS SPECIFICALLY",
        title: "Pastebin was built for developers. So was this.",
        lead: "Share a code snippet with a colleague using a memorable link. Upload a build output, a log file or a config alongside the code that generated it.",
        items: [
          {
            title: "Edit lock",
            body: "Set edit lock so the recipient gets exactly what you sent — nothing modified or deleted.",
          },
          {
            title: "Expiry control",
            body: "Set an expiry so credentials or sensitive configs do not sit online indefinitely. Default is 48 hours.",
          },
          {
            title: "Password protection",
            body: "Restrict who can view your page without creating an account on either end.",
          },
        ],
      }}
    />
  );
}
