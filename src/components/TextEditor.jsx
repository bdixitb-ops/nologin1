"use client";

import {
  deleteExpiredDocument,
  deleteFileFromStorage,
  EXPIRATION_OPTIONS,
  expirationTimestampForLabel,
  isDocumentExpired,
  labelFromExpirationTimestamp,
} from "@/lib/documentExpiry";
import { downloadStorageFile } from "@/lib/downloadFile";
import { firestore, storage } from "@/lib/firebase";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LockIcon from "@mui/icons-material/Lock";
import NotesIcon from "@mui/icons-material/Notes";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { TextField } from "@mui/material";
import bcrypt from "bcryptjs";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Link from "next/link";
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
  const [downloadingFileName, setDownloadingFileName] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [lockPassword, setLockPassword] = useState("");
  const [lockPasswordInput, setLockPasswordInput] = useState("");
  const [sessionEditable, setSessionEditable] = useState(false);
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [isUnlockPrompt, setIsUnlockPrompt] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [pagePasswordInput, setPagePasswordInput] = useState("");
  const [expirationTime, setExpirationTime] = useState("48 hrs");
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [timeDraft, setTimeDraft] = useState("48 hrs");
  const [activeTab, setActiveTab] = useState("text");
  const [isDocumentLoading, setIsDocumentLoading] = useState(true);
  const fileInputRef = useRef();
  const lastLockedToastAtRef = useRef(0);
  const documentLoadedRef = useRef(false);
  const router = useRouter();

  const resetEditorAfterExpiry = useCallback(() => {
    documentLoadedRef.current = false;
    setText("");
    setFiles([]);
    setIsProtected(false);
    setIsLocked(false);
    setIsAuthenticated(false);
    setSessionEditable(false);
  }, []);

  const checkAndHandleExpiration = useCallback(async () => {
    try {
      const deleted = await deleteExpiredDocument(storage, firestore, domainName);
      if (!deleted) {
        return false;
      }

      resetEditorAfterExpiry();
      toast.warn("This domain has expired and has been automatically deleted.");
      setTimeout(() => router.push("/"), 2000);
      return true;
    } catch {
      return false;
    }
  }, [domainName, resetEditorAfterExpiry, router]);

  useEffect(() => {
    setIsDocumentLoading(true);
    setIsAuthenticated(false);
    setText("");
    setFiles([]);
    setIsProtected(false);

    const fetchData = async () => {
      try {
        const docRef = doc(firestore, "documents", domainName);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (isDocumentExpired(data)) {
            const expired = await checkAndHandleExpiration();
            if (expired) return;
          }
          documentLoadedRef.current = true;
          setIsProtected(!!data.passwordSet);
          setExpirationTime(labelFromExpirationTimestamp(data.expirationTimestamp));
          if (!data.passwordSet) {
            setIsLocked(data.isLocked || false);
            setLockPassword(data.lockPassword || "");
            setFiles(data.files || []);
            setText(data.text || "");
          }
        } else {
          documentLoadedRef.current = false;
        }
      } catch {
        // Ignore noisy transient failures.
      } finally {
        setIsDocumentLoading(false);
      }
    };

    fetchData();
    checkAndHandleExpiration();

    const expirationCheckInterval = setInterval(() => {
      checkAndHandleExpiration();
    }, 60_000);

    return () => clearInterval(expirationCheckInterval);
  }, [domainName, checkAndHandleExpiration]);

  const persistDocument = async (patch = {}) => {
    const docRef = doc(firestore, "documents", domainName);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      if (documentLoadedRef.current) {
        throw new Error("DOCUMENT_EXPIRED");
      }
      throw new Error("DOCUMENT_NOT_FOUND");
    }

    const existingData = docSnap.data();
    if (isDocumentExpired(existingData)) {
      await checkAndHandleExpiration();
      throw new Error("DOCUMENT_EXPIRED");
    }

    const filesWithTimestamps = files.map((file) =>
      file.uploadedAt ? file : { ...file, uploadedAt: Date.now() },
    );

    await setDoc(docRef, {
      ...existingData,
      text,
      files: filesWithTimestamps,
      createdAt: existingData.createdAt || Date.now(),
      expirationTimestamp: existingData.expirationTimestamp ?? expirationTimestampForLabel(expirationTime),
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
          setFiles(data.files || []);
          setIsLocked(data.isLocked || false);
          setLockPassword(data.lockPassword || "");
          setExpirationTime(labelFromExpirationTimestamp(data.expirationTimestamp));
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

  const handlePersistError = (error, fallbackMessage) => {
    if (error?.message === "DOCUMENT_EXPIRED") {
      toast.warn("This page has expired and was deleted.");
      return;
    }
    if (error?.message === "DOCUMENT_NOT_FOUND") {
      toast.error("This page no longer exists. Create it again from the home page.");
      return;
    }
    toast.error(fallbackMessage);
  };

  const handleSave = async () => {
    try {
      if (isLocked && !sessionEditable) {
        toast.error("This domain is locked. Unlock the domain to save changes.");
        return;
      }
      await persistDocument();
      toast.success("Document successfully saved!");
    } catch (error) {
      handlePersistError(error, "Error saving document.");
    }
  };

  const handleApplyExpiration = async () => {
    const label = timeDraft;
    setIsTimeModalOpen(false);
    setExpirationTime(label);
    try {
      await persistDocument({ expirationTimestamp: expirationTimestampForLabel(label) });
      toast.success(`Page will expire in ${label}.`);
    } catch (error) {
      handlePersistError(error, "Error updating expiry time.");
    }
  };

  const handleApplyPagePassword = async () => {
    if (!pagePasswordInput.trim()) {
      toast.error("Enter a password to continue.");
      return;
    }
    try {
      const hashedPassword = bcrypt.hashSync(pagePasswordInput.trim(), 10);
      await persistDocument({ passwordSet: true, password: hashedPassword });
      setIsProtected(true);
      setPagePasswordInput("");
      setIsPasswordModalOpen(false);
      toast.success("Password protection enabled.");
    } catch (error) {
      handlePersistError(error, "Error setting password.");
    }
  };

  const handleRemovePagePassword = async () => {
    try {
      await persistDocument({ passwordSet: false, password: "" });
      setIsProtected(false);
      setPagePasswordInput("");
      setIsPasswordModalOpen(false);
      toast.success("Password protection removed.");
    } catch (error) {
      handlePersistError(error, "Error removing password.");
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
      } catch (error) {
        handlePersistError(error, "Error enabling edit lock.");
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
    } catch (error) {
      handlePersistError(error, "Error removing edit lock.");
    }
  };

  const notifyLockedForEdit = () => {
    const now = Date.now();
    if (now - lastLockedToastAtRef.current < 2000) return;
    lastLockedToastAtRef.current = now;
    toast.error("This page is locked. Unlock via Edit Lock to edit.");
  };

  const handleModalBackdropClick = (event, onClose) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleFileChange = async (e) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const maxFiles = 5;
    const maxFileSizeBytes = 100 * 1024 * 1024;

    if (isLocked && !sessionEditable) {
      notifyLockedForEdit();
      return;
    }
    if (file.size > maxFileSizeBytes) {
      toast.error("File size exceeds the 100MB limit. Please upload a smaller file.");
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
      const uploadedFile = { name: file.name, url, uploadedAt: Date.now() };
      const updatedFiles = [...files, uploadedFile];
      setFiles(updatedFiles);
      await persistDocument({ files: updatedFiles });
      toast.success("File uploaded successfully!");
    } catch (error) {
      handlePersistError(error, "Error uploading file.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteFile = async (file) => {
    try {
      await deleteFileFromStorage(storage, domainName, file);
      const updatedFiles = files.filter((f) => f.name !== file.name);
      setFiles(updatedFiles);
      await persistDocument({ files: updatedFiles });
      toast.success("File deleted successfully!");
    } catch (error) {
      handlePersistError(error, "Error deleting file.");
    } finally {
      setFileToDelete(null);
    }
  };

  const handleDownloadFile = (file) => {
    if (downloadingFileName) return;

    setDownloadingFileName(file.name);
    try {
      downloadStorageFile(domainName, file.name, () => {
        toast.error("Could not download file. Please try again.");
        setDownloadingFileName(null);
      });
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Could not download file. Please try again.");
      setDownloadingFileName(null);
      return;
    }

    window.setTimeout(() => setDownloadingFileName(null), 2500);
  };

  const handleText = (value) => {
    if (!isLocked || sessionEditable) {
      setText(value);
    } else {
      notifyLockedForEdit();
    }
  };

  const canEditContent = !isLocked || sessionEditable;
  const showPasswordGate = isDocumentLoading || (!isAuthenticated && isProtected);
  const showEditor = !isDocumentLoading && (isAuthenticated || !isProtected);

  return (
    <div className="editor-container">
      <ToastContainer />
      {showPasswordGate ? (
        <div className="editor-password-gate">
          <Link href="/" className="editor-home-btn editor-home-btn--protected">
            <HomeOutlinedIcon className="editor-home-btn-icon" aria-hidden />
            Home
          </Link>
          <div className="modal-overlay editor-password-gate-overlay">
            {!isDocumentLoading && isProtected && !isAuthenticated ? (
              <div className="modal-box">
                <h4>Password Protected</h4>
                <p>This page is password protected. Enter the password to view it.</p>
                <TextField
                  type="password"
                  label="Enter Password"
                  fullWidth
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handlePasswordSubmit();
                    }
                  }}
                />
                <div className="modal-actions">
                  <button onClick={handlePasswordSubmit} className="confirm-button confirm-button--primary" type="button">
                    Unlock
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      {showEditor ? (
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
                        if (!canEditContent) {
                          const isAllowed = e.key === "Tab" || e.ctrlKey || e.metaKey;
                          if (!isAllowed) {
                            e.preventDefault();
                            notifyLockedForEdit();
                          }
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
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />

                    <div className="editor-files-content">
                      {files.length > 0 ? (
                        <div className="uploaded-files">
                          {files.map((file, index) => (
                            <div key={index} className="file-item">
                              <div className="file-icon">📄</div>
                              <div className="file-details">
                                <span className="file-name">{file.name}</span>
                                <div className="file-actions">
                                  <button
                                    type="button"
                                    className="download-button"
                                    disabled={downloadingFileName === file.name}
                                    onClick={() => handleDownloadFile(file)}
                                  >
                                    {downloadingFileName === file.name ? "Downloading..." : "Download"}
                                  </button>
                                  <button
                                    type="button"
                                    className="delete-button"
                                    onClick={() => {
                                      if (!canEditContent) {
                                        notifyLockedForEdit();
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
                      ) : (
                        <p className="editor-files-placeholder">Upload file and hit save button</p>
                      )}
                    </div>

                    <div className="editor-files-actions">
                      <button
                        type="button"
                        onClick={() => {
                          if (!canEditContent) {
                            notifyLockedForEdit();
                            return;
                          }
                          fileInputRef.current?.click();
                        }}
                        className="editor-toolbar-btn editor-upload-file-btn"
                      >
                        <FileUploadIcon className="editor-upload-file-btn-icon" aria-hidden />
                        <span className="editor-set-time-label">
                          {isUploading ? "Uploading..." : "Upload File"}
                        </span>
                      </button>
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

                  <button
                    type="button"
                    className="editor-toolbar-btn editor-set-time-btn"
                    onClick={() => {
                      setTimeDraft(expirationTime);
                      setIsTimeModalOpen(true);
                      setIsPasswordModalOpen(false);
                    }}
                  >
                    <span className="editor-set-time-label">Set time</span>
                    <span className="editor-set-time-value">{expirationTime}</span>
                  </button>

                  <button
                    type="button"
                    className={`editor-toolbar-btn editor-set-password-btn ${isProtected ? "is-active" : ""}`}
                    onClick={() => {
                      setPagePasswordInput("");
                      setIsPasswordModalOpen(true);
                      setIsTimeModalOpen(false);
                    }}
                  >
                    <span className="editor-set-time-label">Set Password</span>
                    {isProtected ? <span className="editor-set-time-value">On</span> : null}
                  </button>

                <button
                  onClick={handleSave}
                  className={`editor-toolbar-btn editor-toolbar-btn--save${canEditContent ? "" : " is-locked"}`}
                  type="button"
                  aria-disabled={!canEditContent}
                >
                  Save
                </button>
              </div>

              </div>
            </div>
          </div>

          {fileToDelete && (
            <div className="modal-overlay" onClick={(e) => handleModalBackdropClick(e, () => setFileToDelete(null))}>
              <div className="modal-box">
                <p>
                  Are you sure you want to delete <strong>{fileToDelete.name}</strong>? This action cannot be undone.
                </p>
                <div className="modal-actions">
                  <button onClick={() => handleDeleteFile(fileToDelete)} className="confirm-button confirm-button--danger" type="button">
                    Yes, Delete
                  </button>
                  <button onClick={() => setFileToDelete(null)} className="cancel-button">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {isPasswordModalOpen && (
            <div
              className="modal-overlay"
              onClick={(e) =>
                handleModalBackdropClick(e, () => {
                  setIsPasswordModalOpen(false);
                  setPagePasswordInput("");
                })
              }
            >
              <div className="modal-box">
                <h4>{isProtected ? "Update Page Password" : "Set Page Password"}</h4>
                <TextField
                  type="password"
                  label={isProtected ? "New password" : "Enter password"}
                  fullWidth
                  value={pagePasswordInput}
                  onChange={(e) => setPagePasswordInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleApplyPagePassword();
                    }
                  }}
                  autoComplete="new-password"
                />
                <div className="modal-actions">
                  <button onClick={handleApplyPagePassword} className="confirm-button confirm-button--primary" type="button">
                    Apply
                  </button>
                  {isProtected ? (
                    <button onClick={handleRemovePagePassword} className="confirm-button confirm-button--danger" type="button">
                      Remove
                    </button>
                  ) : null}
                  <button
                    onClick={() => {
                      setIsPasswordModalOpen(false);
                      setPagePasswordInput("");
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

          {isTimeModalOpen && (
            <div className="modal-overlay" onClick={(e) => handleModalBackdropClick(e, () => setIsTimeModalOpen(false))}>
              <div className="modal-box">
                <h4>Set Page Expiry</h4>
                <select
                  className="editor-modal-time-select"
                  value={timeDraft}
                  aria-label="Choose how long the page stays online"
                  onChange={(e) => setTimeDraft(e.target.value)}
                >
                  {EXPIRATION_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="modal-actions">
                  <button onClick={handleApplyExpiration} className="confirm-button confirm-button--primary" type="button">
                    Apply
                  </button>
                  <button onClick={() => setIsTimeModalOpen(false)} className="cancel-button" type="button">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {isLockModalOpen && (
            <div
              className="modal-overlay"
              onClick={(e) =>
                handleModalBackdropClick(e, () => {
                  setIsLockModalOpen(false);
                  setLockPasswordInput("");
                })
              }
            >
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
                  <button onClick={handleLock} className="confirm-button confirm-button--primary" type="button">
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
            <div className="modal-overlay" onClick={(e) => handleModalBackdropClick(e, () => setIsUnlockPrompt(false))}>
              <div className="modal-box">
                <p>Are you sure you want to make the domain editable to the public?</p>
                <div className="modal-actions">
                  <button onClick={handleUnlock} className="confirm-button confirm-button--primary" type="button">
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
            <div
              className="modal-overlay"
              onClick={(e) =>
                handleModalBackdropClick(e, () => {
                  setIsUnlockModalOpen(false);
                  setLockPasswordInput("");
                })
              }
            >
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
                  <button onClick={handleUnlockWithPassword} className="confirm-button confirm-button--primary" type="button">
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
      ) : null}
    </div>
  );
}
