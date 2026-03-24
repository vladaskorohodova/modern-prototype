import type { ReactNode } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Header from '@/components/Header';
import { ThemeProvider } from '@/components/ThemeProvider';
import { THEME_STORAGE_KEY } from '@/components/theme';
import { githubRepoUrl } from '@/site-config.mjs';

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href?: string; children?: ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

function ThemeWrapper({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

function renderHeader(node: ReactNode) {
  return render(node, { wrapper: ThemeWrapper });
}

function mockPreferredTheme(theme: 'light' | 'dark') {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query === '(prefers-color-scheme: dark)' ? theme === 'dark' : false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe('Header', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.setAttribute('data-theme', 'light');
    mockPreferredTheme('light');
  });

  it('renders the home link and GitHub link', () => {
    renderHeader(<Header />);

    expect(screen.getByRole('link', { name: 'Modern React Library' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'View project on GitHub' })).toHaveAttribute('href', githubRepoUrl);
    expect(screen.getByRole('button', { name: 'Toggle color theme' })).toBeInTheDocument();
  });

  it('renders a docs menu button only when requested and wires clicks', async () => {
    const onDocsMenuToggle = vi.fn();

    const { rerender } = renderHeader(
      <Header
        showDocsMenu={false}
        isDocsMenuOpen={false}
        onDocsMenuToggle={onDocsMenuToggle}
      />
    );

    expect(screen.queryByRole('button', { name: 'Open navigation menu' })).not.toBeInTheDocument();

    rerender(
      <Header
        showDocsMenu
        isDocsMenuOpen
        onDocsMenuToggle={onDocsMenuToggle}
      />
    );

    const menuButton = screen.getByLabelText('Close navigation menu', {
      selector: 'button',
    });

    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(menuButton);
    expect(onDocsMenuToggle).toHaveBeenCalledTimes(1);
  });

  it('toggles the app theme and persists the selection', async () => {
    const user = userEvent.setup();

    renderHeader(<Header />);

    const toggle = screen.getByRole('button', { name: 'Toggle color theme' });
    expect(toggle).toHaveAttribute('aria-pressed', 'false');

    await user.click(toggle);

    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
  });

  it('restores a saved theme from localStorage on initialization', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'dark');

    renderHeader(<Header />);

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(screen.getByRole('button', { name: 'Toggle color theme' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('ignores invalid saved themes and falls back to the preferred theme', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'sepia');
    mockPreferredTheme('dark');

    renderHeader(<Header />);

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(screen.getByRole('button', { name: 'Toggle color theme' })).toHaveAttribute('aria-pressed', 'true');
  });
});