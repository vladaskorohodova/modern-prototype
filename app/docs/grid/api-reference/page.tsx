import ComingSoon from '@/components/ComingSoon';

export default function GridAPIReferencePage() {
  return (
    <ComingSoon
      title="Grid - API Reference"
      description="Complete API reference for the Grid component including all props, methods, and events."
      plannedSections={[
        'Props reference',
        'Methods and APIs',
        'Events and callbacks',
        'TypeScript types',
        'Advanced configuration',
      ]}
      overviewLink="/docs/grid/overview"
    />
  );
}
