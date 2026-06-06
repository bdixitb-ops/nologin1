import UploadFilesOnline from "@/components/UploadFilesOnline";
import { shareImageMetadata } from "@/lib/siteMetadata";

export const metadata = {
  title: {
    absolute: "Upload Files Online Free — No Login, No Signup, Instant Sharing | NoLogin",
  },
  description:
    "Upload and share files online instantly — no login, no signup, no account needed. Pick a page name, upload your file, share the link. Free, fast, works on any device.",
  alternates: {
    canonical: "https://nologin.in/upload-files-online",
  },
  ...shareImageMetadata,
};

export default function UploadFilesOnlinePage() {
  return <UploadFilesOnline />;
}
