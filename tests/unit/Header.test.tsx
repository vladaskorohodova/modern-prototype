import type { ReactNode } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Header from '@/components/Header';
import { githubRepoUrl } from '@/site-config.mjs';

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href?: string; children?: ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('Header', () => {
  it('renders the home link and GitHub link', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: 'Modern React Library' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'View project on GitHub' })).toHaveAttribute('href', githubRepoUrl);
  });

  it('renders a docs menu button only when requested and wires clicks', async () => {
    const onDocsMenuToggle = vi.fn();
    const user = userEvent.setup();

    const { rerender } = render(
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
});