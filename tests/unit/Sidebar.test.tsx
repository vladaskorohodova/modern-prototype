import type { MouseEvent, ReactNode } from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Sidebar from '@/components/Sidebar';

vi.mock('next/link', () => ({
  default: ({ href, children, onClick, ...props }: {
    href?: string;
    children?: ReactNode;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
    [key: string]: unknown;
  }) => (
    <a
      href={href}
      onClick={(event) => {
        onClick?.(event);
        event.preventDefault();
      }}
      {...props}
    >
      {children}
    </a>
  ),
}));

describe('Sidebar', () => {
  it('marks the closed mobile drawer as hidden and inert', () => {
    render(<Sidebar isOpen={false} isMobileViewport />);

    const navigation = document.querySelector('#docs-sidebar');

    expect(navigation).not.toBeNull();
    expect(navigation).toHaveAttribute('aria-hidden', 'true');
    expect(navigation).toHaveAttribute('inert');
  });

  it('keeps the open sidebar navigable and forwards link clicks', async () => {
    const onNavigate = vi.fn();
    const user = userEvent.setup();

    render(
      <Sidebar
        isOpen
        isMobileViewport
        onNavigate={onNavigate}
      />
    );

    const navigation = screen.getByRole('navigation', {
      name: 'Documentation navigation',
      hidden: true,
    });
    const quickStartLink = within(navigation).getByRole('link', { name: 'Quick start' });

    expect(navigation.getAttribute('aria-hidden')).not.toBe('true');
    expect(navigation).not.toHaveAttribute('inert');
    expect(quickStartLink).toHaveAttribute('href', '/docs/get-started/quick-start');

    await user.click(quickStartLink);
    expect(onNavigate).toHaveBeenCalledTimes(1);
  });
});