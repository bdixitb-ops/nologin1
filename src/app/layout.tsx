import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import "./legacy.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nologin.in"),
  title: {
    default: "NoLogin | Instant File & Text Sharing Without Login",
    template: "%s | NoLogin",
  },
  description:
    "Tired of logging in? NoLogin offers fast, secure text and document sharing with no credentials required.",
  keywords: [
    "NoLogin",
    "secure file sharing",
    "anonymous sharing",
    "instant text sharing",
    "pastebin alternative",
    "share across devices",
  ],
  openGraph: {
    title: "NoLogin | Instant File & Text Sharing Without Login",
    description:
      "Fast, secure text and document sharing with no signup and no login.",
    url: "https://nologin.in",
    siteName: "NoLogin",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoLogin | Instant File & Text Sharing Without Login",
    description:
      "Fast, secure text and document sharing with no signup and no login.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
