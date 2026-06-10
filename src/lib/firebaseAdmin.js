import admin from "firebase-admin";
import fs from "node:fs";
import path from "node:path";

let adminApp;

function readServiceAccountFromPath(filePath) {
  if (!filePath) {
    return null;
  }

  try {
    const resolvedPath = path.resolve(filePath);
    if (!fs.existsSync(resolvedPath)) {
      return null;
    }

    return JSON.parse(fs.readFileSync(resolvedPath, "utf8"));
  } catch {
    return null;
  }
}

function parseServiceAccount() {
  const jsonRaw =
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON ||
    process.env.REACT_APP_FIREBASE_SERVICE_ACCOUNT_JSON ||
    "";

  if (jsonRaw) {
    try {
      return JSON.parse(jsonRaw);
    } catch {
      return null;
    }
  }

  const filePath =
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    "";

  return readServiceAccountFromPath(filePath);
}

export function getFirebaseAdminApp() {
  if (adminApp) {
    return adminApp;
  }

  const serviceAccount = parseServiceAccount();
  const storageBucket =
    process.env.FIREBASE_STORAGE_BUCKET ||
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;

  if (!serviceAccount || !storageBucket) {
    return null;
  }

  const existing = admin.apps.find((app) => app.name === "nologin-admin");
  adminApp =
    existing ||
    admin.initializeApp(
      {
        credential: admin.credential.cert(serviceAccount),
        storageBucket,
      },
      "nologin-admin",
    );

  return adminApp;
}

export function getFirebaseAdminBucket() {
  const app = getFirebaseAdminApp();
  if (!app) {
    return null;
  }

  return admin.storage(app).bucket();
}

export function getFirebaseAdminFirestore() {
  const app = getFirebaseAdminApp();
  if (!app) {
    return null;
  }

  return admin.firestore(app);
}
