import { getFirebaseAdminBucket, getFirebaseAdminFirestore } from "@/lib/firebaseAdmin";
import {
  buildStoragePath,
  getDocumentData,
  validateDomainName,
  validateFileName,
  verifyLockPassword,
} from "@/lib/uploadValidation";

export async function DELETE(request) {
  const bucket = getFirebaseAdminBucket();
  const firestore = getFirebaseAdminFirestore();
  if (!bucket || !firestore) {
    return Response.json({ error: "Upload service is not configured." }, { status: 503 });
  }

  const domainResult = validateDomainName(request.nextUrl.searchParams.get("domain"));
  if (!domainResult.ok) {
    return Response.json({ error: domainResult.error }, { status: 400 });
  }

  const fileNameResult = validateFileName(request.nextUrl.searchParams.get("file"));
  if (!fileNameResult.ok) {
    return Response.json({ error: fileNameResult.error }, { status: 400 });
  }

  const lockPassword = request.nextUrl.searchParams.get("lockPassword") || "";
  const doc = await getDocumentData(firestore, domainResult.domain);
  if (!doc) {
    return Response.json({ error: "Page not found." }, { status: 404 });
  }

  const isExpired = Boolean(doc.expirationTimestamp && doc.expirationTimestamp <= Date.now());
  if (!isExpired) {
    const lockCheck = await verifyLockPassword(doc, lockPassword);
    if (!lockCheck.ok) {
      return Response.json({ error: lockCheck.error }, { status: lockCheck.status });
    }
  }

  const storagePath = buildStoragePath(domainResult.domain, fileNameResult.fileName);
  await bucket.file(storagePath).delete({ ignoreNotFound: true });

  return Response.json({ ok: true });
}
