/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

const loadEnvFile = () => {
  const envPath = path.resolve(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    return;
  }

  const raw = fs.readFileSync(envPath, 'utf8');
  const lines = raw.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex <= 0) {
      continue;
    }

    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim().replace(/^["']|["']$/g, '');
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

const days = Number(parseArg('days', '7'));
const prefix = String(parseArg('prefix', 'files/'));
const dryRun = Boolean(parseArg('dry-run', false));
const serviceAccountPath = String(
  parseArg(
    'service-account',
    process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.FIREBASE_SERVICE_ACCOUNT_PATH || ''
  )
);
const serviceAccountJsonRaw = String(
  parseArg(
    'service-account-json',
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON || process.env.REACT_APP_FIREBASE_SERVICE_ACCOUNT_JSON || ''
  )
);
const bucketName = String(
  parseArg(
    'bucket',
    process.env.FIREBASE_STORAGE_BUCKET || process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || ''
  )
);

if (!serviceAccountPath && !serviceAccountJsonRaw) {
  throw new Error(
    'Missing service account. Pass --service-account="path/to/key.json" OR --service-account-json=\'{"..."}\' OR set GOOGLE_APPLICATION_CREDENTIALS/FIREBASE_SERVICE_ACCOUNT_PATH/FIREBASE_SERVICE_ACCOUNT_JSON.'
  );
}

if (!bucketName) {
  throw new Error(
    'Missing bucket name. Pass --bucket="your-bucket.appspot.com" or set FIREBASE_STORAGE_BUCKET.'
  );
}

if (!Number.isFinite(days) || days <= 0) {
  throw new Error('Invalid --days value. Use a positive number, e.g. --days=7');
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
  serviceAccount = JSON.parse(fs.readFileSync(resolvedServiceAccountPath, 'utf8'));
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: bucketName
});

const db = admin.firestore();
const bucket = admin.storage().bucket();
const cutoffMs = Date.now() - days * 24 * 60 * 60 * 1000;

const removeFromFirestore = async (fullPath) => {
  if (!fullPath.startsWith('files/')) {
    return;
  }

  const pathWithoutRoot = fullPath.slice('files/'.length);
  const firstSlash = pathWithoutRoot.indexOf('/');
  if (firstSlash === -1) {
    return;
  }

  const domainName = pathWithoutRoot.slice(0, firstSlash);
  const fileName = pathWithoutRoot.slice(firstSlash + 1);
  if (!domainName || !fileName) {
    return;
  }

  const docRef = db.collection('documents').doc(domainName);
  const docSnap = await docRef.get();
  if (!docSnap.exists) {
    return;
  }

  const data = docSnap.data() || {};
  const files = Array.isArray(data.files) ? data.files : [];
  const encodedPath = encodeURIComponent(fullPath);

  const updatedFiles = files.filter((file) => {
    const storedName = file?.name || file?.fileName;
    const nameMatches = storedName === fileName;
    const urlMatches = typeof file?.url === 'string' && file.url.includes(encodedPath);
    return !(nameMatches || urlMatches);
  });

  if (updatedFiles.length !== files.length && !dryRun) {
    await docRef.set({ ...data, files: updatedFiles }, { merge: true });
  }
};

const run = async () => {
  let scanned = 0;
  let deleted = 0;
  let failed = 0;
  let pageToken = undefined;

  console.log(`Starting cleanup`);
  console.log(`Bucket: ${bucketName}`);
  console.log(`Prefix: ${prefix}`);
  console.log(`Delete older than: ${days} day(s)`);
  console.log(`Mode: ${dryRun ? 'DRY RUN (no deletes)' : 'LIVE DELETE'}`);

  do {
    const [files, , response] = await bucket.getFiles({
      prefix,
      autoPaginate: false,
      pageToken,
      maxResults: 1000
    });

    for (const file of files) {
      if (file.name.endsWith('/')) {
        continue;
      }

      scanned++;
      try {
        const [metadata] = await file.getMetadata();
        const timestamp = metadata.updated || metadata.timeCreated;
        const fileTimeMs = timestamp ? new Date(timestamp).getTime() : NaN;

        if (Number.isNaN(fileTimeMs) || fileTimeMs >= cutoffMs) {
          continue;
        }

        console.log(`${dryRun ? '[DRY RUN] ' : ''}Delete -> ${file.name} (${timestamp})`);
        if (!dryRun) {
          await file.delete();
          await removeFromFirestore(file.name);
        }
        deleted++;
      } catch (error) {
        failed++;
        console.error(`Failed -> ${file.name}`, error?.message || error);
      }
    }

    pageToken = response.nextPageToken;
  } while (pageToken);

  console.log('Cleanup finished');
  console.log(`Scanned: ${scanned}`);
  console.log(`Matched & deleted: ${deleted}`);
  console.log(`Failed: ${failed}`);
};

run().catch((error) => {
  console.error('Fatal cleanup error:', error);
  process.exitCode = 1;
});
