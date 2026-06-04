"use client";

import ResourceMarketingPage from "@/components/resource/ResourceMarketingPage";
import { withResourceHowSteps } from "@/components/resource/resourceHowSteps";

export default function OnlineClipboard() {
  return (
    <ResourceMarketingPage
      pageClass="online-clipboard-page"
      faqId="online-clipboard-faq"
      hero={{
        badge: "Copy on one. Open on another.",
        title: "Online Clipboard",
        subtext: (
          <>
            Upload on your phone. Open it on your laptop.
            <br />
            No cable. No app. No login. Just a page name.
          </>
        ),
      }}
      intro={{
        kicker: "THE PROBLEM WITH MOVING CONTENT BETWEEN DEVICES",
        title: "Every obvious solution has friction.",
        paragraphs: [
          "You are working on your phone and need something on shared computer system or vice versa. Or you are on one computer and need to get a file to another. Email, Bluetooth, USB cables, AirDrop, cloud storage, messaging apps — all turn a ten-second task into many steps.",
          "There is no built-in way to just move something from one device to another quickly without setup, cables or accounts.",
          "NoLogin works like a clipboard that lives on the internet and is accessible from any device with a browser. Open nologin.in, type a page name, paste your text or upload your file, and open the same page name on your other device.",
        ],
        urlLabel: "The page name is whatever word you choose:",
        urls: ["nologin.in/clipboard", "nologin.in/transfer", "nologin.in/sync"],
        footerParagraphs: [
          "Short, memorable, yours. No random characters, no long URLs, no link to copy and paste between devices.",
        ],
      }}
      cardGrid={{
        kicker: "HOW IT WORKS IN PRACTICE",
        title: "Text, files, labs, and sharing with others.",
        items: [
          {
            title: "Moving text between devices",
            body: "Copy a URL, password, address, or block of text on your phone. Open NoLogin, type your page name, paste, save. Switch to any system, open the same page name, copy. Done in under fifteen seconds.",
          },
          {
            title: "Moving files between devices",
            body: "Upload a photo, document, PDF or code file on your phone. Open the same page name on any system and download. No cable, no account, no app.",
          },
          {
            title: "Moving content in a lab",
            body: "Upload your work to a NoLogin page at the start of the session. Access it from any computer in the lab by typing the page name. No pendrive, no email login.",
          },
          {
            title: "Sharing with someone else",
            body: "Share the page name and they open it on their device. Instant. No contact exchange, no group setup.",
          },
        ],
      }}
      how={{
        kicker: "HOW TO USE NOLOGIN AS AN ONLINE CLIPBOARD",
        title: "Four steps. Under fifteen seconds.",
        steps: withResourceHowSteps(
          {
            num: 1,
            title: "Pick a page name",
            body: "Choose something memorable you will reuse — nologin.in/mine works well.",
            url: "nologin.in/mine",
          },
          {
            num: 2,
            title: "Paste or upload",
            body: "Paste text or upload files on device one. Save the page.",
          },
        ),
      }}
      situations={{
        kicker: "REAL SITUATIONS WHERE THIS SAVES TIME",
        title: "When an online clipboard beats everything else.",
        items: [
          {
            pill: "PHONE → LAPTOP",
            title: "Quick personal transfers",
            body: "Copy on phone, paste to NoLogin, open on laptop. The simplest cross-device flow that exists.",
            urls: ["nologin.in/mine"],
          },
          {
            pill: "STUDENTS",
            title: "Shared lab computers",
            body: "Access your work from any machine in the lab without logging into personal cloud storage on a public computer.",
          },
          {
            pill: "WORK",
            title: "Meeting handoffs",
            body: "Move a link, note, or file to a presentation laptop without stopping to set up anything.",
          },
          {
            pill: "DAILY USE",
            title: "A habit that saves time",
            body: "Once you have a page name you use for transfers, the process becomes automatic. Type, paste or upload, switch device, done.",
            urls: ["nologin.in/transfer"],
          },
        ],
      }}
      bulletSection={{
        kicker: "WHY NOLOGIN BEATS DEDICATED CLIPBOARD APPS",
        title: "No installation. No permissions. No background process.",
        lead: "Most clipboard sync apps require installing on every device, creating an account, granting clipboard permissions, and keeping apps running in the background.",
        items: [
          {
            title: "Works on every device",
            body: "Any phone, laptop, tablet or desktop with a browser. iOS, Android, Windows, Mac, Linux, Chromebook.",
          },
          {
            title: "No login on any device",
            body: "Type the page name and you have access. No account to manage.",
          },
          {
            title: "Edit lock and expiry",
            body: "Protect content between devices and set it to delete automatically when you are done.",
          },
          {
            title: "No compression",
            body: "Files are stored and delivered exactly as you uploaded them — unlike messaging apps that compress images and documents.",
          },
        ],
      }}
    />
  );
}
