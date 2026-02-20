# Modern React Knowledge System

A minimal documentation prototype for a modern React component library built with Next.js, TypeScript, and MDX.

## Features

- **Next.js App Router**: Modern file-based routing with App Router
- **TypeScript**: Full type safety throughout the codebase
- **MDX Support**: Write documentation pages with MDX (Markdown + JSX)
- **Interactive Demos**: Components with code preview, toggle, and copy functionality
- **Props Tables**: Clean, readable props documentation
- **Coming Soon Pages**: Consistent stub pages for planned content
- **Accessible**: Built with accessibility in mind (WCAG 2.1)

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

The app will automatically redirect to the documentation homepage (`/docs/get-started/installation`).

## Project Structure

```
modern-prototype/
├── app/
│   ├── docs/                      # Documentation pages
│   │   ├── get-started/
│   │   │   ├── installation/      # ✓ Real MDX page
│   │   │   └── quick-start/       # Coming soon stub
│   │   ├── concepts/
│   │   │   ├── accessibility/     # ✓ Real MDX page
│   │   │   ├── performance/       # Coming soon stub
│   │   │   └── theming/           # Coming soon stub
│   │   ├── components/
│   │   │   ├── button/
│   │   │   │   └── overview/      # ✓ Real MDX page with demo
│   │   │   └── accordion/         # Coming soon stub
│   │   ├── grid/                  # All coming soon stubs
│   │   ├── scheduler/             # All coming soon stubs
│   │   └── releases/
│   │       └── v0-1-0/            # ✓ Real MDX page
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Redirects to docs
├── components/
│   ├── Header.tsx                 # Top header with site title
│   ├── Sidebar.tsx                # Left navigation sidebar
│   ├── ComingSoon.tsx             # Stub page component
│   ├── Demo.tsx                   # Interactive demo component
│   └── PropsTable.tsx             # Props documentation table
├── content/
│   └── components/
│       └── button/
│           └── demos/
│               └── basic.tsx      # Button demo component
├── next.config.ts                 # Next.js config with MDX
├── mdx-components.tsx             # MDX components config
└── package.json
```

## What's Implemented

### ✓ Real Pages (4 total)

1. **Installation** (`/docs/get-started/installation`)
   - Package installation instructions
   - Prerequisites and setup
   - Quick verification steps

2. **Accessibility** (`/docs/concepts/accessibility`)
   - WCAG 2.1 principles
   - Accessibility approach and features
   - Testing recommendations

3. **Button Overview** (`/docs/components/button/overview`)
   - Interactive demo with 3 button variants
   - Props table (variant, disabled, onClick)
   - Usage guidelines and accessibility notes

4. **Release v0.1.0** (`/docs/releases/v0-1-0`)
   - Release notes and features
   - Installation instructions
   - Known issues and roadmap

### ✓ Stub Pages (13 total)

All stub pages use the `ComingSoon` component and include:
- A description of what the page will cover
- A list of planned sections
- A link back to relevant overview page

Stub pages:
- Quick start
- Performance
- Theming
- Grid (4 pages: Overview, Bind data, Sorting, API Reference)
- Scheduler (4 pages: Overview, Bind data, Resolve overlapping, API Reference)
- Accordion

### ✓ Components

- **Header**: Site title in top bar
- **Sidebar**: Collapsible navigation with sections
- **Demo**: Interactive component with:
  - Preview area
  - Show/Hide code toggle
  - Copy to clipboard button
  - Syntax-highlighted code block
- **PropsTable**: Clean props documentation table
- **ComingSoon**: Consistent stub page layout

## Build & Deploy

### Build for production

```bash
npm run build
```

### Start production server

```bash
npm start
```

## Technology Stack

- **Framework**: Next.js 16.1+ (App Router)
- **Language**: TypeScript 5
- **Content**: MDX via @next/mdx
- **Styling**: CSS Modules (no external UI libraries)
- **Runtime**: React 19

## What's NOT Included

This is a minimal prototype focusing on the vertical slice. The following are intentionally not implemented:

- Search functionality
- Version switcher
- Theme/dark mode toggle
- Complex theming system
- TypeScript prop extraction
- Live code editing/sandbox
- Mobile responsive optimizations (basic only)
- Authentication
- API integration
- Analytics

## Development Notes

- All pages use Next.js App Router conventions
- MDX pages are in `app/docs/[...path]/page.mdx`
- Stub pages are React components (`.tsx`) using `ComingSoon`
- CSS Modules provide scoped styling
- The Demo component requires manual code strings (no automatic extraction)
- Props tables are manually defined (no TS extraction)

## License

MIT

## Author

Modern React Knowledge System Team
