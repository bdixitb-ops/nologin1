import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.nologin.in" }],
        destination: "https://nologin.in/:path*",
        permanent: true,
      },
      {
        source: "/TermsAndConditions",
        destination: "/terms",
        permanent: true,
      },
    ];
  },
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY:
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.REACT_APP_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID:
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.REACT_APP_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
      process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID:
      process.env.NEXT_PUBLIC_FIREBASE_APP_ID || process.env.REACT_APP_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    NEXT_PUBLIC_FIREBASE_DATABASE_URL:
      process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || process.env.REACT_APP_FIREBASE_DATABASE_URL,
  },
};

export default nextConfig;
