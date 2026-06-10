export async function prepareUpload({ domain, fileName, fileSize, contentType, lockPassword }) {
  const response = await fetch("/api/upload/prepare", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ domain, fileName, fileSize, contentType, lockPassword }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Upload not allowed.");
  }
  return data;
}

export async function uploadFileToSignedUrl(uploadUrl, file) {
  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type || "application/octet-stream",
    },
    body: file,
  });

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
