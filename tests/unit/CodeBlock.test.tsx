import type { ReactNode } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CodeBlock from '@/components/CodeBlock';

const { highlightLanguageSpy } = vi.hoisted(() => ({
  highlightLanguageSpy: vi.fn(),
}));

vi.mock('prism-react-renderer', () => ({
  Highlight: ({
    code,
    language,
    children,
  }: {
    code: string;
    language: string;
    children: (props: {
      tokens: Array<Array<{ content: string }>>;
      getLineProps: (input: { key: number }) => { className: string };
      getTokenProps: (input: { token: { content: string }; key: number }) => { children: string };
    }) => ReactNode;
  }) => {
    highlightLanguageSpy(language);

    return children({
      tokens: code.split('\n').map((line) => [{ content: line }]),
      getLineProps: () => ({ className: '' }),
      getTokenProps: ({ token }) => ({ children: token.content }),
    });
  },
  themes: {
    vsDark: {},
  },
}));

const writeTextMock = vi.fn();

function setClipboardSupport({
  secureContext,
  clipboardAvailable,
}: {
  secureContext: boolean;
  clipboardAvailable: boolean;
}) {
  Object.defineProperty(window, 'isSecureContext', {
    configurable: true,
    value: secureContext,
  });

  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: clipboardAvailable ? { writeText: writeTextMock } : undefined,
  });
}

describe('CodeBlock', () => {
  beforeEach(() => {
    highlightLanguageSpy.mockClear();
    writeTextMock.mockReset();
    setClipboardSupport({ secureContext: false, clipboardAvailable: false });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('normalizes supported languages and falls back safely for unsupported values', () => {
    render(
      <>
        <CodeBlock code="const count = 1;" language="typescript" />
        <CodeBlock code="puts 'count'" language="ruby" />
      </>
    );

    expect(highlightLanguageSpy).toHaveBeenNthCalledWith(1, 'ts');
    expect(highlightLanguageSpy).toHaveBeenNthCalledWith(2, 'tsx');
  });

  it('renders the copy button only when clipboard support is available', () => {
    render(<CodeBlock code="const count = 1;" language="tsx" />);

    expect(screen.queryByRole('button', { name: 'Copy code to clipboard' })).not.toBeInTheDocument();
  });

  it('copies code and updates the button label', async () => {
    setClipboardSupport({ secureContext: true, clipboardAvailable: true });
    writeTextMock.mockResolvedValue(undefined);

    render(<CodeBlock code="const count = 1;" language="tsx" />);

    const button = await screen.findByRole('button', { name: 'Copy code to clipboard' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith('const count = 1;');
      expect(screen.getByRole('button', { name: 'Code copied to clipboard' })).toHaveTextContent('Copied');
    });
  });

  it('cleans up the pending copy timeout on unmount', async () => {
    vi.useFakeTimers();
    setClipboardSupport({ secureContext: true, clipboardAvailable: true });
    writeTextMock.mockResolvedValue(undefined);

    const { unmount } = render(<CodeBlock code="const count = 1;" language="tsx" />);
    const button = screen.getByRole('button', { name: 'Copy code to clipboard' });

    fireEvent.click(button);
    await Promise.resolve();

    expect(writeTextMock).toHaveBeenCalledWith('const count = 1;');

    expect(() => {
      unmount();
      vi.runAllTimers();
    }).not.toThrow();
  });
});