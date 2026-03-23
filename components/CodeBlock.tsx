'use client';

import { Children, isValidElement, useMemo, useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
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

function normalizeLanguage(language?: string) {
  switch ((language || '').toLowerCase()) {
    case 'bash':
    case 'shell':
    case 'sh':
      return 'bash';
    case 'ts':
    case 'typescript':
      return 'ts';
    case 'js':
    case 'javascript':
      return 'js';
    case 'jsx':
      return 'jsx';
    case 'md':
    case 'mdx':
    case 'markdown':
      return 'md';
    case 'tsx':
    case 'typescriptreact':
    default:
      return 'tsx';
  }
}

export default function CodeBlock({
  children,
  code,
  language,
  embedded = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const rawCode = useMemo(() => {
    const source = code ?? extractTextContent(children);
    return source.replace(/\n$/, '');
  }, [children, code]);

  const resolvedLanguage = useMemo(
    () => normalizeLanguage(language ?? extractLanguage(children)),
    [children, language]
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(rawCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
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
          language={resolvedLanguage as never}
        >
          {({ tokens, getLineProps, getTokenProps }) => (
            <pre className={styles.pre}>
              <code className={styles.code}>
                {tokens.map((line, lineIndex) => (
                  <div
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
                  </div>
                ))}
              </code>
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}