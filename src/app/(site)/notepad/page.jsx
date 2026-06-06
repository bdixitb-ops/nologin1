import Notepad from "@/components/Notepad";
import { shareImageMetadata } from "@/lib/siteMetadata";

export const metadata = {
  title: {
    absolute: "Online Notepad — Free, No Login, No Signup, Access From Any Device | NoLogin",
  },
  description:
    "A free online notepad that requires no login and no signup. Type your notes, access them from any device using just a page name. No account, no app, no install needed.",
  alternates: {
    canonical: "https://nologin.in/notepad",
  },
  openGraph: {
    title: "Online Notepad — Free, No Login, No Signup, Access From Any Device | NoLogin",
    description:
      "A free online notepad that requires no login and no signup. Type your notes, access them from any device using just a page name. No account, no app, no install needed.",
    url: "https://nologin.in/notepad",
    ...shareImageMetadata.openGraph,
  },
  twitter: shareImageMetadata.twitter,
};

export default function NotepadPage() {
  return <Notepad />;
}
