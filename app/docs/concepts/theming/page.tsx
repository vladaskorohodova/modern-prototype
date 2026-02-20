import ComingSoon from '@/components/ComingSoon';

export default function ThemingPage() {
  return (
    <ComingSoon
      title="Theming"
      description="Customize the look and feel of all components with our powerful theming system built on CSS variables and design tokens."
      plannedSections={[
        'Understanding the theming system',
        'Creating custom themes',
        'Dark mode support',
        'CSS variables reference',
        'Theme provider setup',
        'Advanced customization',
      ]}
      overviewLink="/docs/concepts/accessibility"
    />
  );
}
