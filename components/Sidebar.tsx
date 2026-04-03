'use client';

import Link from 'next/link';
import { docsNavigation } from '@/content/docs/navigation';
import styles from './Sidebar.module.css';

interface SidebarProps {
  isOpen?: boolean;
  isMobileViewport?: boolean;
  onNavigate?: () => void;
}

export default function Sidebar({
  isOpen = false,
  isMobileViewport = false,
  onNavigate,
}: SidebarProps) {
  const isHiddenMobileDrawer = isMobileViewport && !isOpen;

  return (
    <nav
      id="docs-sidebar"
      className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
      aria-label="Documentation navigation"
      aria-hidden={isHiddenMobileDrawer}
      inert={isHiddenMobileDrawer || undefined}
    >
      {docsNavigation.map((section, idx) => (
        <div key={idx} className={styles.section}>
          <h3 className={styles.sectionTitle}>{section.title}</h3>
          {section.items && (
            <ul className={styles.navList}>
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <Link
                    href={item.href || '#'}
                    className={styles.navLink}
                    onClick={onNavigate}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </nav>
  );
}
