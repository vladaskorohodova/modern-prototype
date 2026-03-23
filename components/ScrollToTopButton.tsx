'use client';

import { useEffect, useState } from 'react';
import styles from './ScrollToTopButton.module.css';

const VISIBILITY_THRESHOLD = 320;

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

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
      onClick={scrollToTop}
    >
      <span className={styles.icon} aria-hidden="true">
        ↑
      </span>
      <span className={styles.label}>Top</span>
    </button>
  );
}