const DOWNLOAD_FRAME_ID = "nologin-download-frame";

function ensureDownloadFrame() {
  let frame = document.getElementById(DOWNLOAD_FRAME_ID);
  if (!frame) {
    frame = document.createElement("iframe");
    frame.id = DOWNLOAD_FRAME_ID;
    frame.name = DOWNLOAD_FRAME_ID;
    frame.style.display = "none";
    frame.setAttribute("aria-hidden", "true");
    document.body.appendChild(frame);
  }
  return frame;
}

function buildDownloadUrl(domainName, fileName) {
  const params = new URLSearchParams({
    domain: domainName,
    file: fileName,
  });
  return `/api/download?${params.toString()}`;
}

export function downloadStorageFile(domainName, fileName, onError) {
  ensureDownloadFrame();

  const form = document.createElement("form");
  form.method = "GET";
  form.action = "/api/download";
  form.target = DOWNLOAD_FRAME_ID;
  form.style.display = "none";

  const domainInput = document.createElement("input");
  domainInput.type = "hidden";
  domainInput.name = "domain";
  domainInput.value = domainName;
  form.appendChild(domainInput);

  const fileInput = document.createElement("input");
  fileInput.type = "hidden";
  fileInput.name = "file";
  fileInput.value = fileName;
  form.appendChild(fileInput);

  document.body.appendChild(form);
  form.submit();
  form.remove();

  window.setTimeout(async () => {
    try {
      const response = await fetch(buildDownloadUrl(domainName, fileName), { method: "HEAD" });
      if (!response.ok) {
        onError?.();
      }
    } catch {
      onError?.();
    }
  }, 2000);
}
