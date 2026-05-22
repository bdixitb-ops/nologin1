"use client";

import SimpleContentPage from "@/components/SimpleContentPage";

export default function PrivacyPolicy() {
  return (
    <SimpleContentPage
      title="Privacy Policy for NoLogin"
      sections={[
        {
          heading: "",
          paragraphs: [
            "NoLogin is committed to being transparent about how we handle your data. We built this product on a simple principle: no login, no unnecessary data collection.",
            "Last updated: May 2025",
          ],
        },
        {
          heading: "What We Collect",
          paragraphs: [
            "NoLogin does not require an account, email, or any personal information to use the service.",
            "We do not collect:",
          ],
          items: [
            "Your name or email address",
            "Any personal identifier tied to your content or activity",
          ],
        },
        {
          heading: "",
          paragraphs: [
            "The only data we store is the content you submit: text, code, or files, at the page name you choose.",
          ],
        },
        {
          heading: "How Pages Work",
          paragraphs: [
            "Your content is stored at the page name you choose and is accessible to anyone who knows that page name. NoLogin does not assign pages to users. There is no ownership tied to a page beyond knowing its name.",
          ],
          items: [
            "Anyone with your page name can view your content unless you set a password",
            "Anyone with your page name can edit or delete your content unless you enable Edit Lock",
            "Password protection and Edit Lock are separate features. Use both for full control over your page",
          ],
        },
        {
          heading: "Password Protection & Edit Lock",
          paragraphs: [
            "Password protection restricts who can view your page but does not encrypt your content. Edit Lock prevents modifications but does not restrict viewing.",
            "These features provide access control only and do not guarantee complete protection in the event of a security breach.",
          ],
        },
        {
          heading: "File Uploads",
          paragraphs: [
            "Files you upload are stored on our servers for the duration you set. We do not scan, inspect, or read uploaded files.",
            "By downloading any file from nologin.in you accept full responsibility for any associated risk. Only download files from people you trust.",
          ],
        },
        {
          heading: "Analytics",
          paragraphs: [
            "We use Google Analytics to understand how the site is used: page views, and country. Google Analytics uses cookies to collect this data anonymously.",
            "We do not have access to personally identifiable information through Analytics.",
            "To opt out of Google Analytics tracking: tools.google.com/dlpage/gaoptout",
          ],
        },
        {
          heading: "Data Retention",
          paragraphs: [
            "Content expires based on the duration you set at the time of sharing. After expiry, content is deleted from active storage.",
            "We do not store previous versions of content. Deleted, expired, or overwritten pages cannot be recovered.",
            "Do not use NoLogin as a permanent storage solution for important content.",
          ],
        },
        {
          heading: "Third Party Services",
          paragraphs: [
            "We use the following third party services to operate nologin.in:",
          ],
          items: [
            "Google Analytics - anonymous usage data",
            "Firebase (Google) - storage and infrastructure",
          ],
        },
        {
          heading: "",
          paragraphs: [
            "Each of these services has their own privacy policy governing how they handle data. We encourage you to review them.",
          ],
        },
        {
          heading: "Your Content",
          paragraphs: [
            "You retain ownership of everything you post on NoLogin. By posting content you grant NoLogin a limited license to store and display that content solely for the purpose of operating the service.",
            "We do not read, sell, or share your content with anyone.",
          ],
        },
        {
          heading: "Security",
          paragraphs: [
            "We do not guarantee the security of content shared on nologin.in. You are responsible for protecting sensitive content using the password and Edit Lock features available on the platform.",
            "NoLogin is not liable for any data breaches, leaks, or unauthorized access to content shared through the platform.",
          ],
        },
        {
          heading: "Children",
          paragraphs: [
            "NoLogin is not intended for users under the age of 13. We do not knowingly collect data from or allow content targeting children under 13.",
          ],
        },
        {
          heading: "Changes to This Policy",
          paragraphs: [
            "We may update this privacy policy from time to time. We encourage users to review this policy periodically. Continued use of nologin.in after changes constitutes acceptance of the updated policy.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            "For any privacy related questions or concerns, contact us at:",
            "nologin044@gmail.com",
            "This privacy policy was last updated on 2026-04-30.",
          ],
        },
      ]}
    />
  );
}
