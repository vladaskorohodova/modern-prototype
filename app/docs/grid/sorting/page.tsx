import ComingSoon from '@/components/ComingSoon';

export default function GridSortingPage() {
  return (
    <ComingSoon
      title="Grid - Sorting"
      description="Configure single and multi-column sorting with custom sort functions and sort indicators."
      plannedSections={[
        'Enable sorting',
        'Single vs multi-column sorting',
        'Custom sort functions',
        'Sort indicators and UI',
        'Programmatic sorting',
      ]}
      overviewLink="/docs/grid/overview"
    />
  );
}
