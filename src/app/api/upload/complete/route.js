import { MAX_DOMAIN_STORAGE_BYTES, MAX_DOMAIN_STORAGE_MB, MAX_FILES_PER_DOMAIN } from "@/lib/uploadLimits";
import {
  authorizeUpload,
  getUploadServices,
  readUploadedFileMetadata,
} from "@/lib/uploadServer";
import { getDomainStorageUsage, validateDomainName, validateFileName } from "@/lib/uploadValidation";

export async function POST(request) {
  const services = getUploadServices();
  if (services.error) return services.error;

  const { bucket, firestore } = services;
  const body = await request.json().catch(() => ({}));

  const domainResult = validateDomainName(body?.domain);
  if (!domainResult.ok) {
    return Response.json({ error: domainResult.error }, { status: 400 });
  }

  const fileNameResult = validateFileName(body?.fileName);
  if (!fileNameResult.ok) {
    return Response.json({ error: fileNameResult.error }, { status: 400 });
  }

  const parsed = {
    domain: domainResult.domain,
    fileName: fileNameResult.fileName,
    lockPassword: body?.lockPassword,
  };

  const authorized = await authorizeUpload(bucket, firestore, {
    ...parsed,
    fileSize: 1,
  });
  if (authorized.error) return authorized.error;

  const uploaded = await readUploadedFileMetadata(bucket, parsed.domain, parsed.fileName);
  if (uploaded.error) return uploaded.error;

  const usage = await getDomainStorageUsage(bucket, parsed.domain);
  if (usage.fileCount > MAX_FILES_PER_DOMAIN) {
    await uploaded.fileRef.delete({ ignoreNotFound: true });
    return Response.json(
      {
        error: `This page already has ${MAX_FILES_PER_DOMAIN} files. Delete one before uploading.`,
      },
      { status: 409 },
    );
  }

  if (usage.totalBytes > MAX_DOMAIN_STORAGE_BYTES) {
    await uploaded.fileRef.delete({ ignoreNotFound: true });
    return Response.json(
      {
        error: `This page has a ${MAX_DOMAIN_STORAGE_MB}MB total storage limit. Delete files or upload a smaller file.`,
      },
      { status: 409 },
    );
  }

  const downloadPath = `/api/download?domain=${encodeURIComponent(parsed.domain)}&file=${encodeURIComponent(parsed.fileName)}`;

  return Response.json({
    file: {
      name: parsed.fileName,
      url: downloadPath,
      uploadedAt: Date.now(),
      sizeBytes: uploaded.sizeBytes,
      contentType: uploaded.metadata.contentType || "application/octet-stream",
    },
  });
}
