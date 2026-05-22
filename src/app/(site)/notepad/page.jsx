import Notepad from "@/components/Notepad";

export const metadata = {
  title: {
    absolute: "Online Notepad — Free, No Login, No Signup, Access From Any Device | NoLogin",
  },
  description:
    "A free online notepad that requires no login and no signup. Type your notes, access them from any device using just a page name. No account, no app, no install needed.",
  alternates: {
    canonical: "https://www.nologin.in/notepad",
  },
  openGraph: {
    title: "Online Notepad — Free, No Login, No Signup, Access From Any Device | NoLogin",
    description:
      "A free online notepad that requires no login and no signup. Type your notes, access them from any device using just a page name. No account, no app, no install needed.",
    url: "https://www.nologin.in/notepad",
  },
};

export default function NotepadPage() {
  return <Notepad />;
}
