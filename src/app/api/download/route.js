import { getFirebaseAdminBucket } from "@/lib/firebaseAdmin";

const FILE_NAME_PATTERN = /^[^/\\]+$/;

function sanitizeContentDispositionFileName(fileName) {
  return fileName.replace(/["\r\n]/g, "_");
}

function parseDownloadRequest(request) {
  const domain = request.nextUrl.searchParams.get("domain")?.trim().toLowerCase();
  const file = request.nextUrl.searchParams.get("file")?.trim();

  if (!domain || !file) {
    return { error: Response.json({ error: "Missing domain or file." }, { status: 400 }) };
  }

  if (
    domain.includes("..") ||
    domain.includes("/") ||
    domain.includes("\\") ||
    !FILE_NAME_PATTERN.test(file) ||
    file.includes("..")
  ) {
    return { error: Response.json({ error: "Invalid domain or file name." }, { status: 400 }) };
  }

  const bucket = getFirebaseAdminBucket();
  if (!bucket) {
    return { error: Response.json({ error: "Download service is not configured." }, { status: 503 }) };
  }

  return { domain, file, bucket };
}

async function resolveStorageFile(bucket, domain, file) {
  const storagePath = `files/${domain}/${file}`;
  const fileRef = bucket.file(storagePath);
  const [exists] = await fileRef.exists();

  if (!exists) {
    return { error: Response.json({ error: "File not found." }, { status: 404 }) };
  }

  const [metadata] = await fileRef.getMetadata();
  return { fileRef, metadata, storagePath };
}

export async function HEAD(request) {
  const parsed = parseDownloadRequest(request);
  if (parsed.error) {
    return parsed.error;
  }

  const resolved = await resolveStorageFile(parsed.bucket, parsed.domain, parsed.file);
  if (resolved.error) {
    return resolved.error;
  }

  return new Response(null, {
    status: 200,
    headers: {
      "Content-Type": resolved.metadata.contentType || "application/octet-stream",
      "Cache-Control": "private, no-store",
    },
  });
}

export async function GET(request) {
  const parsed = parseDownloadRequest(request);
  if (parsed.error) {
    return parsed.error;
  }

  const resolved = await resolveStorageFile(parsed.bucket, parsed.domain, parsed.file);
  if (resolved.error) {
    return resolved.error;
  }

  const { fileRef, metadata } = resolved;
  const safeFileName = sanitizeContentDispositionFileName(parsed.file);
  const encodedFileName = encodeURIComponent(parsed.file);
  const [buffer] = await fileRef.download();

  return new Response(buffer, {
    headers: {
      "Content-Type": metadata.contentType || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${safeFileName}"; filename*=UTF-8''${encodedFileName}`,
      "Content-Length": String(buffer.length),
      "Cache-Control": "private, no-store",
    },
  });
}
