import type { ReactNode } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import DocsShell from '@/components/DocsShell';

const { mockRoutingState } = vi.hoisted(() => ({
  mockRoutingState: {
    pathname: '/docs/components/button',
  },
}));

vi.mock('next/navigation', () => ({
  usePathname: () => mockRoutingState.pathname,
}));

vi.mock('@/components/Header', () => ({
  default: ({
    showDocsMenu,
    isDocsMenuOpen,
    onDocsMenuToggle,
  }: {
    showDocsMenu?: boolean;
    isDocsMenuOpen?: boolean;
    onDocsMenuToggle?: () => void;
  }) => (
    <header>
      {showDocsMenu ? (
        <button
          type="button"
          aria-label={isDocsMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isDocsMenuOpen ? 'true' : 'false'}
          onClick={onDocsMenuToggle}
        >
          Menu
        </button>
      ) : null}
    </header>
  ),
}));

vi.mock('@/components/Sidebar', () => ({
  default: ({
    isOpen,
    isMobileViewport,
    onNavigate,
  }: {
    isOpen?: boolean;
    isMobileViewport?: boolean;
    onNavigate?: () => void;
  }) => (
    <div
      data-testid="sidebar"
      data-open={String(isOpen)}
      data-mobile={String(isMobileViewport)}
    >
      <button type="button" onClick={onNavigate}>
        Navigate in sidebar
      </button>
    </div>
  ),
}));

vi.mock('@/components/TableOfContents', () => ({
  default: ({ mode = 'desktop' }: { mode?: 'desktop' | 'mobile' }) => (
    <div data-testid={`toc-${mode}`}>{mode}</div>
  ),
}));

let mediaQueryMatches = false;
const mediaQueryListeners = new Set<(event: MediaQueryListEvent) => void>();

function setViewportMode(matches: boolean) {
  mediaQueryMatches = matches;

  mediaQueryListeners.forEach((listener) => {
    listener({ matches } as MediaQueryListEvent);
  });
}

describe('DocsShell', () => {
  beforeEach(() => {
    mockRoutingState.pathname = '/docs/components/button';
    mediaQueryMatches = false;
    mediaQueryListeners.clear();

    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        get matches() {
          return mediaQueryMatches;
        },
        media: query,
        onchange: null,
        addEventListener: (_event: string, listener: (event: MediaQueryListEvent) => void) => {
          mediaQueryListeners.add(listener);
        },
        removeEventListener: (_event: string, listener: (event: MediaQueryListEvent) => void) => {
          mediaQueryListeners.delete(listener);
        },
        addListener: (listener: (event: MediaQueryListEvent) => void) => {
          mediaQueryListeners.add(listener);
        },
        removeListener: (listener: (event: MediaQueryListEvent) => void) => {
          mediaQueryListeners.delete(listener);
        },
        dispatchEvent: () => true,
      })),
    });
  });

  it('closes the sidebar when the route changes', async () => {
    setViewportMode(true);
    const user = userEvent.setup();

    const { rerender } = render(
      <DocsShell>
        <article>Docs content</article>
      </DocsShell>
    );

    await user.click(screen.getByRole('button', { name: 'Open navigation menu' }));
    expect(screen.getByTestId('sidebar')).toHaveAttribute('data-open', 'true');

    mockRoutingState.pathname = '/docs/components/avatar';
    rerender(
      <DocsShell>
        <article>Docs content</article>
      </DocsShell>
    );

    await waitFor(() => {
      expect(screen.getByTestId('sidebar')).toHaveAttribute('data-open', 'false');
    });
  });

  it('switches between mobile and desktop docs chrome based on viewport state', async () => {
    setViewportMode(true);
    const user = userEvent.setup();

    render(
      <DocsShell>
        <article>Docs content</article>
      </DocsShell>
    );

    expect(screen.getByTestId('toc-mobile')).toBeInTheDocument();
    expect(screen.queryByTestId('toc-desktop')).not.toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toHaveAttribute('data-mobile', 'true');

    await user.click(screen.getByRole('button', { name: 'Open navigation menu' }));
    expect(screen.getByTestId('sidebar')).toHaveAttribute('data-open', 'true');

    setViewportMode(false);

    await waitFor(() => {
      expect(screen.queryByTestId('toc-mobile')).not.toBeInTheDocument();
      expect(screen.getByTestId('toc-desktop')).toBeInTheDocument();
      expect(screen.getByTestId('sidebar')).toHaveAttribute('data-mobile', 'false');
      expect(screen.getByTestId('sidebar')).toHaveAttribute('data-open', 'false');
    });
  });
});