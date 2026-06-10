import bcrypt from "bcryptjs";
import {
  DOMAIN_NAME_PATTERN,
  FILE_NAME_PATTERN,
  MAX_FILE_NAME_LENGTH,
  MAX_DOMAIN_STORAGE_BYTES,
  MAX_DOMAIN_STORAGE_MB,
  MAX_FILE_SIZE_BYTES,
  MAX_FILES_PER_DOMAIN,
} from "@/lib/uploadLimits";

export function normalizeDomain(domain) {
  return String(domain || "")
    .trim()
    .toLowerCase();
}

export function validateDomainName(domain) {
  const normalized = normalizeDomain(domain);
  if (!normalized || normalized.length < 2 || normalized.length > 64) {
    return { ok: false, error: "Invalid page name." };
  }
  if (!DOMAIN_NAME_PATTERN.test(normalized)) {
    return { ok: false, error: "Invalid page name." };
  }
  return { ok: true, domain: normalized };
}

export function validateFileName(fileName) {
  const name = String(fileName || "").trim();
  if (!name || name.length > MAX_FILE_NAME_LENGTH) {
    return { ok: false, error: "Invalid file name." };
  }
  if (!FILE_NAME_PATTERN.test(name) || name.includes("..")) {
    return { ok: false, error: "Invalid file name." };
  }
  return { ok: true, fileName: name };
}

export function validateFileSize(fileSize) {
  const size = Number(fileSize);
  if (!Number.isFinite(size) || size <= 0) {
    return { ok: false, error: "Invalid file size." };
  }
  if (size > MAX_FILE_SIZE_BYTES) {
    return { ok: false, error: "File exceeds the 100MB limit." };
  }
  return { ok: true, fileSize: size };
}

export function buildStoragePath(domain, fileName) {
  return `files/${domain}/${fileName}`;
}

/** @param {import("firebase-admin/firestore").Firestore} firestore */
export async function getDocumentData(firestore, domain) {
  const snap = await firestore.collection("documents").doc(domain).get();
  if (!snap.exists) {
    return null;
  }
  return snap.data();
}

/** @param {import("@google-cloud/storage").Bucket} bucket */
export async function getDomainStorageUsage(bucket, domain) {
  const prefix = `files/${domain}/`;
  const files = [];
  let totalBytes = 0;
  let pageToken;

  do {
    const [batch, , response] = await bucket.getFiles({
      prefix,
      autoPaginate: false,
      maxResults: 1000,
      pageToken,
    });

    for (const file of batch) {
      if (file.name.endsWith("/")) {
        continue;
      }

      const [metadata] = await file.getMetadata();
      const sizeBytes = Number(metadata.size || 0);
      totalBytes += sizeBytes;
      files.push({
        name: file.name.slice(prefix.length),
        sizeBytes,
      });
    }

    pageToken = response.nextPageToken;
  } while (pageToken);

  return { totalBytes, files, fileCount: files.length };
}

/** @param {import("@google-cloud/storage").Bucket} bucket */
export async function listDomainStorageFiles(bucket, domain) {
  const usage = await getDomainStorageUsage(bucket, domain);
  return usage.files.map((file) => file.name);
}

/** @param {import("@google-cloud/storage").Bucket} bucket */
export function assertDomainStorageQuota(usage, fileName, incomingBytes) {
  const existing = usage.files.find((file) => file.name === fileName);
  const projectedTotal = usage.totalBytes - (existing?.sizeBytes || 0) + incomingBytes;

  if (projectedTotal > MAX_DOMAIN_STORAGE_BYTES) {
    return {
      ok: false,
      status: 409,
      error: `This page has a ${MAX_DOMAIN_STORAGE_MB}MB total storage limit. Delete files or upload a smaller file.`,
    };
  }

  return { ok: true, projectedTotal };
}

/** @param {import("@google-cloud/storage").Bucket} bucket */
export async function assertUploadAllowed(bucket, firestore, domain, fileName, incomingBytes) {
  const doc = await getDocumentData(firestore, domain);
  if (!doc) {
    return { ok: false, status: 404, error: "Page does not exist. Create it from the home page first." };
  }

  const usage = await getDomainStorageUsage(bucket, domain);
  const existing = usage.files.find((file) => file.name === fileName);

  if (!existing && usage.fileCount >= MAX_FILES_PER_DOMAIN) {
    return {
      ok: false,
      status: 409,
      error: `This page already has ${MAX_FILES_PER_DOMAIN} files. Delete one before uploading.`,
    };
  }

  const quota = assertDomainStorageQuota(usage, fileName, incomingBytes);
  if (!quota.ok) {
    return quota;
  }

  return {
    ok: true,
    doc,
    exists: Boolean(existing),
    storedCount: usage.fileCount,
    usage,
  };
}

export async function verifyLockPassword(doc, lockPassword) {
  if (!doc?.isLocked) {
    return { ok: true };
  }

  const provided = String(lockPassword || "").trim();
  if (!provided) {
    return { ok: false, status: 403, error: "This page is locked. Enter the edit-lock password to upload." };
  }

  const stored = String(doc.lockPassword || "");
  const matches = stored.startsWith("$2")
    ? await bcrypt.compare(provided, stored)
    : provided === stored;

  if (!matches) {
    return { ok: false, status: 403, error: "Incorrect edit-lock password." };
  }

  return { ok: true };
}
