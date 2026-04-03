import { docsNavigation } from './navigation';

export type DocsSearchEntry = {
  title: string;
  description: string;
  href: string;
  section: string;
  keywords?: string[];
};

/**
 * Optional per-page enrichment: description and search keywords.
 * Titles, hrefs, and sections are derived from docsNavigation automatically.
 * Add an entry here to improve search metadata for a page, but pages without
 * enrichment are still included in the search index.
 */
const enrichment: Record<string, { description: string; keywords?: string[] }> = {
  '/docs/get-started/installation': {
    description: 'Get started with the Modern React Library',
  },
  '/docs/get-started/quick-start': {
    description: 'This guide will walk you through creating your first application with the Modern React Library in just a few minutes.',
  },
  '/docs/concepts/accessibility': {
    description: 'Building accessible applications with the Modern React Library',
    keywords: ['a11y', 'wcag', 'aria'],
  },
  '/docs/concepts/performance': {
    description: "Learn how to optimize your application performance with the Modern React Library's built-in performance features and best practices.",
  },
  '/docs/concepts/theming': {
    description: 'Customize the look and feel of all components with our powerful theming system built on CSS variables and design tokens.',
    keywords: ['theme', 'dark mode', 'css variables'],
  },
  '/docs/grid/overview': {
    description: 'The Grid component is a powerful data table for displaying, sorting, filtering, and editing tabular data with excellent performance.',
    keywords: ['table', 'data grid', 'datagrid'],
  },
  '/docs/grid/bind-data': {
    description: 'Learn how to bind various data sources to the Grid component, including arrays, APIs, and real-time data streams.',
  },
  '/docs/grid/sorting': {
    description: 'Configure single and multi-column sorting with custom sort functions and sort indicators.',
  },
  '/docs/grid/api-reference': {
    description: 'Complete API reference for the Grid component including all props, methods, and events.',
  },
  '/docs/scheduler/overview': {
    description: 'The Scheduler component helps you display and manage time-based events with drag-and-drop, recurring events, and conflict resolution.',
    keywords: ['calendar', 'events', 'scheduling'],
  },
  '/docs/scheduler/bind-data': {
    description: 'Learn how to bind event data to the Scheduler component from various sources including calendars, databases, and APIs.',
  },
  '/docs/scheduler/resolve-overlapping': {
    description: 'Handle overlapping events in the Scheduler with built-in conflict resolution strategies.',
  },
  '/docs/scheduler/api-reference': {
    description: 'Complete API reference for the Scheduler component including all props, methods, and events.',
  },
  '/docs/components/accordion': {
    description: 'A collapsible content component for grouping related information',
  },
  '/docs/components/avatar': {
    description: 'A user identity component that supports images and fallbacks',
  },
  '/docs/components/button': {
    description: 'A versatile button component with multiple variants',
  },
  '/docs/components/check-box': {
    description: 'A checkbox component for boolean choices and opt-in settings',
    keywords: ['checkbox', 'check-box'],
  },
  '/docs/components/text-box': {
    description: 'A text input component for forms with consistent states and accessibility',
    keywords: ['textbox', 'input', 'form'],
  },
  '/docs/releases/v0-1-0': {
    description: 'First release of the Modern React Library',
  },
};

/**
 * Flat list of all searchable docs pages.
 * Titles, hrefs, and section labels come from docsNavigation (single source of truth).
 * Descriptions and keywords are enriched from the map above.
 */
export const docsSearchIndex: DocsSearchEntry[] = docsNavigation.flatMap((section) =>
  (section.items ?? [])
    .filter((item) => item.href)
    .map((item) => ({
      title: item.title,
      href: item.href!,
      section: section.title,
      description: enrichment[item.href!]?.description ?? '',
      keywords: enrichment[item.href!]?.keywords,
    }))
);
