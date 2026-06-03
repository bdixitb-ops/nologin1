"use client";

import ResourceMarketingPage from "@/components/resource/ResourceMarketingPage";
import { withResourceHowSteps } from "@/components/resource/resourceHowSteps";

export default function CrossDeviceSharing() {
  return (
    <ResourceMarketingPage
      pageClass="cross-device-page"
      faqId="cross-device-faq"
      hero={{
        badge: "Any device. One page name.",
        title: "Cross Device Sharing",
        subtext: (
          <>
            Share files and text across any devices instantly.
            <br />
            No Pendrive. No app. No cable. No account Logins.
          </>
        ),
      }}
      intro={{
        kicker: "THE CROSS DEVICE PROBLEM",
        title: "Nobody has fully solved this yet.",
        paragraphs: [
          "Most people still use workarounds when they need to move content between devices. Emailing yourself, messaging yourself, cloud sync delays, platform lock-ins, or missing cables all turn a quick transfer into extra steps and waiting.",
          "The core issue is simple: sharing should work instantly between any two devices, but common tools depend on accounts, operating system compatibility, background apps, or setup you do not always have.",
          "NoLogin gives you one page name that opens from any browser. Save text or upload files on one device, then open the same page name on another device to access everything immediately. No signup, no install, no device pairing.",
        ],
      }}
      cardGrid={{
        kicker: "EVERY DEVICE COMBINATION THAT WORKS",
        title: "Phone, laptop, tablet, lab computer — all of it.",
        items: [
          {
            title: "Phone to laptop",
            body: "Move notes, links, images, or documents from your phone browser to your laptop browser in seconds.",
          },
          {
            title: "Android to Mac",
            body: "Share directly between different ecosystems without relying on platform-specific transfer tools.",
          },
          {
            title: "Windows to iPhone",
            body: "Access the same page from both devices and transfer text or files with the same flow every time.",
          },
          {
            title: "Browser to browser",
            body: "If both devices can open a browser, cross device sharing works. That includes desktops, tablets, phones, lab systems, and borrowed devices.",
          },
        ],
      }}
      how={{
        kicker: "HOW CROSS DEVICE SHARING WORKS",
        title: "Four steps. Same page name everywhere.",
        lead: "Share text such as links, code snippets, addresses, commands, and notes. Share files such as images, PDFs, documents, and project artifacts. Keep both together on one page.",
        steps: withResourceHowSteps(
          {
            num: 1,
            title: "Open on device one",
            body: "Go to nologin.in on your phone, laptop, or any device and type a page name.",
            url: "nologin.in/transfer",
          },
          {
            num: 2,
            title: "Add your content",
            body: "Paste text or upload files — everything lives on the same page.",
          },
        ),
      }}
      situations={{
        kicker: "REAL SITUATIONS WHERE THIS SAVES TIME",
        title: "When cross device sharing actually matters.",
        items: [
          {
            pill: "STUDENTS",
            title: "College labs and shared computers",
            body: "Transfer files between systems without logging into personal storage on public machines.",
          },
          {
            pill: "WORK",
            title: "Work meetings and presentations",
            body: "Move files from your phone to a presentation laptop quickly without stopping the flow.",
          },
          {
            pill: "TEAMS",
            title: "Remote collaboration",
            body: "Share a page name with teammates so they can open the same content from any device instantly.",
          },
          {
            pill: "DAILY USE",
            title: "Your personal clipboard",
            body: "Keep one memorable page name as your cross device clipboard. Open it from any device whenever you need to transfer something.",
            urls: ["nologin.in/mine", "nologin.in/sync"],
          },
        ],
      }}
      bulletSection={{
        kicker: "WHY NOT JUST USE A DEDICATED SYNC APP",
        title: "Lightweight beats heavy every time.",
        lead: "Dedicated sync apps can work, but they usually require installation on every device, account login, and permission setup. They are harder to use on temporary or restricted devices.",
        items: [
          {
            title: "No app to install",
            body: "NoLogin is a browser tab. Open it when you need it and close it when you are done.",
          },
          {
            title: "No account on any device",
            body: "You do not need to be logged in to anything. Type the page name and you have access.",
          },
          {
            title: "Optional expiry, password, edit lock",
            body: "Apply controls when needed so fast sharing stays secure and controlled.",
          },
          {
            title: "Text and files together",
            body: "Paste text and upload files on the same page. One place for everything you are moving between devices.",
          },
        ],
      }}
    />
  );
}
