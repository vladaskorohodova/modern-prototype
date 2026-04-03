# Modern React Library

A documentation prototype for a modern React component library built with Next.js, TypeScript, and MDX.

## Features

- **Next.js App Router**: File-based routing with App Router and static export
- **TypeScript**: Full type safety throughout the codebase
- **MDX Support**: Documentation pages authored in MDX (Markdown + JSX)
- **Dark / Light Theme**: System-preference detection, manual toggle, and localStorage persistence
- **Docs Search**: Client-side full-text search across all docs pages with ranked results
- **Interactive Demos**: Components with live preview, show/hide code toggle, and copy to clipboard
- **Props Tables**: Clean props documentation tables
- **Table of Contents**: Auto-generated per-page TOC, desktop sidebar and mobile inline
- **Scroll to Top**: Floating button that appears after scrolling
- **Coming Soon Pages**: Consistent stub pages for planned content
- **Accessible**: WCAG 2.1 compliance, keyboard navigation, and screen reader support

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vladaskorohodova/modern-prototype.git
cd modern-prototype
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
modern-prototype/
├── app/
│   ├── docs/                          # Documentation pages (20 routes)
│   │   ├── get-started/
│   │   │   ├── installation/          # ✓ MDX page
│   │   │   └── quick-start/           # Stub
│   │   ├── concepts/
│   │   │   ├── accessibility/         # ✓ MDX page
│   │   │   ├── performance/           # Stub
│   │   │   └── theming/               # Stub
│   │   ├── components/
│   │   │   ├── accordion/             # ✓ MDX page with demo + props table
│   │   │   ├── avatar/                # ✓ MDX page with demo + props table
│   │   │   ├── button/                # ✓ MDX page with demo + props table
│   │   │   ├── check-box/             # ✓ MDX page with demo + props table
│   │   │   └── text-box/              # ✓ MDX page with demo + props table
│   │   ├── grid/                      # Stubs (Overview, Bind data, Sorting, API Reference)
│   │   ├── scheduler/                 # Stubs (Overview, Bind data, Resolve overlapping, API Reference)
│   │   └── releases/
│   │       └── v0-1-0/                # ✓ MDX page
│   ├── globals.css                    # Semantic theme tokens (light + dark)
│   ├── layout.tsx                     # Root layout with ThemeProvider + anti-flash script
│   └── page.tsx                       # Landing page
├── components/
│   ├── DocsSearch.tsx                 # Client-side docs search with ranked results
│   ├── DocsShell.tsx                  # Docs layout shell (sidebar, TOC, search)
│   ├── Header.tsx                     # Top bar with theme toggle and GitHub link
│   ├── Sidebar.tsx                    # Left navigation sidebar
│   ├── TableOfContents.tsx            # Auto per-page TOC
│   ├── ScrollToTopButton.tsx          # Floating scroll-to-top button
│   ├── ThemeProvider.tsx              # React context for light/dark theme
│   ├── ThemeToggle.tsx                # Header toggle button
│   ├── theme.ts                       # Shared ThemeMode type, THEME_STORAGE_KEY, isThemeMode()
│   ├── CodeBlock.tsx                  # Syntax-highlighted code block
│   ├── ComingSoon.tsx                 # Stub page component
│   ├── Demo.tsx                       # Interactive demo (preview + code + copy)
│   └── PropsTable.tsx                 # Props documentation table
├── content/
│   ├── components/                    # Per-component demo sources and prop definitions
│   │   ├── accordion/
│   │   ├── avatar/
│   │   ├── button/
│   │   ├── check-box/
│   │   └── text-box/
│   └── docs/
│       ├── navigation.ts              # Single source of truth for sidebar routes and titles
│       └── search-index.ts            # Search index derived from navigation + descriptions
├── tests/
│   ├── unit/                          # Vitest + Testing Library unit tests (29 tests, 6 suites)
│   └── e2e/                           # Playwright smoke and visual regression tests
├── next.config.ts                     # Next.js config with MDX
├── mdx-components.tsx                 # MDX component overrides
└── package.json
```

## Docs Pages

### Real MDX pages (8)

| Route | Content |
|---|---|
| `/docs/get-started/installation` | Package setup, prerequisites, quick verification |
| `/docs/concepts/accessibility` | WCAG 2.1 principles, approach, and testing |
| `/docs/components/accordion` | Collapsible content demo, props table |
| `/docs/components/avatar` | User identity component demo, props table |
| `/docs/components/button` | Button variants demo, props table |
| `/docs/components/check-box` | Boolean input demo, props table |
| `/docs/components/text-box` | Text input demo, props table |
| `/docs/releases/v0-1-0` | Release notes |

### Stub pages (11)

All stubs use the `ComingSoon` component with a description, planned sections list, and a navigation link. Stubbed sections: Quick Start, Performance, Theming, Grid (4 pages), Scheduler (4 pages).

## Components

### Shell and navigation

- **DocsShell**: Docs layout wrapper — composes sidebar, main content, TOC, and search
- **Header**: Top bar with site title, docs menu toggle (mobile), theme toggle, and GitHub link
- **Sidebar**: Collapsible navigation driven by `content/docs/navigation.ts`
- **TableOfContents**: Reads `<h2>` and `<h3>` headings from the active page; shown in desktop sidebar and inline on mobile
- **ScrollToTopButton**: Floating button that appears after 320px of scroll

### Search

- **DocsSearch**: Filters all docs pages by title, description, and keywords
- Results are ranked: exact title match → starts with → contains → description match
- Empty state is announced via `role="status"` outside the listbox
- Index is derived from `content/docs/navigation.ts`; only descriptions and keywords need manual maintenance

### Theme

- **ThemeProvider / useTheme**: React context managing `'light' | 'dark'` state with localStorage persistence and system-preference fallback
- **ThemeToggle**: `aria-pressed` button in the header; touch-target 44×44px
- **theme.ts**: Exports `THEME_STORAGE_KEY`, `ThemeMode`, and `isThemeMode()` type guard shared by the provider, bootstrap script, and tests
- Anti-flash inline script in `<head>` applies the stored theme before React hydration
- All component CSS modules use semantic `var(--color-*)` tokens defined in `app/globals.css`

### Content components

- **Demo**: Live preview pane + show/hide code toggle + copy to clipboard; code strings are passed as props (no automatic extraction)
- **CodeBlock**: Prism-powered syntax highlighting used inside MDX and Demo
- **PropsTable**: Manually defined props table
- **ComingSoon**: Stub page layout with title, description, planned sections, and a navigation link

## Build & Test

```bash
# Development server
npm run dev

