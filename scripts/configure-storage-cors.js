/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Configure Firebase Storage bucket CORS for browser uploads.
 *
 *   node scripts/configure-storage-cors.js
 */
const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

const loadEnvFile = () => {
  const envPath = path.resolve(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex <= 0) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim().replace(/^["']|["']$/g, "");
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
};

loadEnvFile();

const serviceAccountPath = String(
  process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.FIREBASE_SERVICE_ACCOUNT_PATH || "",
);
const bucketName = String(
  process.env.FIREBASE_STORAGE_BUCKET || process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "",
);

if (!serviceAccountPath || !bucketName) {
  throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_PATH or FIREBASE_STORAGE_BUCKET in .env");
}

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(fs.readFileSync(path.resolve(serviceAccountPath), "utf8"))),
  storageBucket: bucketName,
});

const bucket = admin.storage().bucket();

const corsConfiguration = [
  {
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://nologin.in",
      "https://www.nologin.in",
      "https://nologinin.vercel.app",
    ],
    method: ["GET", "PUT", "HEAD", "DELETE", "POST", "OPTIONS"],
    responseHeader: [
      "Content-Type",
      "Content-Length",
      "x-goog-content-length-range",
      "x-goog-resumable",
      "x-goog-meta-*",
    ],
    maxAgeSeconds: 3600,
  },
];

const run = async () => {
  await bucket.setMetadata({ cors: corsConfiguration });
  const [metadata] = await bucket.getMetadata();
  console.log(`Updated CORS on ${bucketName}`);
  console.log(JSON.stringify(metadata.cors, null, 2));
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
