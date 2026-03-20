import Link from 'next/link';

export const metadata = {
  title: 'Docs',
  description: 'Documentation entry point for the Modern React Library',
};

export default function DocsLandingPage() {
  return (
    <>
      <h1>Docs</h1>
      <p>Browse the documentation by section:</p>

      <h2>Get started</h2>
      <ul>
        <li>
          <Link href="/docs/get-started/installation">Installation</Link>
        </li>
        <li>
          <Link href="/docs/get-started/quick-start">Quick start</Link>
        </li>
      </ul>

      <h2>Concepts</h2>
      <ul>
        <li>
          <Link href="/docs/concepts/accessibility">Accessibility</Link>
        </li>
        <li>
          <Link href="/docs/concepts/performance">Performance</Link>
        </li>
        <li>
          <Link href="/docs/concepts/theming">Theming</Link>
        </li>
      </ul>

      <h2>Components</h2>
      <ul>
        <li>
          <Link href="/docs/components/button">Button</Link>
        </li>
        <li>
          <Link href="/docs/components/accordion">Accordion</Link>
        </li>
        <li>
          <Link href="/docs/components/text-box">TextBox</Link>
        </li>
        <li>
          <Link href="/docs/components/check-box">CheckBox</Link>
        </li>
        <li>
          <Link href="/docs/components/avatar">Avatar</Link>
        </li>
      </ul>

      <h2>Releases</h2>
      <ul>
        <li>
          <Link href="/docs/releases/v0-1-0">v0.1.0</Link>
        </li>
      </ul>
    </>
  );
}
