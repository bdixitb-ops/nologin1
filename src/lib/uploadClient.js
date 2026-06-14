export async function prepareUpload({ domain, fileName, fileSize, contentType, lockPassword }) {
  let response;
  try {
    response = await fetch("/api/upload/prepare", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain, fileName, fileSize, contentType, lockPassword }),
    });
  } catch {
    throw new Error("Upload service unreachable. Check your connection and try again.");
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Upload not allowed.");
  }
  return data;
}

export async function uploadFileToSignedUrl(uploadUrl, file, { contentType, contentLengthRange }) {
  const resolvedType = contentType || file.type || "application/octet-stream";
  let response;
  try {
    response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": resolvedType,
        "x-goog-content-length-range": contentLengthRange,
      },
      body: file,
    });
  } catch {
    throw new Error(
      "Could not upload file to storage. If this keeps happening, storage CORS may need to be configured.",
    );
  }

  if (!response.ok) {
    throw new Error("Upload to storage failed.");
  }
}

export async function completeUpload({ domain, fileName, lockPassword }) {
  const response = await fetch("/api/upload/complete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ domain, fileName, lockPassword }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Could not finalize upload.");
  }
  return data.file;
}

export async function deleteUploadedFile(domain, fileName, lockPassword = "") {
  const params = new URLSearchParams({ domain, file: fileName });
  if (lockPassword) {
    params.set("lockPassword", lockPassword);
  }
  const response = await fetch(`/api/upload?${params.toString()}`, { method: "DELETE" });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Could not delete file.");
  }
}
