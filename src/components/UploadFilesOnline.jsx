"use client";

import ResourceMarketingPage from "@/components/resource/ResourceMarketingPage";
import { withResourceHowSteps } from "@/components/resource/resourceHowSteps";

export default function UploadFilesOnline() {
  return (
    <ResourceMarketingPage
      pageClass="upload-files-page"
      faqId="upload-files-faq"
      howBeforeCards
      hero={{
        badge: "One page. Your files.",
        title: "Upload Files Online",
        subtext: (
          <>
            The fastest way to share files online.
            <br />
            Open a page. Upload your files. Share the name.
          </>
        ),
      }}
      intro={{
        kicker: "WHY UPLOADING FILES ONLINE IS STILL PAINFUL",
        title: "No account required on either end.",
        brightTitle: true,
        paragraphs: [
          "Most file sharing tools get in the way before you can share anything. One asks for an email. Another sends an OTP. A third requires you to create an account, verify it, and then figure out permissions before the other person can even open the file.",
          "For a task as simple as getting a file from one person to another, this is too much.",
          "NoLogin removes every one of those steps. You open a page, upload your file, and share the link. The person receiving it opens a browser, types the link, and downloads the file.",
        ],
      }}
      how={{
        kicker: "HOW TO UPLOAD FILES ONLINE WITH NOLOGIN",
        title: "Four steps. No verification. No permissions.",
        lead: "Short, clean, easy to say out loud or write on a board. No random strings. No long URLs to copy and paste.",
        steps: withResourceHowSteps(
          {
            num: 1,
            title: "Type a page name",
            body: "Go to nologin.in and type any word or phrase as your page name.",
            url: "nologin.in/yourpagename",
          },
          {
            num: 2,
            title: "Upload your file",
            body: "Upload your file — PDF, image, code, document, screenshot, anything.",
          },
        ),
      }}
      cardGrid={{
        kicker: "WHAT FILES CAN YOU UPLOAD",
        title: "PDFs, images, code, documents — anything.",
        lead: "NoLogin works for any file you need to share quickly.",
        items: [
          {
            title: "PDFs",
            body: "Lecture notes, assignments, reference material, reports. Upload once, share the page name, everyone downloads it instantly.",
          },
          {
            title: "Images and screenshots",
            body: "Share a diagram, a screenshot of an error, a photo of notes from a whiteboard. Faster than sending it through a chat app.",
          },
          {
            title: "Code files",
            body: "Upload a .py, .java, .cpp or any other file. Your recipient gets the exact file without copy-paste errors.",
          },
          {
            title: "Documents",
            body: "Word files, spreadsheets, presentations. Upload the file and share one clean link instead of an email attachment.",
          },
          {
            title: "Multiple files",
            body: "Upload up to 5 files on a single page. Add notes or instructions alongside them in the same place. Up to 100MB per file, no account needed.",
          },
        ],
      }}
      situations={{
        kicker: "REAL SITUATIONS WHERE THIS HELPS",
        title: "Every situation where file sharing is painful.",
        items: [
          {
            pill: "STUDENTS",
            title: "In a college lab",
            body: "You have a working program and your partner needs it right now. Upload it to nologin.in/labcode, say the page name, they download it in seconds. No pendrive. No email.",
            urls: ["nologin.in/labcode", "nologin.in/unit3"],
          },
          {
            pill: "TEACHERS",
            title: "In a classroom",
            body: "Upload your slides or notes before class.Enter the class room and open the page name and download the file. No pendrives, No Google drive login. Turn on edit lock so students cannot change or delete your files.",
          },
          {
            pill: "EVENTS",
            title: "At a workshop or event",
            body: "Put all your resources on one page. Show nologin.in/event on the projector. Every person in the room has instant access without sharing phone numbers.",
            urls: ["nologin.in/event"],
          },
          {
            pill: "PHONE → LAPTOP",
            title: "Cross-device transfer",
            body: "Need a file from your phone on your laptop? Upload it to NoLogin from your phone, open the same page name on your laptop, download. No cable. No cloud storage login.",
          },
        ],
      }}
      bulletSection={{
        kicker: "HOW NOLOGIN COMPARES FOR FILE UPLOADS",
        title: "Different in a few specific ways.",
        lead: "Google Drive needs everyone to have a Google account and understand sharing permissions. WeTransfer generates random URLs and limits you to 2GB on a time-restricted link. Telegram and WhatsApp need both people to have the app and be connected as contacts.",
        items: [
          {
            title: "No account on either end",
            body: "The person downloading your file does not need NoLogin. They open the link, they get the file.",
          },
          {
            title: "Custom page names",
            body: "You choose the link, not an algorithm. nologin.in/notes is easier to share than a 40-character random URL.",
          },
          {
            title: "Text and files together",
            body: "Add instructions, passwords or context alongside your file on the same page. One link for everything.",
          },
          {
            title: "Automatic expiry",
            body: "Set your file to disappear after 1 hour, 48 hours, or 7 days. No cleanup needed, no files sitting online longer than necessary.",
          },
          {
            title: "Edit lock",
            body: "Prevent others from uploading or deleting files on your page. Your content stays exactly as you left it.",
          },
          {
            title: "Password protection",
            body: "Restrict who can view and download your files. Optional, takes just 5 seconds to set.",
          },
        ],
      }}
    />
  );
}
