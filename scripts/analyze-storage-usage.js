/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Find which domains/files use the most Firebase Storage.
 *
 * Usage:
 *   node scripts/analyze-storage-usage.js
 *   node scripts/analyze-storage-usage.js --top-domains=30 --top-files=50
 *   node scripts/analyze-storage-usage.js --since=2026-06-08 --until=2026-06-11
 *   node scripts/analyze-storage-usage.js --json --out=storage-report.json
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
  if (process.argv.includes(`--${name}`)) return true;
  const match = process.argv.find((arg) => arg.startsWith(`--${name}=`));
  return match ? match.slice(name.length + 3) : fallback;
};

const prefix = String(parseArg("prefix", "files/"));
const topDomains = Number(parseArg("top-domains", "25"));
const topFiles = Number(parseArg("top-files", "40"));
const jsonOutput = Boolean(parseArg("json", false));
const outPath = String(parseArg("out", ""));
const sinceArg = String(parseArg("since", ""));
const untilArg = String(parseArg("until", ""));
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
    "Missing service account. Set FIREBASE_SERVICE_ACCOUNT_PATH in .env or pass --service-account=path/to/key.json",
  );
}
if (!bucketName) {
  throw new Error("Missing bucket. Set FIREBASE_STORAGE_BUCKET or REACT_APP_FIREBASE_STORAGE_BUCKET in .env");
}

const sinceMs = sinceArg ? new Date(`${sinceArg}T00:00:00.000Z`).getTime() : null;
const untilMs = untilArg ? new Date(`${untilArg}T23:59:59.999Z`).getTime() : null;

let serviceAccount;
if (serviceAccountJsonRaw) {
  serviceAccount = JSON.parse(serviceAccountJsonRaw);
} else {
  const resolved = path.resolve(serviceAccountPath);
  if (!fs.existsSync(resolved)) throw new Error(`Service account not found: ${resolved}`);
  serviceAccount = JSON.parse(fs.readFileSync(resolved, "utf8"));
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: bucketName,
});

