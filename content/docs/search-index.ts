export type DocsSearchEntry = {
  title: string;
  description: string;
  href: string;
  section: string;
  keywords?: string[];
};

export const docsSearchIndex: DocsSearchEntry[] = [
  // Get Started
  {
    title: 'Installation',
    description: 'Get started with the Modern React Library',
    href: '/docs/get-started/installation',
    section: 'Get Started',
  },
  {
    title: 'Quick start',
    description: 'This guide will walk you through creating your first application with the Modern React Library in just a few minutes.',
    href: '/docs/get-started/quick-start',
    section: 'Get Started',
  },

  // Concepts
  {
    title: 'Accessibility',
    description: 'Building accessible applications with the Modern React Library',
    href: '/docs/concepts/accessibility',
    section: 'Concepts',
    keywords: ['a11y', 'wcag', 'aria'],
  },
  {
    title: 'Performance',
    description: 'Learn how to optimize your application performance with the Modern React Library\'s built-in performance features and best practices.',
    href: '/docs/concepts/performance',
    section: 'Concepts',
  },
  {
    title: 'Theming',
    description: 'Customize the look and feel of all components with our powerful theming system built on CSS variables and design tokens.',
    href: '/docs/concepts/theming',
    section: 'Concepts',
    keywords: ['theme', 'dark mode', 'css variables'],
  },

  // Grid
  {
    title: 'Grid Overview',
    description: 'The Grid component is a powerful data table for displaying, sorting, filtering, and editing tabular data with excellent performance.',
    href: '/docs/grid/overview',
    section: 'Grid',
    keywords: ['table', 'data grid', 'datagrid'],
  },
  {
    title: 'Grid - Bind Data',
    description: 'Learn how to bind various data sources to the Grid component, including arrays, APIs, and real-time data streams.',
    href: '/docs/grid/bind-data',
    section: 'Grid',
  },
  {
    title: 'Grid - Sorting',
    description: 'Configure single and multi-column sorting with custom sort functions and sort indicators.',
    href: '/docs/grid/sorting',
    section: 'Grid',
  },
  {
    title: 'Grid - API Reference',
    description: 'Complete API reference for the Grid component including all props, methods, and events.',
    href: '/docs/grid/api-reference',
    section: 'Grid',
  },

  // Scheduler
  {
    title: 'Scheduler Overview',
    description: 'The Scheduler component helps you display and manage time-based events with drag-and-drop, recurring events, and conflict resolution.',
    href: '/docs/scheduler/overview',
    section: 'Scheduler',
    keywords: ['calendar', 'events', 'scheduling'],
  },
  {
    title: 'Scheduler - Bind Data',
    description: 'Learn how to bind event data to the Scheduler component from various sources including calendars, databases, and APIs.',
    href: '/docs/scheduler/bind-data',
    section: 'Scheduler',
  },
  {
    title: 'Scheduler - Resolve Overlapping',
    description: 'Handle overlapping events in the Scheduler with built-in conflict resolution strategies.',
    href: '/docs/scheduler/resolve-overlapping',
    section: 'Scheduler',
  },
  {
    title: 'Scheduler - API Reference',
    description: 'Complete API reference for the Scheduler component including all props, methods, and events.',
    href: '/docs/scheduler/api-reference',
    section: 'Scheduler',
  },

  // Components
  {
    title: 'Accordion Component',
    description: 'A collapsible content component for grouping related information',
    href: '/docs/components/accordion',
    section: 'Components',
  },
  {
    title: 'Avatar Component',
    description: 'A user identity component that supports images and fallbacks',
    href: '/docs/components/avatar',
    section: 'Components',
  },
  {
    title: 'Button Component',
    description: 'A versatile button component with multiple variants',
    href: '/docs/components/button',
    section: 'Components',
  },
  {
    title: 'CheckBox Component',
    description: 'A checkbox component for boolean choices and opt-in settings',
    href: '/docs/components/check-box',
    section: 'Components',
    keywords: ['checkbox', 'check-box'],
  },
  {
    title: 'TextBox Component',
    description: 'A text input component for forms with consistent states and accessibility',
    href: '/docs/components/text-box',
    section: 'Components',
    keywords: ['textbox', 'input', 'form'],
  },

  // Releases
  {
    title: 'Release v0.1.0',
    description: 'First release of the Modern React Library',
    href: '/docs/releases/v0-1-0',
    section: 'Releases',
  },
];
