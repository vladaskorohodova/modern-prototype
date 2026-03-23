'use client';

import { useState } from 'react';
import CodeBlock from './CodeBlock';
import styles from './Demo.module.css';

interface DemoProps {
  title: string;
  code: string;
  codeLanguage?: string;
  children: React.ReactNode;
}

export default function Demo({
  title,
  code,
  codeLanguage = 'tsx',
  children,
}: DemoProps) {
  const [showCode, setShowCode] = useState(false);

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
        </div>
      </div>
      <div className={styles.preview}>{children}</div>
      {showCode ? <CodeBlock code={code} language={codeLanguage} embedded /> : null}
    </div>
  );
}
