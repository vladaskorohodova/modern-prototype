'use client';

import { useTheme } from './ThemeProvider';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, isReady, toggleTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={styles.button}
      aria-label="Toggle color theme"
      aria-pressed={isReady ? isDark : undefined}
      onClick={toggleTheme}
      disabled={!isReady}
    >
      <span className={styles.icon} aria-hidden="true">
        {isReady ? (isDark ? 'MOON' : 'SUN') : 'THEME'}
      </span>
      <span className={styles.label}>
        {isReady ? (isDark ? 'Dark' : 'Light') : 'Theme'}
      </span>
    </button>
  );
}