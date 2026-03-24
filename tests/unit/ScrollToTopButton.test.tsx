import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ScrollToTopButton from '@/components/ScrollToTopButton';

function setScrollPosition(value: number) {
  Object.defineProperty(window, 'scrollY', {
    configurable: true,
    writable: true,
    value,
  });
}

function setReducedMotionPreference(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)' ? matches : false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

describe('ScrollToTopButton', () => {
  beforeEach(() => {
    setScrollPosition(0);
    setReducedMotionPreference(false);

    Object.defineProperty(window, 'scrollTo', {
      configurable: true,
      writable: true,
      value: vi.fn(),
    });
  });

  it('stays hidden before the scroll threshold', () => {
    render(<ScrollToTopButton />);

    expect(screen.queryByRole('button', { name: 'Go to top' })).not.toBeInTheDocument();
  });

  it('appears after the scroll threshold is crossed', () => {
    render(<ScrollToTopButton />);

    setScrollPosition(400);
    fireEvent.scroll(window);

    expect(screen.getByRole('button', { name: 'Go to top' })).toBeInTheDocument();
  });

  it('uses smooth scrolling when reduced motion is not requested', async () => {
    const user = userEvent.setup();
    render(<ScrollToTopButton />);

    setScrollPosition(400);
    fireEvent.scroll(window);

    await user.click(screen.getByRole('button', { name: 'Go to top' }));

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('uses automatic scrolling when reduced motion is requested', async () => {
    const user = userEvent.setup();
    setReducedMotionPreference(true);
    render(<ScrollToTopButton />);

    setScrollPosition(400);
    fireEvent.scroll(window);

    await user.click(screen.getByRole('button', { name: 'Go to top' }));

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'auto',
    });
  });
});