import Link from 'next/link';
import styles from './Sidebar.module.css';

interface NavItem {
  title: string;
  href?: string;
  items?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    title: 'Get Started',
    items: [
      { title: 'Installation', href: '/docs/get-started/installation' },
      { title: 'Quick start', href: '/docs/get-started/quick-start' },
    ],
  },
  {
    title: 'Concepts',
    items: [
      { title: 'Accessibility', href: '/docs/concepts/accessibility' },
      { title: 'Performance', href: '/docs/concepts/performance' },
      { title: 'Theming', href: '/docs/concepts/theming' },
    ],
  },
  {
    title: 'Grid',
    items: [
      { title: 'Overview', href: '/docs/grid/overview' },
      { title: 'Bind data', href: '/docs/grid/bind-data' },
      { title: 'Sorting', href: '/docs/grid/sorting' },
      { title: 'API Reference', href: '/docs/grid/api-reference' },
    ],
  },
  {
    title: 'Scheduler',
    items: [
      { title: 'Overview', href: '/docs/scheduler/overview' },
      { title: 'Bind data', href: '/docs/scheduler/bind-data' },
      { title: 'Resolve overlapping', href: '/docs/scheduler/resolve-overlapping' },
      { title: 'API Reference', href: '/docs/scheduler/api-reference' },
    ],
  },
  {
    title: 'Components',
    items: [
      { title: 'Accordion', href: '/docs/components/accordion' },
      { title: 'Button', href: '/docs/components/button' },
    ],
  },
  {
    title: 'Releases',
    items: [
      { title: 'v0.1.0', href: '/docs/releases/v0-1-0' },
    ],
  },
];

export default function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      {navigationItems.map((section, idx) => (
        <div key={idx} className={styles.section}>
          <h3 className={styles.sectionTitle}>{section.title}</h3>
          {section.items && (
            <ul className={styles.navList}>
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <Link href={item.href || '#'} className={styles.navLink}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </nav>
  );
}
