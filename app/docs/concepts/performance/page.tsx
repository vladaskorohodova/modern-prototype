import ComingSoon from '@/components/ComingSoon';

export default function PerformancePage() {
  return (
    <ComingSoon
      title="Performance"
      description="Learn how to optimize your application performance with the Modern React Library's built-in performance features and best practices."
      plannedSections={[
        'Bundle size optimization',
        'Tree shaking and code splitting',
        'Lazy loading components',
        'Memoization strategies',
        'Virtual scrolling for large datasets',
        'Performance monitoring',
      ]}
      overviewLink="/docs/concepts/accessibility"
    />
  );
}
