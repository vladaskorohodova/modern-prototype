'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import TableOfContents from '@/components/TableOfContents';
import styles from '@/app/docs/layout.module.css';

interface DocsShellProps {
  children: React.ReactNode;
}

export default function DocsShell({ children }: DocsShellProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 980px)');

    const updateViewportMode = (event?: MediaQueryListEvent) => {
      const matches = event ? event.matches : mediaQuery.matches;
      setIsMobileViewport(matches);

      if (!matches) {
        setIsSidebarOpen(false);
      }
    };

    updateViewportMode();
    mediaQuery.addEventListener('change', updateViewportMode);

    return () => mediaQuery.removeEventListener('change', updateViewportMode);
  }, []);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className={styles.container}>
      <Header
        showDocsMenu
        isDocsMenuOpen={isSidebarOpen}
        onDocsMenuToggle={() => setIsSidebarOpen((current) => !current)}
      />
      <div className={styles.content}>
        <Sidebar
          isOpen={isSidebarOpen}
          isMobileViewport={isMobileViewport}
          onNavigate={() => setIsSidebarOpen(false)}
        />
        {isSidebarOpen && isMobileViewport ? (
          <button
            type="button"
            className={styles.backdrop}
            aria-label="Close navigation menu"
            onClick={() => setIsSidebarOpen(false)}
          />
        ) : null}
        <main className={styles.main}>
          {isMobileViewport && (
            <div className={styles.mobileTocWrap}>
              <TableOfContents mode="mobile" />
            </div>
          )}
          {children}
        </main>
        {!isMobileViewport && (
          <div className={styles.desktopTocWrap}>
            <TableOfContents mode="desktop" />
          </div>
        )}
      </div>
    </div>
  );
}