# TypeScript check
npm run typecheck

# Unit tests (Vitest + Testing Library)
npm run test:unit

# E2E smoke tests (Playwright)
npm run test:e2e

# Visual regression tests (Playwright)
npm run test:visual

# Production build (static export → out/)
npm run build

# Preview the static export locally
npm run preview
```

## Technology Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.1+ (App Router, static export) |
| Language | TypeScript 5 |
| Runtime | React 19 |
| Content | MDX via `@next/mdx` |
| Styling | CSS Modules, semantic CSS custom properties |
| Unit tests | Vitest 4 + Testing Library |
| E2E / visual | Playwright |

## Development Notes

- Navigation structure lives in `content/docs/navigation.ts` — `Sidebar.tsx` and `DocsSearch` both import from it
- Adding a new docs page: add an entry to `navigation.ts`; optionally add a description to the `enrichment` map in `content/docs/search-index.ts` to improve search results for pages that need it
- MDX pages export `metadata.title` and `metadata.description` at the top of the file
- Stub pages are `.tsx` files using `ComingSoon`; their `description` prop is for the page UI, while search indexing still comes from `navigation.ts` and the `enrichment` map in `content/docs/search-index.ts`
- The Demo component requires manual `code` strings — there is no automatic extraction
- Props tables are manually defined — there is no TypeScript prop extraction

## License

MIT
