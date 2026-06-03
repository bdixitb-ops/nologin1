"use client";

import { firestore, storage } from "@/lib/firebase";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export default function HomeHeroBlock({ badge, title, subtext, sectionId = "home-hero" }) {
  const [domainName, setDomainName] = useState("");
  const router = useRouter();

  const deleteFileFromStorage = useCallback(async (domain, file) => {
    const fileName = file?.name || file?.fileName;
    const candidates = [];

    if (file?.url) {
      candidates.push(() => ref(storage, file.url));
    }

    if (fileName) {
      candidates.push(() => ref(storage, `files/${domain}/${fileName}`));
    }

    let lastError = null;
    for (const buildRef of candidates) {
      try {
        await deleteObject(buildRef());
        return;
      } catch (error) {
        if (error?.code === "storage/object-not-found") {
          return;
        }
        lastError = error;
      }
    }

    if (lastError) {
      throw lastError;
    }
  }, []);

  const handleSubmit = async () => {
    const name = domainName.trim().toLowerCase();
    if (!name) {
      toast.error("Enter a page name.");
      return;
    }

    try {
      const docRef = doc(firestore, "documents", name);
      const docSnap = await getDoc(docRef);
      const currentTime = Date.now();
      let domainWasDeleted = false;

      if (docSnap.exists()) {
        const data = docSnap.data();
        const expirationTimestamp = data.expirationTimestamp;

        if (expirationTimestamp && expirationTimestamp <= currentTime) {
          const files = data.files || [];
          for (const file of files) {
            try {
              await deleteFileFromStorage(name, file);
            } catch {
              // Keep cleanup best effort.
            }
          }
          await deleteDoc(docRef);
          toast.warn("This domain has expired and has been automatically deleted. Creating new domain...");
          domainWasDeleted = true;
          const verifyDelete = await getDoc(docRef);
          if (verifyDelete.exists()) {
            toast.error("Error: Domain still exists. Please try again.");
            return;
          }
        } else {
          router.push(`/${name}`);
          return;
        }
      }

      const finalCheck = await getDoc(docRef);

      if (!finalCheck.exists() || domainWasDeleted) {
        const expirationMs = 48 * 60 * 60 * 1000;
        await setDoc(docRef, {
          passwordSet: false,
          password: "",
          expirationTimestamp: Date.now() + expirationMs,
          text: "",
          files: [],
          createdAt: Date.now(),
        });

        toast.success("Domain created successfully!");
        router.push(`/${name}`);
      } else {
        router.push(`/${name}`);
      }
    } catch {
      toast.error("Error setting document settings.");
    }
  };

  return (
    <div id={sectionId} className="home-v2-body">
      <p className="home-v2-badge">{badge}</p>
      <h1 className="home-v2-title">{title}</h1>
      <p className="home-v2-subtext-muted">{subtext}</p>

      <div className={`home-v2-input-row ${domainName.trim() ? "home-v2-input-row-active" : ""}`}>
        <span className="home-v2-prefix">nologin.in/</span>
        <input
          type="text"
          placeholder="Enter page name"
          value={domainName}
          onChange={(e) => setDomainName(e.target.value.toLowerCase())}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          aria-label="Page name"
        />
      </div>
      <div className="home-v2-hero-actions">
        <div className="home-v2-submit-row">
          <button
            type="button"
            onClick={handleSubmit}
            className={`home-v2-submit-btn ${domainName.trim() ? "home-v2-submit-btn-active" : ""}`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
