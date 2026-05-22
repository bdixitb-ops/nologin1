"use client";

import { firestore, storage } from "@/lib/firebase";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LockIcon from "@mui/icons-material/Lock";
import { TextField } from "@mui/material";
import bcrypt from "bcryptjs";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function TextEditor({ domainName }) {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [isProtected, setIsProtected] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [lockPassword, setLockPassword] = useState("");
  const [lockPasswordInput, setLockPasswordInput] = useState("");
  const [sessionEditable, setSessionEditable] = useState(false);
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [isUnlockPrompt, setIsUnlockPrompt] = useState(false);
  const fileInputRef = useRef();
  const router = useRouter();

  const deleteFileFromStorage = useCallback(async (domain, file) => {
    const fileName = file?.name || file?.fileName;
    const candidates = [];
    if (file?.url) candidates.push(() => ref(storage, file.url));
    if (fileName) candidates.push(() => ref(storage, `files/${domain}/${fileName}`));

    let lastError = null;
    for (const buildRef of candidates) {
      try {
        await deleteObject(buildRef());
        return;
      } catch (error) {
        if (error?.code === "storage/object-not-found") return;
        lastError = error;
      }
    }

    if (lastError) throw lastError;
  }, []);

  const checkAndHandleExpiration = useCallback(async () => {
    try {
      const docRef = doc(firestore, "documents", domainName);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const currentTime = Date.now();
        const expirationTimestamp = data.expirationTimestamp;

        if (expirationTimestamp && expirationTimestamp <= currentTime) {
          const allFiles = data.files || [];
          for (const file of allFiles) {
            try {
              await deleteFileFromStorage(domainName, file);
            } catch {
              // Keep cleanup best effort.
            }
          }

          await deleteDoc(docRef);
          toast.warn("This domain has expired and has been automatically deleted.");
          setText("");
          setFiles([]);
          setIsProtected(false);
          setIsLocked(false);
          setTimeout(() => router.push("/"), 2000);
          return true;
        }
      }
      return false;
    } catch {
      return false;
    }
  }, [deleteFileFromStorage, domainName, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(firestore, "documents", domainName);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const expired = await checkAndHandleExpiration();
          if (expired) return;
          setIsProtected(data.passwordSet);
          setIsLocked(data.isLocked || false);
          setLockPassword(data.lockPassword || "");
          setFiles(data.files || []);
          if (!data.passwordSet) setText(data.text || "");
        }
      } catch {
        // Ignore noisy transient failures.
      }
    };

    fetchData();
    const expirationCheckInterval = setInterval(() => checkAndHandleExpiration(), 30000);
    return () => clearInterval(expirationCheckInterval);
  }, [domainName, checkAndHandleExpiration]);

  const handlePasswordSubmit = async () => {
    try {
      const docRef = doc(firestore, "documents", domainName);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const isPasswordCorrect = await bcrypt.compare(inputPassword, data.password);
        if (isPasswordCorrect) {
          setText(data.text || "");
          setIsAuthenticated(true);
          toast.success("Password verified!");
        } else {
          toast.error("Incorrect password.");
        }
      }
    } catch {
      toast.error("Error verifying password.");
    }
  };

  const handleSave = async () => {
    try {
      if (isLocked && !sessionEditable) {
        toast.error("This domain is locked. Unlock the domain to save changes.");
        return;
      }
      const docRef = doc(firestore, "documents", domainName);
      const docSnap = await getDoc(docRef);
      const existingData = docSnap.exists() ? docSnap.data() : {};

      const filesWithTimestamps = files.map((file) =>
        file.uploadedAt ? file : { ...file, uploadedAt: Date.now() },
      );

      await setDoc(docRef, {
        ...existingData,
        text,
        files: filesWithTimestamps,
        createdAt: existingData.createdAt || Date.now(),
        expirationTimestamp: existingData.expirationTimestamp,
      });
      toast.success("Document successfully saved!");
    } catch {
      toast.error("Error saving document.");
    }
  };

  const handleLock = async () => {
    if (!isLocked) {
      if (!lockPasswordInput) {
        toast.error("Password is required to lock the domain.");
        return;
      }
      const hashedPassword = bcrypt.hashSync(lockPasswordInput, 10);
      setIsLocked(true);
      setSessionEditable(true);
      const docRef = doc(firestore, "documents", domainName);
      const docSnap = await getDoc(docRef);
      const existingData = docSnap.exists() ? docSnap.data() : {};
      await setDoc(docRef, { ...existingData, text, files, isLocked: true, lockPassword: hashedPassword });
      setLockPasswordInput("");
      setIsLockModalOpen(false);
      toast.success("Domain locked and saved successfully!");
    } else {
      if (bcrypt.compareSync(lockPasswordInput, lockPassword)) {
        setSessionEditable(true);
        setIsUnlockModalOpen(false);
        toast.success("Domain unlocked for this session.");
      } else {
        toast.error("Incorrect password.");
      }
    }
  };

  const handleUnlock = async () => {
    setIsUnlockPrompt(false);
    setIsLocked(false);
    setLockPassword("");
    setSessionEditable(false);
    const docRef = doc(firestore, "documents", domainName);
    const docSnap = await getDoc(docRef);
    const existingData = docSnap.exists() ? docSnap.data() : {};
    await setDoc(docRef, { ...existingData, text, files, isLocked: false, lockPassword: "" });
    toast.success("Domain unlocked for public editing and saved.");
  };

  const handleFileChange = async (e) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const maxFiles = 5;
    const maxFileSizeBytes = 200 * 1024 * 1024;

    if (isLocked && !sessionEditable) {
      toast.error("This domain is locked. Unlock the upload files");
      return;
    }
    if (file.size > maxFileSizeBytes) {
      toast.error("File size exceeds the 200MB limit. Please upload a smaller file.");
      return;
    }
    if (files.length >= maxFiles) {
      toast.error("You can only upload up to 5 files per domain.");
      return;
    }

    setIsUploading(true);
    try {
      const fileRef = ref(storage, `files/${domainName}/${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      setFiles([...files, { name: file.name, url, uploadedAt: Date.now() }]);
      toast.success("File uploaded successfully!");
    } catch {
      toast.error("Error uploading file.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteFile = async (file) => {
    try {
      await deleteFileFromStorage(domainName, file);
      const updatedFiles = files.filter((f) => f.name !== file.name);
      setFiles(updatedFiles);

      const docRef = doc(firestore, "documents", domainName);
      const existingData = (await getDoc(docRef)).data();
      await setDoc(docRef, { ...existingData, files: updatedFiles });
      toast.success("File deleted successfully!");
    } catch {
      toast.error("Error deleting file.");
    } finally {
      setFileToDelete(null);
    }
  };

  const handleText = (value) => {
    if (!isLocked || sessionEditable) {
      setText(value);
    } else {
      toast.error("This domain is locked. Unlock the domain to edit.");
    }
  };

  return (
    <div className="editor-container">
      <ToastContainer />
      {!isAuthenticated && isProtected ? (
        <div className="password-protected-container">
          <div className="password-card">
            <h2 className="password-title">🔒 Secure Document</h2>
            <p className="password-description">
              This document is password-protected. Please enter your password to unlock access.
            </p>
            <div className="password-input-container">
              <input
                type="password"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
                placeholder="Enter Password"
                className="password-input-field"
              />
              <button onClick={handlePasswordSubmit} className="unlock-button">
                Unlock
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="entire-screen">
          <div className="everything-except-save">
            <div className="split-screen">
              <div className="text-section">
                <div className="text-area-wrapper">
                  <div className="top-line">
                    Build & launch projects in minutes→{" "}
                    <a href="https://www.oneport.co.in/" target="_blank" rel="noopener noreferrer">
                      oneport
                    </a>
                  </div>
                  <div className="line-separator"></div>
                  <textarea
                    value={text}
                    placeholder="Enter text and hit save button"
                    onChange={(e) => handleText(e.target.value)}
                    className="inner-text-area"
                  />
                </div>

                <div className="copy-button" onClick={() => navigator.clipboard.writeText(text)}>
                  <ContentCopyIcon />
                </div>
              </div>

              <div className="upload-section">
                <div className="top-strip">
                  <span>Follow us on</span>
                  <a href="https://www.instagram.com/nologin.in" target="_blank" rel="noopener noreferrer">
                    <InstagramIcon className="social-icon" />
                  </a>
                  <a href="https://www.linkedin.com/company/nologin-in/" target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon className="social-icon" />
                  </a>
                </div>
                <div className="line-separator"></div>

                <div className={`file-upload ${files.length > 0 ? "has-files" : ""}`}>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />

                  {files.length > 0 && (
                    <div className="uploaded-files">
                      {files.map((file, index) => (
                        <div key={index} className="file-item">
                          <div className="file-icon">📄</div>
                          <div className="file-details">
                            <a href={file.url} target="_blank" rel="noopener noreferrer" className="file-name">
                              {file.name}
                            </a>
                            <div className="file-actions">
                              <button
                                className="download-button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  const link = document.createElement("a");
                                  link.href = file.url;
                                  link.download = file.name;
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                                }}
                              >
                                Download
                              </button>
                              <button
                                className="delete-button"
                                onClick={() => {
                                  if (isLocked && !sessionEditable) {
                                    toast.error("This domain is locked. Unlock the domain to delete files.");
                                    return;
                                  }
                                  setFileToDelete(file);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => {
                      if (isLocked && !sessionEditable) {
                        toast.error("This domain is locked. Unlock the domain to upload files.");
                        return;
                      }
                      fileInputRef.current?.click();
                    }}
                    className="upload-button"
                  >
                    <FileUploadIcon />
                    {isUploading ? "Uploading..." : "Upload File"}
                  </button>
                </div>
              </div>
            </div>
            <div className="bottom-btns">
              <button onClick={handleSave} className="save-button">
                Save
              </button>
              <button
                onClick={isLocked ? (sessionEditable ? () => setIsUnlockPrompt(true) : () => setIsUnlockModalOpen(true)) : () => setIsLockModalOpen(true)}
                className="lock-button"
              >
                <LockIcon /> {isLocked ? (sessionEditable ? "Unlock" : "Edit") : "Lock"}
              </button>
            </div>
          </div>

          {fileToDelete && (
            <div className="modal-overlay">
              <div className="modal-box">
                <p>
                  Are you sure you want to delete <strong>{fileToDelete.name}</strong>? This action cannot be undone.
                </p>
                <div className="modal-actions">
                  <button onClick={() => handleDeleteFile(fileToDelete)} className="confirm-button">
                    Yes, Delete
                  </button>
                  <button onClick={() => setFileToDelete(null)} className="cancel-button">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {isUnlockPrompt && (
            <div className="modal-overlay">
              <div className="modal-box">
                <p>Are you sure you want to make the domain editable to the public?</p>
                <div className="modal-actions">
                  <button onClick={handleUnlock} className="confirm-button">
                    Yes, Unlock
                  </button>
                  <button onClick={() => setIsUnlockPrompt(false)} className="cancel-button">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {isLockModalOpen && (
            <div className="modal-overlay">
              <div className="modal-box">
                <h4>Set Password for Lock</h4>
                <TextField
                  type="password"
                  label="Enter Password"
                  fullWidth
                  value={lockPasswordInput}
                  onChange={(e) => setLockPasswordInput(e.target.value)}
                />
                <div className="modal-actions">
                  <button onClick={handleLock} className="confirm-button">
                    Lock
                  </button>
                  <button onClick={() => setIsLockModalOpen(false)} className="cancel-button">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {isUnlockModalOpen && (
            <div className="modal-overlay">
              <div className="modal-box">
                <h4>Enter Password to Unlock</h4>
                <TextField
                  type="password"
                  label="Enter Password"
                  fullWidth
                  value={lockPasswordInput}
                  onChange={(e) => setLockPasswordInput(e.target.value)}
                />
                <div className="modal-actions">
                  <button onClick={handleLock} className="confirm-button-green">
                    Unlock
                  </button>
                  <button onClick={() => setIsUnlockModalOpen(false)} className="cancel-button">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
