'use client';

import { useEffect, useState } from 'react';
import styles from './ScrollToTopButton.module.css';

const VISIBILITY_THRESHOLD = 320;

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeVisible = window.scrollY > VISIBILITY_THRESHOLD;
      setIsVisible((prev) => (prev === shouldBeVisible ? prev : shouldBeVisible));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      className={styles.button}
      aria-label="Go to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <span className={styles.icon} aria-hidden="true">
        ↑
      </span>
      <span className={styles.label}>Top</span>
    </button>
  );
}