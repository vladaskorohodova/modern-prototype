import ComingSoon from '@/components/ComingSoon';

export default function GridOverviewPage() {
  return (
    <ComingSoon
      title="Grid Overview"
      description="The Grid component is a powerful data table for displaying, sorting, filtering, and editing tabular data with excellent performance."
      plannedSections={[
        'Basic grid setup',
        'Column configuration',
        'Styling and customization',
        'Performance considerations',
        'Accessibility features',
      ]}
      overviewLink="/docs/components/button/overview"
    />
  );
}
