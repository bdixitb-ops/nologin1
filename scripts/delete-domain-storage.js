/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Delete all storage files for one domain (e.g. abusive uploads).
 *
 *   node scripts/delete-domain-storage.js --domain=chirag --dry-run
 *   node scripts/delete-domain-storage.js --domain=chirag
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

const parseArg = (name, fallback = undefined) => {
  const match = process.argv.find((arg) => arg.startsWith(`--${name}=`));
  if (!match) return process.argv.includes(`--${name}`) ? true : fallback;
  return match.slice(name.length + 3);
};

const domain = String(parseArg("domain", "")).trim().toLowerCase();
const dryRun = Boolean(parseArg("dry-run", false));
const serviceAccountPath = String(
  parseArg(
    "service-account",
    process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.FIREBASE_SERVICE_ACCOUNT_PATH || "",
  ),
);
const bucketName = String(
  parseArg("bucket", process.env.FIREBASE_STORAGE_BUCKET || process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || ""),
);

if (!domain) throw new Error('Pass --domain=yourpagename');
if (!serviceAccountPath) throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_PATH");
if (!bucketName) throw new Error("Missing FIREBASE_STORAGE_BUCKET");

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(fs.readFileSync(path.resolve(serviceAccountPath), "utf8"))),
  storageBucket: bucketName,
});

const bucket = admin.storage().bucket();
const firestore = admin.firestore();

function formatBytes(bytes) {
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

const run = async () => {
  const prefix = `files/${domain}/`;
  let deleted = 0;
  let totalBytes = 0;
  let pageToken;

  console.log(`Domain: ${domain}`);
  console.log(`Mode: ${dryRun ? "DRY RUN" : "LIVE DELETE"}`);

  do {
    const [files, , response] = await bucket.getFiles({
      prefix,
      autoPaginate: false,
      maxResults: 500,
      pageToken,
    });

    for (const file of files) {
      if (file.name.endsWith("/")) continue;
      const [metadata] = await file.getMetadata();
      const size = Number(metadata.size || 0);
      totalBytes += size;
      console.log(`${dryRun ? "[DRY RUN] " : ""}${file.name} (${formatBytes(size)})`);
      if (!dryRun) {
        await file.delete({ ignoreNotFound: true });
      }
      deleted++;
    }

    pageToken = response.nextPageToken;
  } while (pageToken);

  if (!dryRun) {
    await firestore.collection("documents").doc(domain).set({ files: [] }, { merge: true });
  }

  console.log(`Files: ${deleted}`);
  console.log(`Total: ${formatBytes(totalBytes)}`);
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
