import {
  authorizeUpload,
  createSignedUploadUrl,
  enforcePrepareRateLimits,
  getUploadServices,
  validatePrepareRequest,
} from "@/lib/uploadServer";
import { buildStoragePath } from "@/lib/uploadValidation";

export async function POST(request) {
  const services = getUploadServices();
  if (services.error) return services.error;

  const { bucket, firestore } = services;
  const body = await request.json().catch(() => ({}));
  const parsed = await validatePrepareRequest(body);
  if (parsed.error) return parsed.error;

  const rateLimited = enforcePrepareRateLimits(request, parsed.domain);
  if (rateLimited) return rateLimited;

  const authorized = await authorizeUpload(bucket, firestore, {
    domain: parsed.domain,
    fileName: parsed.fileName,
    fileSize: parsed.fileSize,
    lockPassword: parsed.lockPassword,
  });
  if (authorized.error) return authorized.error;

  const storagePath = buildStoragePath(parsed.domain, parsed.fileName);
  const signed = await createSignedUploadUrl(bucket, storagePath, parsed.contentType, parsed.fileSize);

  return Response.json({
    uploadUrl: signed.uploadUrl,
    storagePath: signed.storagePath,
    domain: parsed.domain,
    fileName: parsed.fileName,
    maxBytes: signed.maxBytes,
  });
}
