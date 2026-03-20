import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link href="/" className={styles.homeLink}>
          Modern React Library
        </Link>
      </h1>
    </header>
  );
}
