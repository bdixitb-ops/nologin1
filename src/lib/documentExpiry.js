import { collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

export const EXPIRATION_OPTIONS = ["1 hr", "3 hrs", "5 hrs", "10 hrs", "24 hrs", "48 hrs", "2 days", "4 days", "7 days"];

export const EXPIRATION_MS = {
  "1 hr": 1 * 60 * 60 * 1000,
  "3 hrs": 3 * 60 * 60 * 1000,
  "5 hrs": 5 * 60 * 60 * 1000,
  "10 hrs": 10 * 60 * 60 * 1000,
  "24 hrs": 24 * 60 * 60 * 1000,
  "48 hrs": 48 * 60 * 60 * 1000,
  "2 days": 2 * 24 * 60 * 60 * 1000,
  "4 days": 4 * 24 * 60 * 60 * 1000,
  "7 days": 7 * 24 * 60 * 60 * 1000,
};

export function expirationTimestampForLabel(label) {
  return Date.now() + (EXPIRATION_MS[label] ?? EXPIRATION_MS["48 hrs"]);
}

export function labelFromExpirationTimestamp(timestamp) {
  if (!timestamp) {
    return "48 hrs";
  }
  const remaining = timestamp - Date.now();
  if (remaining <= 0) {
    return "48 hrs";
  }

  let bestLabel = "48 hrs";
  let bestDiff = Infinity;
  for (const [label, ms] of Object.entries(EXPIRATION_MS)) {
    const diff = Math.abs(remaining - ms);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestLabel = label;
    }
  }
  return bestLabel;
}

export function isDocumentExpired(data, now = Date.now()) {
  const expirationTimestamp = data?.expirationTimestamp;
  return Boolean(expirationTimestamp && expirationTimestamp <= now);
}

export function storagePathFromDownloadUrl(url) {
  if (!url || typeof url !== "string") {
    return null;
  }

  try {
    const parsed = new URL(url);
    const objectMatch = parsed.pathname.match(/\/o\/(.+)$/);
    if (objectMatch?.[1]) {
      return decodeURIComponent(objectMatch[1]);
    }
  } catch {
    // Fall through to regex parsing for non-standard URLs.
  }

  const fallbackMatch = url.match(/\/o\/([^?]+)/);
  return fallbackMatch?.[1] ? decodeURIComponent(fallbackMatch[1]) : null;
}

export async function deleteFileFromStorage(storage, domain, file) {
  const fileName = file?.name || file?.fileName;
  if (!fileName) {
    return;
  }

  if (typeof window !== "undefined") {
    const params = new URLSearchParams({ domain, file: fileName });
    const response = await fetch(`/api/upload?${params.toString()}`, { method: "DELETE" });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || "Could not delete file.");
    }
    return;
  }

  const candidates = new Set();
  const storagePath = storagePathFromDownloadUrl(file?.url);
  if (storagePath) {
    candidates.add(storagePath);
  }
  candidates.add(`files/${domain}/${fileName}`);

  for (const path of candidates) {
    try {
      await deleteObject(ref(storage, path));
      return;
    } catch (error) {
      if (
        error?.code === "storage/object-not-found" ||
        error?.code === "storage/retry-limit-exceeded" ||
        error?.code === "storage/unauthorized" ||
        error?.code === "storage/unauthenticated"
      ) {
        return;
      }
    }
  }
}

export async function deleteExpiredDocument(storage, firestore, domainName) {
  const docRef = doc(firestore, "documents", domainName);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return false;
  }

  const data = docSnap.data();
  if (!isDocumentExpired(data)) {
    return false;
  }

  const allFiles = data.files || [];
  for (const file of allFiles) {
    try {
      await deleteFileFromStorage(storage, domainName, file);
    } catch {
      // Keep cleanup best effort.
    }
  }

  await deleteDoc(docRef);
  return true;
}

export async function cleanupAllExpiredDocuments(storage, firestore) {
  const currentTime = Date.now();
  const q = query(collection(firestore, "documents"), where("expirationTimestamp", "<=", currentTime));
  const querySnapshot = await getDocs(q);

  for (const docSnap of querySnapshot.docs) {
    const currentDomain = docSnap.id;
    const data = docSnap.data();
    const files = data.files || [];

    for (const file of files) {
      try {
        await deleteFileFromStorage(storage, currentDomain, file);
      } catch {
        // Keep cleanup best effort.
      }
    }

    await deleteDoc(doc(firestore, "documents", currentDomain));
  }
}
