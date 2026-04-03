'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { docsSearchIndex, DocsSearchEntry } from '@/content/docs/search-index';
import styles from './DocsSearch.module.css';

interface SearchResult extends DocsSearchEntry {
  matchType: 'titleExact' | 'titleStart' | 'titleContains' | 'description';
}

function searchDocs(query: string): SearchResult[] {
  if (!query.trim()) {
    return [];
  }

  const lowerQuery = query.toLowerCase();

  const results: SearchResult[] = [];
  const ranked = new Map<string, SearchResult>();

  for (const entry of docsSearchIndex) {
    const lowerTitle = entry.title.toLowerCase();
    const lowerDesc = entry.description.toLowerCase();
    const lowerKeywords = (entry.keywords || []).map((k) => k.toLowerCase());

    let matchType: 'titleExact' | 'titleStart' | 'titleContains' | 'description' | null = null;

    // Rank matches by specificity
    if (lowerTitle === lowerQuery) {
      matchType = 'titleExact';
    } else if (lowerTitle.startsWith(lowerQuery)) {
      matchType = 'titleStart';
    } else if (lowerTitle.includes(lowerQuery)) {
      matchType = 'titleContains';
    } else if (lowerDesc.includes(lowerQuery)) {
      matchType = 'description';
    } else if (lowerKeywords.some((k) => k.includes(lowerQuery))) {
      matchType = 'description'; // Keyword matches treated as description match
    }

    if (matchType) {
      const result: SearchResult = {
        ...entry,
        matchType,
      };
      ranked.set(entry.href, result);
    }
  }

  // Sort by match type (exact > start > contains > description)
  const matchTypeOrder = {
    titleExact: 0,
    titleStart: 1,
    titleContains: 2,
    description: 3,
  };

  return Array.from(ranked.values()).sort(
    (a, b) => matchTypeOrder[a.matchType] - matchTypeOrder[b.matchType]
  );
}

interface DocsSearchProps {
  onNavigate?: () => void;
}

export default function DocsSearch({ onNavigate }: DocsSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const results = useMemo(() => searchDocs(query), [query]);

  const handleNavigate = () => {
    setQuery('');
    setIsOpen(false);
    onNavigate?.();
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search docs..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className={styles.input}
          aria-label="Search documentation"
          aria-autocomplete="list"
          aria-controls={isOpen ? 'docs-search-results' : undefined}
          aria-expanded={isOpen && query.trim() !== ''}
        />
      </div>

      {isOpen && query.trim() !== '' && (
        <div className={styles.resultsPanel} id="docs-search-results" role="listbox">
          {results.length > 0 ? (
            <ul className={styles.resultsList} role="presentation">
              {results.map((result) => (
                <li key={result.href} role="option">
                  <Link href={result.href} onClick={handleNavigate} className={styles.resultLink}>
                    <div className={styles.resultTitle}>{result.title}</div>
                    <div className={styles.resultMeta}>
                      <span className={styles.resultSection}>{result.section}</span>
                      <span className={styles.resultDesc}>{result.description}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.emptyState}>No matching docs topics</div>
          )}
        </div>
      )}
    </div>
  );
}
