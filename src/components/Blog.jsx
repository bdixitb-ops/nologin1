import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./Blog.module.css";

export default function Blog() {
  return (
    <div className={styles.wrap}>
      <main className={styles.inner}>
        <span className={styles.pill}>From the team</span>
        <h1 className={styles.title}>The NoLogin Blog</h1>
        <p className={styles.subtitle}>
          Product updates, sharing tips, and short notes from the people building NoLogin.
        </p>

        <article className={styles.card}>
          <div className={styles.colMeta}>
            <span className={styles.featuredLabel}>Featured post</span>
            <div className={styles.tagRow}>
              <span className={styles.tag}>News</span>
              <span className={styles.metaLine}>Apr 28, 2025</span>
              <span className={styles.metaLine}>6 min read</span>
            </div>
            <h2 className={styles.cardTitle}>Hastebin is gone. Here&apos;s what to use instead.</h2>
          </div>
          <div className={styles.colBody}>
            <p className={styles.excerpt}>
              Hastebin recently shut down, leaving many developers looking for a fast, no-signup paste. Here is a
              practical look at what still works today, what to watch for in expiry and privacy, and how NoLogin fits
              when you need text plus files in one link.
            </p>
            <div className={styles.authorRow}>
              <span className={styles.avatar} aria-hidden>
                BD
              </span>
              <span className={styles.authorName}>Bdeekshith</span>
              <Link href="/" className={styles.arrowBtn} aria-label="Back to home">
                <ArrowRight size={18} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
