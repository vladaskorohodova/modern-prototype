import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import DocsSearch from '@/components/DocsSearch';
import { docsSearchIndex } from '@/content/docs/search-index';

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

    await user.type(input, 'Button Component');

    const resultLink = screen.getByText('Button Component');
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

    const resultLink = screen.getByText('Button Component');
    expect(resultLink).toBeInTheDocument();
  });

  it('shows empty state when no results match', async () => {
    const user = userEvent.setup();
    render(<DocsSearch />);
    const input = screen.getByRole('textbox', { name: /search documentation/i });

    await user.type(input, 'nonexistenttopic');

    const emptyState = screen.getByText('No matching docs topics');
    expect(emptyState).toBeInTheDocument();
  });

  it('ranks exact title matches higher than partial matches', async () => {
    const user = userEvent.setup();
    render(<DocsSearch />);
    const input = screen.getByRole('textbox', { name: /search documentation/i });

    await user.type(input, 'button');

    const results = screen.getAllByRole('option');
    // "Button Component" should be first because it's a title match
    expect(results[0]).toHaveTextContent('Button Component');
  });

  it('hides results panel when clicking a result', async () => {
    const user = userEvent.setup();
    const handleNavigate = vi.fn();
    render(<DocsSearch onNavigate={handleNavigate} />);
    const input = screen.getByRole('textbox', { name: /search documentation/i });

    await user.type(input, 'button');
    const resultLink = screen.getByText('Button Component');
    await user.click(resultLink);

    expect(handleNavigate).toHaveBeenCalled();
    expect(input).toHaveValue('');
  });

  it('search index contains all documented pages', () => {
    const expectedPages = [
      'Button Component',
      'Accordion Component',
      'Avatar Component',
      'CheckBox Component',
      'TextBox Component',
      'Accessibility',
      'Performance',
      'Theming',
      'Installation',
      'Quick start',
      'Grid Overview',
      'Scheduler Overview',
      'Release v0.1.0',
    ];

    expectedPages.forEach((pageName) => {
      const found = docsSearchIndex.find(
        (entry) => entry.title.toLowerCase() === pageName.toLowerCase()
      );
      expect(found).toBeDefined();
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