const bucket = admin.storage().bucket();

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return "unknown";
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** exponent).toFixed(exponent === 0 ? 0 : 2)} ${units[exponent]}`;
}

function parseUploadPath(storagePath) {
  if (!storagePath.startsWith("files/")) {
    return { domain: "(other)", fileName: storagePath };
  }
  const rest = storagePath.slice("files/".length);
  const slash = rest.indexOf("/");
  if (slash === -1) return { domain: rest, fileName: "" };
  return { domain: rest.slice(0, slash), fileName: rest.slice(slash + 1) };
}

function inDateRange(timestamp) {
  if (!timestamp) return true;
  const ms = new Date(timestamp).getTime();
  if (Number.isNaN(ms)) return true;
  if (sinceMs !== null && ms < sinceMs) return false;
  if (untilMs !== null && ms > untilMs) return false;
  return true;
}

function dayKey(timestamp) {
  if (!timestamp) return "unknown";
  return new Date(timestamp).toISOString().slice(0, 10);
}

const run = async () => {
  const files = [];
  const byDomain = new Map();
  const byDay = new Map();
  let scanned = 0;
  let pageToken;

  console.log("Scanning Firebase Storage...");
  console.log(`Bucket: ${bucketName}`);
  console.log(`Prefix: ${prefix}`);
  if (sinceArg || untilArg) {
    console.log(`Date filter: ${sinceArg || "start"} -> ${untilArg || "end"}`);
  }

  do {
    const [batch, , response] = await bucket.getFiles({
      prefix,
      autoPaginate: false,
      pageToken,
      maxResults: 1000,
    });

    for (const file of batch) {
      if (file.name.endsWith("/")) continue;
      scanned++;

      try {
        const [metadata] = await file.getMetadata();
        const updated = metadata.updated || metadata.timeCreated || null;
        if (!inDateRange(updated)) continue;

        const sizeBytes = Number(metadata.size || 0);
        const { domain, fileName } = parseUploadPath(file.name);
        const entry = {
          storagePath: file.name,
          domain,
          fileName,
          sizeBytes,
          sizeHuman: formatBytes(sizeBytes),
          contentType: metadata.contentType || "unknown",
          updated,
          day: dayKey(updated),
        };
        files.push(entry);

        const domainStats = byDomain.get(domain) || {
          domain,
          fileCount: 0,
          totalBytes: 0,
          largestFile: null,
          newest: null,
        };
        domainStats.fileCount += 1;
        domainStats.totalBytes += sizeBytes;
        if (!domainStats.largestFile || sizeBytes > domainStats.largestFile.sizeBytes) {
          domainStats.largestFile = entry;
        }
        if (!domainStats.newest || new Date(updated) > new Date(domainStats.newest)) {
          domainStats.newest = updated;
        }
        byDomain.set(domain, domainStats);

        const dayStats = byDay.get(entry.day) || { day: entry.day, fileCount: 0, totalBytes: 0 };
        dayStats.fileCount += 1;
        dayStats.totalBytes += sizeBytes;
        byDay.set(entry.day, dayStats);
      } catch (error) {
        console.error(`Failed: ${file.name}`, error?.message || error);
      }

      if (scanned % 250 === 0) {
        process.stdout.write(`\rScanned ${scanned} objects...`);
      }
    }

    pageToken = response.nextPageToken;
  } while (pageToken);

  process.stdout.write(`\rScanned ${scanned} objects.\n`);

  const totalBytes = files.reduce((sum, f) => sum + f.sizeBytes, 0);
  const domainRanking = [...byDomain.values()]
    .sort((a, b) => b.totalBytes - a.totalBytes)
    .map((d, i) => ({
      rank: i + 1,
      domain: d.domain,
      fileCount: d.fileCount,
      totalBytes: d.totalBytes,
      totalHuman: formatBytes(d.totalBytes),
      pctOfTotal: totalBytes ? Number(((d.totalBytes / totalBytes) * 100).toFixed(2)) : 0,
      largestFile: d.largestFile?.fileName || "",
      largestSizeHuman: d.largestFile ? formatBytes(d.largestFile.sizeBytes) : "",
      newest: d.newest,
    }));

  const fileRanking = [...files]
    .sort((a, b) => b.sizeBytes - a.sizeBytes)
    .slice(0, topFiles)
    .map((f, i) => ({ rank: i + 1, ...f }));

  const dayRanking = [...byDay.values()]
    .sort((a, b) => b.totalBytes - a.totalBytes)
    .map((d) => ({
      ...d,
      totalHuman: formatBytes(d.totalBytes),
    }));

  const report = {
    generatedAt: new Date().toISOString(),
    bucket: bucketName,
    prefix,
    scanned,
    matchedFiles: files.length,
    totalBytes,
    totalHuman: formatBytes(totalBytes),
    dateFilter: { since: sinceArg || null, until: untilArg || null },
    topDomains: domainRanking.slice(0, topDomains),
    topFiles: fileRanking,
    bytesByDay: dayRanking,
  };

  if (outPath) {
    const resolvedOut = path.resolve(outPath);
    fs.writeFileSync(resolvedOut, JSON.stringify(report, null, 2), "utf8");
    console.log(`Wrote report -> ${resolvedOut}`);
  }

  if (jsonOutput) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  console.log("");
  console.log("Storage summary");
  console.log("=".repeat(90));
  console.log(`Matched files: ${files.length}`);
  console.log(`Total size: ${formatBytes(totalBytes)}`);

  console.log("");
  console.log(`Top domains by storage (top ${topDomains})`);
  console.log("-".repeat(90));
  console.log(
    `${"Rank".padEnd(6)}${"Total".padEnd(12)}${"%".padEnd(8)}${"Files".padEnd(8)}Domain`.padEnd(40) +
      "Largest file",
  );
  console.log("-".repeat(90));
  for (const row of domainRanking.slice(0, topDomains)) {
    console.log(
      `${String(row.rank).padEnd(6)}${row.totalHuman.padEnd(12)}${String(row.pctOfTotal).padEnd(8)}${String(row.fileCount).padEnd(8)}${row.domain.slice(0, 28).padEnd(28)}${row.largestFile.slice(0, 40)} (${row.largestSizeHuman})`,
    );
  }

  console.log("");
  console.log(`Largest files overall (top ${topFiles})`);
  console.log("-".repeat(90));
  console.log(`${"Rank".padEnd(6)}${"Size".padEnd(12)}${"Domain".padEnd(24)}File`.padEnd(36) + "Uploaded");
  console.log("-".repeat(90));
  for (const row of fileRanking) {
    const when = row.updated ? new Date(row.updated).toISOString().slice(0, 19) : "unknown";
    console.log(
      `${String(row.rank).padEnd(6)}${row.sizeHuman.padEnd(12)}${row.domain.slice(0, 23).padEnd(24)}${row.fileName.slice(0, 35).padEnd(36)}${when}`,
    );
  }

  console.log("");
  console.log("Storage added by day (largest days first)");
  console.log("-".repeat(60));
  console.log(`${"Day".padEnd(14)}${"Total".padEnd(14)}Files`);
  console.log("-".repeat(60));
  for (const row of dayRanking.slice(0, 15)) {
    console.log(`${row.day.padEnd(14)}${row.totalHuman.padEnd(14)}${row.fileCount}`);
  }
};

run().catch((error) => {
  console.error("Fatal error:", error);
  process.exitCode = 1;
});
