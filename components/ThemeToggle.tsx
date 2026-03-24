'use client';

import { useTheme } from './ThemeProvider';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, isReady, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={styles.button}
      aria-label="Toggle color theme"
      aria-pressed={theme === 'dark'}
      onClick={toggleTheme}
      disabled={!isReady}
    >
      <span className={styles.icon} aria-hidden="true">
        {theme === 'dark' ? 'MOON' : 'SUN'}
      </span>
      <span className={styles.label}>{theme === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  );
}