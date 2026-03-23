'use client';

import { Children, isValidElement, useEffect, useMemo, useRef, useState } from 'react';
import { Highlight, themes, type Language } from 'prism-react-renderer';
import styles from './CodeBlock.module.css';

type CodeElementProps = {
  children?: React.ReactNode;
  className?: string;
};

interface CodeBlockProps {
  children?: React.ReactNode;
  code?: string;
  language?: string;
  embedded?: boolean;
}

const FALLBACK_LANGUAGE: Language = 'tsx';

const languageAliases: Record<string, Language> = {
  bash: 'bash',
  shell: 'bash',
  sh: 'bash',
  ts: 'ts',
  typescript: 'ts',
  js: 'javascript',
  javascript: 'javascript',
  jsx: 'jsx',
  md: 'markdown',
  mdx: 'markdown',
  markdown: 'markdown',
  tsx: 'tsx',
  typescriptreact: 'tsx',
};

function extractTextContent(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractTextContent).join('');
  }

  if (isValidElement<CodeElementProps>(node)) {
    return extractTextContent(node.props.children);
  }

  return '';
}

function extractLanguage(children: React.ReactNode): string | undefined {
  if (
    isValidElement<CodeElementProps>(children) &&
    typeof children.props.className === 'string'
  ) {
    const match = children.props.className.match(/language-([\w-]+)/);
    return match?.[1];
  }

  const childArray = Children.toArray(children);

  for (const child of childArray) {
    if (
      isValidElement<CodeElementProps>(child) &&
      typeof child.props.className === 'string'
    ) {
      const match = child.props.className.match(/language-([\w-]+)/);
      if (match?.[1]) {
        return match[1];
      }
    }
  }

  return undefined;
}

function normalizeLanguage(language?: string): Language {
  if (!language) {
    return FALLBACK_LANGUAGE;
  }

  return languageAliases[language.toLowerCase()] ?? FALLBACK_LANGUAGE;
}

export default function CodeBlock({
  children,
  code,
  language,
  embedded = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const resetCopiedTimeoutRef = useRef<number | null>(null);

  const rawCode = useMemo(() => {
    const source = code ?? extractTextContent(children);
    return source.replace(/\n$/, '');
  }, [children, code]);

  const resolvedLanguage = useMemo(
    () => normalizeLanguage(language ?? extractLanguage(children)),
    [children, language]
  );

  useEffect(() => {
    return () => {
      if (resetCopiedTimeoutRef.current !== null) {
        window.clearTimeout(resetCopiedTimeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    // Feature-detect the Clipboard API to avoid errors in unsupported or insecure contexts.
    if (
      typeof navigator === 'undefined' ||
      !navigator.clipboard ||
      typeof navigator.clipboard.writeText !== 'function'
    ) {
      return;
    }

    try {
      await navigator.clipboard.writeText(rawCode);

      if (resetCopiedTimeoutRef.current !== null) {
        window.clearTimeout(resetCopiedTimeoutRef.current);
      }

      setCopied(true);
      resetCopiedTimeoutRef.current = window.setTimeout(() => {
        setCopied(false);
        resetCopiedTimeoutRef.current = null;
      }, 2000);
    } catch (error) {
      // Swallow or log the error to prevent an unhandled promise rejection.
      // console.error('Failed to copy code to clipboard:', error);
    }
  };

  if (!rawCode) {
    return null;
  }

  return (
    <div className={`${styles.wrapper} ${embedded ? styles.embedded : ''}`}>
      <button
        type="button"
        className={styles.copyButton}
        onClick={handleCopy}
        aria-label={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
      >
        {copied ? 'Copied' : 'Copy'}
      </button>

      <div className={styles.viewport}>
        <Highlight
          theme={themes.vsDark}
          code={rawCode}
          language={resolvedLanguage}
        >
          {({ tokens, getLineProps, getTokenProps }) => (
            <pre className={styles.pre}>
              <code className={styles.code}>
                {tokens.map((line, lineIndex) => (
                  <span
                    key={lineIndex}
                    {...getLineProps({ line, key: lineIndex })}
                    className={styles.line}
                  >
                    {line.map((token, tokenIndex) => (
                      <span
                        key={tokenIndex}
                        {...getTokenProps({ token, key: tokenIndex })}
                      />
                    ))}
                  </span>
                ))}
              </code>
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}