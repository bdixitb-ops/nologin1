"use client";

import { firestore, storage } from "@/lib/firebase";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LockIcon from "@mui/icons-material/Lock";
import NotesIcon from "@mui/icons-material/Notes";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { TextField } from "@mui/material";
import bcrypt from "bcryptjs";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const EXPIRATION_OPTIONS = ["1 hr", "3 hrs", "5 hrs", "10 hrs", "24 hrs", "48 hrs", "2 days", "4 days", "7 days"];

const EXPIRATION_MS = {
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

function expirationTimestampForLabel(label) {
  return Date.now() + (EXPIRATION_MS[label] ?? EXPIRATION_MS["48 hrs"]);
}

function labelFromExpirationTimestamp(timestamp) {
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
  const [passwordPanelOpen, setPasswordPanelOpen] = useState(false);
  const [pagePasswordInput, setPagePasswordInput] = useState("");
  const [pagePasswordVisible, setPagePasswordVisible] = useState(false);
  const [expirationTime, setExpirationTime] = useState("48 hrs");
  const [timePanelOpen, setTimePanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("text");
  const fileInputRef = useRef();
  const pagePasswordInputRef = useRef(null);
  const timeSelectRef = useRef(null);
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
          setExpirationTime(labelFromExpirationTimestamp(data.expirationTimestamp));
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

  useEffect(() => {
    if (passwordPanelOpen) {
      pagePasswordInputRef.current?.focus();
    }
  }, [passwordPanelOpen]);

  useEffect(() => {
    if (timePanelOpen) {
      timeSelectRef.current?.focus();
    }
  }, [timePanelOpen]);

  const persistDocument = async (patch = {}) => {
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
      expirationTimestamp:
        existingData.expirationTimestamp ?? expirationTimestampForLabel(expirationTime),
      ...patch,
    });
  };

  const handlePasswordSubmit = async () => {
    try {
      const docRef = doc(firestore, "documents", domainName);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const storedPassword = data.password || "";
        const isPasswordCorrect = storedPassword.startsWith("$2")
          ? await bcrypt.compare(inputPassword, storedPassword)
          : inputPassword === storedPassword;
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
      await persistDocument();
      toast.success("Document successfully saved!");
    } catch {
      toast.error("Error saving document.");
    }
  };

  const handleExpirationChange = async (label) => {
    setExpirationTime(label);
    setTimePanelOpen(false);
    try {
      await persistDocument({ expirationTimestamp: expirationTimestampForLabel(label) });
      toast.success(`Page will expire in ${label}.`);
    } catch {
      toast.error("Error updating expiry time.");
    }
  };

  const handleApplyPagePassword = async () => {
    if (!pagePasswordInput.trim()) {
      toast.error("Enter a password or tap ✕ to cancel.");
      return;
    }
    try {
      const hashedPassword = bcrypt.hashSync(pagePasswordInput.trim(), 10);
      await persistDocument({ passwordSet: true, password: hashedPassword });
      setIsProtected(true);
      setPagePasswordInput("");
      setPasswordPanelOpen(false);
      setPagePasswordVisible(false);
      toast.success("Password protection enabled.");
    } catch {
      toast.error("Error setting password.");
    }
  };

  const handleRemovePagePassword = async () => {
    try {
      await persistDocument({ passwordSet: false, password: "" });
      setIsProtected(false);
      setPagePasswordInput("");
      setPasswordPanelOpen(false);
      setPagePasswordVisible(false);
      toast.success("Password protection removed.");
    } catch {
      toast.error("Error removing password.");
    }
  };

  const handleLock = async () => {
    if (!isLocked) {
      if (!lockPasswordInput.trim()) {
        toast.error("Password is required to lock the domain.");
        return;
      }
      try {
        const hashedPassword = bcrypt.hashSync(lockPasswordInput.trim(), 10);
        await persistDocument({ isLocked: true, lockPassword: hashedPassword });
        setIsLocked(true);
        setLockPassword(hashedPassword);
        setSessionEditable(true);
        setLockPasswordInput("");
        setIsLockModalOpen(false);
        toast.success("Domain locked and saved successfully!");
      } catch {
        toast.error("Error enabling edit lock.");
      }
      return;
    }
  };

  const handleEditLockClick = () => {
    if (!isLocked) {
      setLockPasswordInput("");
      setIsLockModalOpen(true);
      return;
    }
    if (sessionEditable) {
      setLockPasswordInput("");
      setIsUnlockModalOpen(true);
      return;
    }
    setLockPasswordInput("");
    setIsUnlockModalOpen(true);
  };

  const handleUnlockWithPassword = async () => {
    if (!lockPasswordInput.trim()) {
      toast.error("Enter the edit-lock password.");
      return;
    }
    if (!bcrypt.compareSync(lockPasswordInput, lockPassword)) {
      toast.error("Incorrect password.");
      return;
    }
    setLockPasswordInput("");
    setIsUnlockModalOpen(false);
    if (sessionEditable) {
      setIsUnlockPrompt(true);
      return;
    }
    setSessionEditable(true);
    toast.success("You can edit this page for this session.");
  };

  const handleUnlock = async () => {
    setIsUnlockPrompt(false);
    setIsLocked(false);
    setLockPassword("");
    setSessionEditable(false);
    try {
      await persistDocument({ isLocked: false, lockPassword: "" });
      toast.success("Edit lock removed. Page is editable again.");
    } catch {
      toast.error("Error removing edit lock.");
    }
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

  const canEditContent = !isLocked || sessionEditable;

  return (
    <div className="editor-container">
      <ToastContainer />
      {!isAuthenticated && isProtected ? (
        <div className="password-protected-container">
          <Link href="/" className="editor-home-btn editor-home-btn--protected">
            <HomeOutlinedIcon className="editor-home-btn-icon" aria-hidden />
            Home
          </Link>
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
            <div className="editor-page-top">
              <Link href="/" className="editor-home-btn">
                <HomeOutlinedIcon className="editor-home-btn-icon" aria-hidden />
                Home
              </Link>
            </div>
            <div className="editor-panel">
              <div className="editor-tab-bar" role="tablist" aria-label="Page content">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "text"}
                  className={`editor-tab ${activeTab === "text" ? "is-active" : ""}`}
                  onClick={() => setActiveTab("text")}
                >
                  <NotesIcon className="editor-tab-icon" aria-hidden />
                  Text
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "files"}
                  className={`editor-tab ${activeTab === "files" ? "is-active" : ""}`}
                  onClick={() => setActiveTab("files")}
                >
                  <InsertDriveFileOutlinedIcon className="editor-tab-icon" aria-hidden />
                  Files
                  {files.length > 0 ? <span className="editor-tab-badge">{files.length}</span> : null}
                </button>
              </div>

              <div className="editor-tab-panel">
                {activeTab === "text" ? (
                  <div className="editor-text-pane" role="tabpanel">
                    <textarea
                      value={text}
                      placeholder={
                        canEditContent ? "Enter text and hit save button" : "View only — copy allowed. Enter password via Edit Lock to edit."
                      }
                      onChange={(e) => handleText(e.target.value)}
                      onKeyDown={(e) => {
                        if (!canEditContent && e.key !== "Tab" && !e.ctrlKey && !e.metaKey) {
                          e.preventDefault();
                        }
                      }}
                      readOnly={!canEditContent}
                      className={`inner-text-area ${!canEditContent ? "inner-text-area--readonly" : ""}`}
                    />
                    <button
                      type="button"
                      className="copy-button"
                      onClick={() => navigator.clipboard.writeText(text)}
                      aria-label="Copy text"
                    >
                      <ContentCopyIcon />
                    </button>
                  </div>
                ) : (
                  <div className="editor-files-pane" role="tabpanel">
                    <div className={`file-upload ${files.length > 0 ? "has-files" : ""}`}>
                      <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />

                      {files.length > 0 ? (
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
                                    type="button"
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
                                  {canEditContent ? (
                                    <button
                                      type="button"
                                      className="delete-button"
                                      onClick={() => setFileToDelete(file)}
                                    >
                                      Delete
                                    </button>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}

                      {canEditContent ? (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="upload-button"
                        >
                          <FileUploadIcon />
                          {isUploading ? "Uploading..." : "Upload File"}
                        </button>
                      ) : null}
                    </div>

                    <div className="editor-files-social">
                      <span>Follow us on</span>
                      <a href="https://www.instagram.com/nologin.in" target="_blank" rel="noopener noreferrer">
                        <InstagramIcon className="social-icon" />
                      </a>
                      <a href="https://www.linkedin.com/company/nologin-in/" target="_blank" rel="noopener noreferrer">
                        <LinkedInIcon className="social-icon" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="editor-bottom-bar">
                <div className="editor-bottom-toolbar">
                  <button
                    type="button"
                    onClick={handleEditLockClick}
                    className={`editor-toolbar-btn edit-lock-button ${isLocked ? "is-active" : ""}`}
                  >
                    <LockIcon />
                    {isLocked ? (sessionEditable ? "Unlock" : "Edit") : "Edit Lock"}
                  </button>

                <div
                  className={`home-v2-control home-v2-time-control editor-page-time-control editor-toolbar-control ${timePanelOpen ? "home-v2-time-control--open" : ""}`}
                  role="group"
                  aria-label="Page expiry time"
                  aria-expanded={timePanelOpen}
                >
                  {!timePanelOpen ? (
                    <button
                      type="button"
                      className="home-v2-time-collapsed editor-option-button"
                      onClick={() => {
                        setTimePanelOpen(true);
                        setPasswordPanelOpen(false);
                      }}
                    >
                      <span className="home-v2-time-collapsed-main">Set time</span>
                      <span className="home-v2-time-collapsed-optional">{expirationTime}</span>
                    </button>
                  ) : (
                    <select
                      ref={timeSelectRef}
                      className="home-v2-time-select"
                      value={expirationTime}
                      aria-label="Choose how long the page stays online"
                      onChange={(e) => handleExpirationChange(e.target.value)}
                      onBlur={() => {
                        window.setTimeout(() => setTimePanelOpen(false), 180);
                      }}
                    >
                      {EXPIRATION_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div
                  className={`home-v2-control home-v2-password-control editor-page-password-control editor-toolbar-control ${passwordPanelOpen ? "home-v2-password-control--open" : ""}`}
                >
                  {!passwordPanelOpen ? (
                    <button
                      type="button"
                      className="home-v2-password-collapsed editor-option-button"
                      onClick={() => {
                        setPasswordPanelOpen(true);
                        setTimePanelOpen(false);
                      }}
                    >
                      {isProtected ? "Password on" : "Set Password"}
                    </button>
                  ) : (
                    <div className="home-v2-password-editor">
                      <div className="home-v2-password-input-wrap">
                        <input
                          ref={pagePasswordInputRef}
                          type={pagePasswordVisible ? "text" : "password"}
                          value={pagePasswordInput}
                          onChange={(e) => setPagePasswordInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleApplyPagePassword();
                            }
                          }}
                          placeholder={isProtected ? "New password" : "Enter password"}
                          className="home-v2-password-input"
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          className="home-v2-password-visibility-btn"
                          onClick={() => setPagePasswordVisible((v) => !v)}
                          aria-label={pagePasswordVisible ? "Hide password" : "Show password"}
                        >
                          {pagePasswordVisible ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                              <path
                                d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                              <path
                                d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                            </svg>
                          )}
                        </button>
                      </div>
                      <div className="home-v2-password-close-slot">
                        <button
                          type="button"
                          className="home-v2-password-close"
                          onClick={() => {
                            setPasswordPanelOpen(false);
                            setPagePasswordInput("");
                            setPagePasswordVisible(false);
                          }}
                          aria-label="Close password panel"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSave}
                  className="editor-toolbar-btn editor-toolbar-btn--save"
                  type="button"
                  disabled={!canEditContent}
                  aria-disabled={!canEditContent}
                >
                  Save
                </button>
              </div>

              {passwordPanelOpen ? (
                <div className="editor-password-actions">
                  {isProtected ? (
                    <button type="button" className="editor-toolbar-btn" onClick={handleRemovePagePassword}>
                      Remove
                    </button>
                  ) : null}
                  <button type="button" className="editor-toolbar-btn editor-toolbar-btn--save" onClick={handleApplyPagePassword}>
                    Apply
                  </button>
                </div>
              ) : null}
              </div>
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleLock();
                    }
                  }}
                />
                <div className="modal-actions">
                  <button onClick={handleLock} className="confirm-button" type="button">
                    Lock
                  </button>
                  <button
                    onClick={() => {
                      setIsLockModalOpen(false);
                      setLockPasswordInput("");
                    }}
                    className="cancel-button"
                    type="button"
                  >
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnlockWithPassword();
                    }
                  }}
                />
                <div className="modal-actions">
                  <button onClick={handleUnlockWithPassword} className="confirm-button-green" type="button">
                    Unlock
                  </button>
                  <button
                    onClick={() => {
                      setIsUnlockModalOpen(false);
                      setLockPasswordInput("");
                    }}
                    className="cancel-button"
                    type="button"
                  >
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
