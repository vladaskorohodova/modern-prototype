import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Modern React Library</h1>
          <p>A minimal documentation prototype built with Next.js, TypeScript, and MDX.</p>
        </div>

        <div className={styles.ctas}>
          <Link className={styles.primary} href="/docs/get-started/installation/">
            Open the docs
          </Link>
        </div>
      </main>
    </div>
  );
}
