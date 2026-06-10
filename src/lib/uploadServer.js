import { getFirebaseAdminBucket, getFirebaseAdminFirestore } from "@/lib/firebaseAdmin";
import { getRequestIp } from "@/lib/requestIp";
import { rateLimit } from "@/lib/rateLimit";
import { MAX_FILE_SIZE_BYTES, RATE_LIMITS, SIGNED_UPLOAD_TTL_MS } from "@/lib/uploadLimits";
import {
  assertUploadAllowed,
  buildStoragePath,
  validateDomainName,
  validateFileName,
  validateFileSize,
  verifyLockPassword,
} from "@/lib/uploadValidation";
export function getUploadServices() {
  const bucket = getFirebaseAdminBucket();
  const firestore = getFirebaseAdminFirestore();
  if (!bucket || !firestore) {
    return { error: Response.json({ error: "Upload service is not configured." }, { status: 503 }) };
  }
  return { bucket, firestore };
}

export function enforcePrepareRateLimits(request, domain) {
  const ip = getRequestIp(request);
  const hourMs = 60 * 60 * 1000;
  const dayMs = 24 * hourMs;

  const checks = [
    rateLimit(`upload:ip:hour:${ip}`, { limit: RATE_LIMITS.preparePerIpHour, windowMs: hourMs }),
    rateLimit(`upload:ip:day:${ip}`, { limit: RATE_LIMITS.preparePerIpDay, windowMs: dayMs }),
    rateLimit(`upload:domain:hour:${domain}`, {
      limit: RATE_LIMITS.preparePerDomainHour,
      windowMs: hourMs,
    }),
  ];

  const blocked = checks.find((check) => !check.allowed);
  if (blocked) {
    return Response.json(
      { error: "Too many upload attempts. Please wait and try again." },
      {
        status: 429,
        headers: blocked.retryAfterMs
          ? { "Retry-After": String(Math.ceil(blocked.retryAfterMs / 1000)) }
          : undefined,
      },
    );
  }

  return null;
}

export async function createSignedUploadUrl(bucket, storagePath, contentType, fileSize) {
  const fileRef = bucket.file(storagePath);
  const [uploadUrl] = await fileRef.getSignedUrl({
    version: "v4",
    action: "write",
    expires: Date.now() + SIGNED_UPLOAD_TTL_MS,
    contentType: contentType || "application/octet-stream",
    extensionHeaders: {
      "x-goog-content-length-range": `1,${MAX_FILE_SIZE_BYTES}`,
    },
  });

  return { uploadUrl, storagePath, maxBytes: fileSize };
}

export async function validatePrepareRequest(body) {
  const domainResult = validateDomainName(body?.domain);
  if (!domainResult.ok) {
    return { error: Response.json({ error: domainResult.error }, { status: 400 }) };
  }

  const fileNameResult = validateFileName(body?.fileName);
  if (!fileNameResult.ok) {
    return { error: Response.json({ error: fileNameResult.error }, { status: 400 }) };
  }

  const sizeResult = validateFileSize(body?.fileSize);
  if (!sizeResult.ok) {
    return { error: Response.json({ error: sizeResult.error }, { status: 400 }) };
  }

  return {
    domain: domainResult.domain,
    fileName: fileNameResult.fileName,
    fileSize: sizeResult.fileSize,
    contentType: String(body?.contentType || "application/octet-stream").slice(0, 120),
    lockPassword: body?.lockPassword,
  };
}

export async function authorizeUpload(bucket, firestore, { domain, fileName, fileSize, lockPassword }) {
  const incomingBytes = Number(fileSize) > 0 ? Number(fileSize) : 1;
  const allowed = await assertUploadAllowed(bucket, firestore, domain, fileName, incomingBytes);
  if (!allowed.ok) {
    return { error: Response.json({ error: allowed.error }, { status: allowed.status }) };
  }

  const lockCheck = await verifyLockPassword(allowed.doc, lockPassword);
  if (!lockCheck.ok) {
    return { error: Response.json({ error: lockCheck.error }, { status: lockCheck.status }) };
  }

  return { allowed };
}

export async function readUploadedFileMetadata(bucket, domain, fileName) {
  const storagePath = buildStoragePath(domain, fileName);
  const fileRef = bucket.file(storagePath);
  const [exists] = await fileRef.exists();
  if (!exists) {
    return { error: Response.json({ error: "Uploaded file not found." }, { status: 404 }) };
  }

  const [metadata] = await fileRef.getMetadata();
  const sizeBytes = Number(metadata.size || 0);
  if (!Number.isFinite(sizeBytes) || sizeBytes <= 0 || sizeBytes > MAX_FILE_SIZE_BYTES) {
    await fileRef.delete({ ignoreNotFound: true });
    return { error: Response.json({ error: "Uploaded file exceeds the 100MB limit." }, { status: 400 }) };
  }

  return { fileRef, metadata, storagePath, sizeBytes };
}
