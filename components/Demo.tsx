'use client';

import { useState } from 'react';
import styles from './Demo.module.css';

interface DemoProps {
  title: string;
  code: string;
  children: React.ReactNode;
}

export default function Demo({ title, code, children }: DemoProps) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.demo}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.actions}>
          <button
            className={styles.button}
            onClick={() => setShowCode(!showCode)}
          >
            {showCode ? 'Hide code' : 'Show code'}
          </button>
          <button
            className={`${styles.button} ${styles.copyButton}`}
            onClick={handleCopy}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      <div className={styles.preview}>{children}</div>
      {showCode && (
        <div className={styles.codeBlock}>
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
