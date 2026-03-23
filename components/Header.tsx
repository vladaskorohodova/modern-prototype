'use client';

import Link from 'next/link';
import styles from './Header.module.css';

interface HeaderProps {
  showDocsMenu?: boolean;
  isDocsMenuOpen?: boolean;
  onDocsMenuToggle?: () => void;
}

export default function Header({
  showDocsMenu = false,
  isDocsMenuOpen = false,
  onDocsMenuToggle,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      {showDocsMenu ? (
        <button
          type="button"
          className={styles.menuButton}
          aria-label={isDocsMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isDocsMenuOpen}
          aria-controls="docs-sidebar"
          onClick={onDocsMenuToggle}
        >
          <span className={styles.menuIcon} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className={styles.menuText}>Menu</span>
        </button>
      ) : null}

      <h1 className={styles.title}>
        <Link href="/" className={styles.homeLink}>
          Modern React Library
        </Link>
      </h1>
    </header>
  );
}
