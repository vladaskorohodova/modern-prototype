'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import TableOfContents from '@/components/TableOfContents';
import styles from './layout.module.css';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <Sidebar isOpen={isSidebarOpen} onNavigate={() => setIsSidebarOpen(false)} />
        {isSidebarOpen ? (
          <button
            type="button"
            className={styles.backdrop}
            aria-label="Close navigation menu"
            onClick={() => setIsSidebarOpen(false)}
          />
        ) : null}
        <main className={styles.main}>
          <div className={styles.mobileTocWrap}>
            <TableOfContents mode="mobile" />
          </div>
          {children}
        </main>
        <div className={styles.desktopTocWrap}>
          <TableOfContents mode="desktop" />
        </div>
      </div>
    </div>
  );
}
