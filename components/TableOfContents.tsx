'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './TableOfContents.module.css';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const pathname = usePathname();

  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const article = document.querySelector('main');
    if (!article) return;

    const elements = article.querySelectorAll('h2, h3');

    const items: TocItem[] = Array.from(elements).map((elem) => ({
      id: elem.id || elem.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
      text: elem.textContent || '',
      level: parseInt(elem.tagName.substring(1)),
    }));

    elements.forEach((elem, index) => {
      if (!elem.id) elem.id = items[index].id;
    });

    setHeadings(items);
    setActiveId(''); // optional: reset when changing pages

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    elements.forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, [pathname]); // <-- key change

  if (headings.length === 0) return null;

  return (
    <nav className={styles.toc}>
      <h4 className={styles.title}>On this page</h4>
      <ul className={styles.list}>
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`${styles.item} ${
              heading.level === 3 ? styles.nested : ''
            } ${activeId === heading.id ? styles.active : ''}`}
          >
            <a href={`#${heading.id}`} className={styles.link}>
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
