"use client";

import SimpleContentPage from "@/components/SimpleContentPage";

export default function ContentPolicy() {
  return (
    <SimpleContentPage
      title="Content Policy for NoLogin"
      sections={[
        {
          heading: "",
          paragraphs: [
            "NoLogin is committed to providing a safe and reliable sharing experience for all users. This policy explains the types of content that are not allowed on nologin.in.",
            "Last updated: April 2026",
          ],
        },
        {
          heading: "Prohibited Content",
          paragraphs: [
            "NoLogin does not allow content that is illegal, promotes illegal activities, or infringes on the legal rights of others. This includes, but is not limited to, content that:",
          ],
          items: [
            "Promotes violence or harassment against individuals or groups",
            "Contains sexually explicit or adult content",
            "Promotes or sells firearms or weapons",
            "Promotes or sells tobacco, alcohol, or related products",
            "Promotes or sells drugs or drug paraphernalia",
            "Promotes or sells prescription drugs or controlled substances",
            "Contains false or misleading information intended to deceive or cause harm",
            "Contains malware, viruses, or malicious code",
            "Encourages, promotes, or coordinates illegal activities",
            "Infringes on copyright or intellectual property rights, including uploading pirated files, books, movies, or software",
            "Contains private personal information of others without their consent (doxxing), such as addresses, phone numbers, or financial information",
            "Is used for phishing or credential harvesting",
            "Targets or inappropriately involves minors",
          ],
        },
        {
          heading: "",
          paragraphs: [
            "In addition, NoLogin does not allow content that is deceptive, hateful, or discriminates against individuals or groups based on race, religion, nationality, gender, sexual orientation, or other characteristics.",
          ],
        },
        {
          heading: "How Pages Work",
          paragraphs: ["Understanding how NoLogin pages work is important before sharing any content:"],
          items: [
            "Anyone with your page name can view your content unless you set a password",
            "Anyone with your page name can edit, delete, or overwrite your content unless you enable Edit Lock",
            "Edit Lock prevents changes but the page remains publicly viewable unless you also set a password",
            "Password protection and Edit Lock are two separate features. Use both for full protection",
            "Content expires and is permanently deleted after the time you set",
          ],
        },
        {
          heading: "User-Generated Content",
          paragraphs: [
            "NoLogin allows users to create and share content using self-chosen page names. We do not monitor all user-generated content, but we reserve the right to remove any content that violates this policy.",
          ],
        },
        {
          heading: "File Uploads - Important Disclaimer",
          paragraphs: [
            "NoLogin does not scan, inspect, or verify uploaded files for malware, viruses, or harmful content.",
            "By downloading any file from nologin.in you accept full responsibility for any associated risk. NoLogin is not liable for any damage caused by files downloaded from our platform.",
            "Only download files from people you trust.",
          ],
        },
        {
          heading: "Password Protection & Edit Lock",
          paragraphs: [
            "Password protection restricts who can view your page but does not encrypt your content. Edit Lock prevents modifications to your page but does not restrict viewing.",
            "These features provide access control only. NoLogin does not guarantee that protected pages cannot be accessed by unintended parties in the event of a security breach.",
          ],
        },
        {
          heading: "Copyright & DMCA",
          paragraphs: [
            "NoLogin respects intellectual property rights. If you believe content on nologin.in infringes your copyright, contact us at nologin044@gmail.com with:",
          ],
          items: [
            "The URL of the infringing page",
            "Proof of your ownership of the content",
            "Your contact information",
          ],
        },
        {
          heading: "",
          paragraphs: ["Verified infringing content will be removed within 48 hours."],
        },
        {
          heading: "Age Restriction",
          paragraphs: [
            "NoLogin is not intended for users under the age of 13. By using nologin.in you confirm that you are at least 13 years old.",
          ],
        },
        {
          heading: "No Liability",
          paragraphs: [
            "NoLogin is not responsible for content posted by users. Users are solely responsible for content they create, share, or download via nologin.in. NoLogin is not liable for any loss, damage, or harm arising from the use of content shared on our platform.",
          ],
        },
        {
          heading: "No Guarantee of Availability",
          paragraphs: [
            "Content on NoLogin is temporary by design. We do not store previous versions and cannot recover deleted, expired, or overwritten pages. Do not use NoLogin as a permanent storage solution.",
          ],
        },
        {
          heading: "Rate Limiting & Abuse Prevention",
          paragraphs: [
            "We reserve the right to rate-limit or block access to the service for abuse prevention without notice.",
          ],
        },
        {
          heading: "Enforcement",
          paragraphs: [
            "NoLogin takes violations of this content policy seriously. We may remove any content that violates this policy at any time without notice.",
          ],
        },
        {
          heading: "Reporting Violations",
          paragraphs: [
            "If you find a page that violates this policy, contact us at: nologin044@gmail.com",
            "Include the page URL in your report. We aim to respond within 48 hours.",
          ],
        },
        {
          heading: "Spam Protection",
          paragraphs: ["NoLogin employs automated detection to prevent spam and abuse on the platform."],
        },
        {
          heading: "Changes to This Policy",
          paragraphs: [
            "NoLogin may update this content policy from time to time. We encourage users to review this policy periodically.",
          ],
        },
        {
          heading: "Contact Us",
          paragraphs: [
            "Do not contact us to recover deleted or edited pages. We do not store previous versions of page content.",
            "For all policy questions and reports: nologin044@gmail.com",
            "This content policy was last updated on 2026-04-30.",
          ],
        },
      ]}
    />
  );
}
