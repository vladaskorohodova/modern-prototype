import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import DocsSearch from '@/components/DocsSearch';
import { docsSearchIndex } from '@/content/docs/search-index';
import { docsNavigation } from '@/content/docs/navigation';

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href?: string; children?: ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('DocsSearch', () => {
  it('renders a search input with proper accessibility attributes', () => {
    render(<DocsSearch />);
    const input = screen.getByRole('textbox', { name: /search documentation/i });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Search docs...');
  });

  it('does not show results panel when empty', () => {
    render(<DocsSearch />);
    const resultsPanel = screen.queryByRole('listbox');
    expect(resultsPanel).not.toBeInTheDocument();
  });

  it('shows results panel when user types a query', async () => {
    const user = userEvent.setup();
    render(<DocsSearch />);
    const input = screen.getByRole('textbox', { name: /search documentation/i });

    await user.type(input, 'button');

    const resultsPanel = screen.getByRole('listbox');
    expect(resultsPanel).toBeInTheDocument();
  });

  it('finds exact title matches', async () => {
    const user = userEvent.setup();
    render(<DocsSearch />);
    const input = screen.getByRole('textbox', { name: /search documentation/i });

    await user.type(input, 'Button');

    const resultLink = screen.getByText('Button');
    expect(resultLink).toBeInTheDocument();
  });

  it('finds title start matches', async () => {
    const user = userEvent.setup();
    render(<DocsSearch />);
    const input = screen.getByRole('textbox', { name: /search documentation/i });

    await user.type(input, 'Grid');

    // Should match "Grid Overview", "Grid - Bind Data", etc.
    const results = screen.getAllByText(/Grid/);
    expect(results.length).toBeGreaterThanOrEqual(1);
  });

  it('finds description matches', async () => {
    const user = userEvent.setup();
    render(<DocsSearch />);
    const input = screen.getByRole('textbox', { name: /search documentation/i });

    const descriptionMatchEntry = docsSearchIndex.find((entry) => {
      const title = entry.title.toLowerCase();
      const descriptionTokens = (entry.description ?? '')
        .toLowerCase()
        .match(/[a-z0-9-]{3,}/g) ?? [];
      const keywordTokens = (entry.keywords ?? []).map((keyword) => keyword.toLowerCase());
      return [...descriptionTokens, ...keywordTokens].some((token) => !title.includes(token));
    });

    expect(descriptionMatchEntry).toBeDefined();

    const title = descriptionMatchEntry!.title.toLowerCase();
    const descriptionTokens = (descriptionMatchEntry!.description ?? '')
      .toLowerCase()
      .match(/[a-z0-9-]{3,}/g) ?? [];
    const keywordTokens = (descriptionMatchEntry!.keywords ?? []).map((keyword) => keyword.toLowerCase());
    const descriptionOnlyQuery = [...descriptionTokens, ...keywordTokens].find(
      (token) => !title.includes(token),
    );

    expect(descriptionOnlyQuery).toBeDefined();

    await user.type(input, descriptionOnlyQuery!);

    const resultText = screen.getByText(descriptionMatchEntry!.title);
    expect(resultText).toBeInTheDocument();
  });

  it('is case-insensitive', async () => {
    const user = userEvent.setup();
    render(<DocsSearch />);
    const input = screen.getByRole('textbox', { name: /search documentation/i });

    await user.type(input, 'BUTTON');

    const resultLink = screen.getByText('Button');
    expect(resultLink).toBeInTheDocument();
  });

  it('shows empty state when no results match', async () => {
    const user = userEvent.setup();
    render(<DocsSearch />);
    const input = screen.getByRole('textbox', { name: /search documentation/i });

    await user.type(input, 'nonexistenttopic');

    const emptyState = screen.getByRole('status');
    expect(emptyState).toHaveTextContent('No matching docs topics');
  });

  it('ranks exact title matches higher than partial matches', async () => {
    const user = userEvent.setup();
    render(<DocsSearch />);
    const input = screen.getByRole('textbox', { name: /search documentation/i });

    await user.type(input, 'over');

    const results = screen.getAllByRole('option');
    // Both "Grid > Overview" and "Scheduler > Overview" match "over" via title prefix matching
    // (`startsWith` / `titleStart`), so they must appear before titleContains or description-only matches
    const titles = results.map((el) => el.querySelector('div')?.textContent ?? '');
    const firstNonOverview = titles.findIndex((t) => t !== 'Overview');
    const lastOverview = titles.lastIndexOf('Overview');
    expect(lastOverview).toBeLessThan(firstNonOverview === -1 ? titles.length : firstNonOverview);
  });

  it('hides results panel when clicking a result', async () => {
    const user = userEvent.setup();
    const handleNavigate = vi.fn();
    render(<DocsSearch onNavigate={handleNavigate} />);
    const input = screen.getByRole('textbox', { name: /search documentation/i });

    await user.type(input, 'button');
    const resultLink = screen.getByText('Button');
    await user.click(resultLink);

    expect(handleNavigate).toHaveBeenCalled();
    expect(input).toHaveValue('');
  });

  it('every navigation page has a corresponding search-index entry', () => {
    const navHrefs = docsNavigation.flatMap((section) =>
      (section.items ?? []).filter((item) => item.href).map((item) => item.href!)
    );

    navHrefs.forEach((href) => {
      const found = docsSearchIndex.find((entry) => entry.href === href);
      expect(found, `Missing search-index entry for ${href}`).toBeDefined();
    });
  });

  it('search index entries have required fields', () => {
    docsSearchIndex.forEach((entry) => {
      expect(entry.title).toBeDefined();
      expect(typeof entry.title).toBe('string');
      expect(entry.description).toBeDefined();
      expect(typeof entry.description).toBe('string');
      expect(entry.href).toBeDefined();
      expect(typeof entry.href).toBe('string');
      expect(entry.section).toBeDefined();
      expect(typeof entry.section).toBe('string');
    });
  });
});
