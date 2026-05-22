import WhyNoLogin from "@/components/WhyNoLogin";

export const metadata = {
  title: {
    absolute: "How Does NoLogin Help You — Real Use Cases | NoLogin",
  },
  description:
    "See how NoLogin helps students, teachers, developers and teams share instantly. Real use cases — college labs, hackathons, classrooms, events and more. No login needed.",
  alternates: {
    canonical: "https://www.nologin.in/why-nologin",
  },
  openGraph: {
    title: "How Does NoLogin Help You — Real Use Cases | NoLogin",
    description:
      "See how NoLogin helps students, teachers, developers and teams share instantly. Real use cases — college labs, hackathons, classrooms, events and more. No login needed.",
    url: "https://www.nologin.in/why-nologin",
  },
};

export default function WhyNoLoginPage() {
  return <WhyNoLogin />;
}
