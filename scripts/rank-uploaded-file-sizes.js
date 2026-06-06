/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

const loadEnvFile = () => {
  const envPath = path.resolve(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) {
    return;
  }

  const raw = fs.readFileSync(envPath, "utf8");
  const lines = raw.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex <= 0) {
      continue;
    }

    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim().replace(/^["']|["']$/g, "");
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
};

loadEnvFile();

const parseArg = (name, fallback = undefined) => {
  const exact = process.argv.find((arg) => arg === `--${name}`);
  if (exact) {
    return true;
  }

  const withValue = process.argv.find((arg) => arg.startsWith(`--${name}=`));
  if (!withValue) {
    return fallback;
  }
  return withValue.slice(name.length + 3);
};

const prefix = String(parseArg("prefix", "files/"));
const limit = Number(parseArg("limit", "100"));
const jsonOutput = Boolean(parseArg("json", false));
const minBytes = Number(parseArg("min-bytes", "0"));
const serviceAccountPath = String(
  parseArg(
    "service-account",
    process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.FIREBASE_SERVICE_ACCOUNT_PATH || "",
  ),
);
const serviceAccountJsonRaw = String(
  parseArg(
    "service-account-json",
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON || process.env.REACT_APP_FIREBASE_SERVICE_ACCOUNT_JSON || "",
  ),
);
const bucketName = String(
  parseArg("bucket", process.env.FIREBASE_STORAGE_BUCKET || process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || ""),
);

if (!serviceAccountPath && !serviceAccountJsonRaw) {
  throw new Error(
    'Missing service account. Pass --service-account="path/to/key.json" OR --service-account-json=\'{"..."}\' OR set GOOGLE_APPLICATION_CREDENTIALS/FIREBASE_SERVICE_ACCOUNT_PATH/FIREBASE_SERVICE_ACCOUNT_JSON.',
  );
}

if (!bucketName) {
  throw new Error('Missing bucket name. Pass --bucket="your-bucket.appspot.com" or set FIREBASE_STORAGE_BUCKET.');
}

if (!Number.isFinite(limit) || limit <= 0) {
  throw new Error("Invalid --limit value. Use a positive number, e.g. --limit=50");
}

if (!Number.isFinite(minBytes) || minBytes < 0) {
  throw new Error("Invalid --min-bytes value. Use zero or a positive number.");
}

let serviceAccount;
if (serviceAccountJsonRaw) {
  try {
    serviceAccount = JSON.parse(serviceAccountJsonRaw);
  } catch (error) {
    throw new Error(`Invalid service account JSON in env/arg: ${error.message}`);
  }
} else {
  const resolvedServiceAccountPath = path.resolve(serviceAccountPath);
  if (!fs.existsSync(resolvedServiceAccountPath)) {
    throw new Error(`Service account file not found: ${resolvedServiceAccountPath}`);
  }
  serviceAccount = JSON.parse(fs.readFileSync(resolvedServiceAccountPath, "utf8"));
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: bucketName,
});

const bucket = admin.storage().bucket();

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) {
    return "unknown";
  }
  if (bytes === 0) {
    return "0 B";
  }
  const units = ["B", "KB", "MB", "GB", "TB"];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** exponent;
  return `${value.toFixed(exponent === 0 ? 0 : 2)} ${units[exponent]}`;
}

function parseUploadPath(storagePath) {
  if (!storagePath.startsWith("files/")) {
    return { domain: "", fileName: storagePath };
  }

  const pathWithoutRoot = storagePath.slice("files/".length);
  const firstSlash = pathWithoutRoot.indexOf("/");
  if (firstSlash === -1) {
    return { domain: pathWithoutRoot, fileName: "" };
  }

  return {
    domain: pathWithoutRoot.slice(0, firstSlash),
    fileName: pathWithoutRoot.slice(firstSlash + 1),
  };
}

const run = async () => {
  const entries = [];
  let scanned = 0;
  let pageToken = undefined;

  console.log("Scanning uploaded files...");
  console.log(`Bucket: ${bucketName}`);
  console.log(`Prefix: ${prefix}`);
  console.log(`Showing top: ${limit}`);
  if (minBytes > 0) {
    console.log(`Min size: ${formatBytes(minBytes)}`);
  }

  do {
    const [files, , response] = await bucket.getFiles({
      prefix,
      autoPaginate: false,
      pageToken,
      maxResults: 1000,
    });

    for (const file of files) {
      if (file.name.endsWith("/")) {
        continue;
      }

      scanned++;
      try {
        const [metadata] = await file.getMetadata();
        const sizeBytes = Number(metadata.size || 0);
        if (sizeBytes < minBytes) {
          continue;
        }

        const { domain, fileName } = parseUploadPath(file.name);
        entries.push({
          rank: 0,
          sizeBytes,
          sizeHuman: formatBytes(sizeBytes),
          storagePath: file.name,
          domain,
          fileName,
          contentType: metadata.contentType || "unknown",
          updated: metadata.updated || metadata.timeCreated || null,
        });
      } catch (error) {
        console.error(`Failed to read metadata -> ${file.name}`, error?.message || error);
      }
    }

    pageToken = response.nextPageToken;
  } while (pageToken);

  entries.sort((a, b) => b.sizeBytes - a.sizeBytes);
  const ranked = entries.slice(0, limit).map((entry, index) => ({
    ...entry,
    rank: index + 1,
  }));

  const totalBytes = entries.reduce((sum, entry) => sum + entry.sizeBytes, 0);

  if (jsonOutput) {
    console.log(
      JSON.stringify(
        {
          bucket: bucketName,
          prefix,
          scanned,
          matched: entries.length,
          totalBytes,
          totalHuman: formatBytes(totalBytes),
          files: ranked,
        },
        null,
        2,
      ),
    );
    return;
  }

  console.log("");
  console.log("Upload size ranking (largest first)");
  console.log("=".repeat(120));
  console.log(
    `${"Rank".padEnd(6)}${"Size".padEnd(12)}${"Domain".padEnd(24)}${"File".padEnd(36)}Updated`,
  );
  console.log("-".repeat(120));

  if (ranked.length === 0) {
    console.log("No files matched.");
  } else {
    for (const entry of ranked) {
      const updated = entry.updated ? new Date(entry.updated).toISOString().slice(0, 19) : "unknown";
      const domain = entry.domain || "(unknown)";
      const fileName = entry.fileName || entry.storagePath;
      console.log(
        `${String(entry.rank).padEnd(6)}${entry.sizeHuman.padEnd(12)}${domain.slice(0, 23).padEnd(24)}${fileName.slice(0, 35).padEnd(36)}${updated}`,
      );
    }
  }

  console.log("-".repeat(120));
  console.log(`Scanned objects: ${scanned}`);
  console.log(`Matched files: ${entries.length}`);
  console.log(`Total matched size: ${formatBytes(totalBytes)}`);
  console.log(`Top ${ranked.length} shown`);
};

run().catch((error) => {
  console.error("Fatal ranking error:", error);
  process.exitCode = 1;
});
